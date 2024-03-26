import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Person } from "./UserApi";

interface SPRole {
  Id?: number;
  Title: string;
  user: Person;
}

interface NewRole {
  Title: string;
  user: Person;
}

export type Role = SPRole | NewRole;

interface SPSubmitRole {
  Id?: number;
  UserId: number;
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

export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addRole"],
    async (item: NewRole) => {
      let newItem: SPSubmitRole = {
        UserId:
          item.user.Id > 0
            ? item.user.Id
            : (await spWebContext.web.ensureUser(item.user.EMail)).data.Id,
        Title: item.Title,
      };
      return spWebContext.web.lists.getByTitle("roles").items.add(newItem);
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
    }
  );
};
