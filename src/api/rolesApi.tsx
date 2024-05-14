import { spWebContext, webUrl } from "api/SPWebContext";
import "@pnp/sp/site-groups/web";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Person } from "api/requestsApi";
import { useMemo } from "react";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";

declare const _spPageContextInfo: { userId: number };

export interface SPRole {
  Id: number;
  Title: string;
  user: Person;
}

export interface NewRole {
  Title: string;
  user: Person;
}

interface SPSubmitRole {
  Id?: number;
  userId: number;
  Title: string;
}

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () =>
      spWebContext.web.lists
        .getByTitle("roles")
        .items.select("Id", "Title", "user/Id", "user/Title", "user/EMail")
        .expand("user")<SPRole[]>(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const useMyRoles = () => {
  const roles = useRoles();

  const myData = useMemo(
    () =>
      roles.data
        ?.filter((item) => Number(item.user.Id) === _spPageContextInfo.userId)
        ?.map((item) => item.Title),
    [roles]
  );

  const myRoles = {
    isAdmin: myData?.includes("Admin"),
    isCA: myData?.includes("CA"),
    isCOSF: myData?.includes("COSF"),
    isCSF: myData?.includes("CSF"),
    isHRL: myData?.includes("HRL"),
    isOSF: myData?.includes("OSF"),
    roles: myData || [],
  };

  return myRoles;
};

export const useAddRole = () => {
  const queryClient = useQueryClient();
  const roles = useRoles();
  return useMutation(
    ["addRole"],
    async (item: NewRole) => {
      const newItem: SPSubmitRole = {
        userId:
          Number(item.user.Id) > 0
            ? Number(item.user.Id)
            : (await spWebContext.web.ensureUser(item.user.EMail)).Id,
        Title: item.Title,
      };

      let error = undefined;
      roles.data?.forEach((role) => {
        if (
          role.Title === newItem.Title &&
          Number(role.user.Id) === newItem.userId
        ) {
          error = Promise.reject(new Error("Duplicate roles are not allowed"));
        }
      });

      let add = undefined;

      if (!error) {
        add = await spWebContext.web.lists
          .getByTitle("roles")
          .items.add(newItem)
          .catch((err) => (error = Promise.reject(new Error(err))));
        if (!error) {
          await spWebContext.web.siteGroups
            .getByName(SuperUsersGroupName())
            .users.add("i:0#.f|membership|" + item.user.EMail)
            .catch((err) => (error = Promise.reject(new Error(err))));
        }
      }

      return error || Promise.resolve(add);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["roles"]);
      },
    }
  );
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  const roles = useRoles();
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["deleteRole"],
    async (id: number) => {
      let error = undefined;
      const thisRole = roles.data?.find((role) => role.Id === id);

      const result = await spWebContext.web.lists
        .getByTitle("roles")
        .items.getById(id)
        .recycle()
        .catch((err) => (error = Promise.reject(new Error(err))));

      if (!error) {
        const usersRoles = roles.data?.filter((role) => {
          return role.user.Id === thisRole?.user.Id;
        });
        // if this user has only one role (this role), remove them from the SuperUsers group
        if ((usersRoles?.length ?? 0) === 1) {
          await spWebContext.web.siteGroups
            .getByName(SuperUsersGroupName())
            .users.removeByLoginName(
              "i:0#.f|membership|" + thisRole?.user.EMail
            )
            .catch((err) => (error = Promise.reject(new Error(err))));
        }
      }

      return error || Promise.resolve(result);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["roles"]);
      },
      onError: async (error) => {
        console.log(error);
        if (error instanceof Error) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error deleting role.
              </ToastTitle>
              <ToastBody>{error.message}</ToastBody>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};

const SuperUsersGroupName = () => {
  const siteMatches = webUrl.match(/(?<=\/)RPA.*/);
  return (siteMatches?.[0] ?? "") + " SuperUsers";
};
