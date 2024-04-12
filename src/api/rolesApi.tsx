import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Person } from "./requestsApi";
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
            : (await spWebContext.web.ensureUser(item.user.EMail)).data.Id,
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

      return (
        error || spWebContext.web.lists.getByTitle("roles").items.add(newItem)
      );
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
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["deleteRole"],
    async (id: number) => {
      return spWebContext.web.lists
        .getByTitle("roles")
        .items.getById(id)
        .recycle();
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
