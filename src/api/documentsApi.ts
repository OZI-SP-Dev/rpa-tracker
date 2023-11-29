import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Gets all requests
 */
export const useDocuments = (requestId: number) => {
  return useQuery({
    queryKey: ["documents", requestId],
    queryFn: () => getDocuments(requestId),
  });
};

const getDocuments = async (requestId: number) => {
  const path = "requests/" + requestId;
  return spWebContext.web
    .getFolderByServerRelativePath(path)
    .files.select(
      "Name",
      "TimeLastModified",
      "ServerRelativeUrl",
      "ModifiedBy",
      "ModifiedBy/Id",
      "ModifiedBy/EMail",
      "ModifiedBy/Title",
      "UniqueId"
    )
    .expand("ModifiedBy")
    .orderBy("Name")<SPDocument[]>();
};

export const useDeleteDocument = (document: SPDocument) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteDocument", document.Name],
    async () => {
      return spWebContext.web.getFileById(document.UniqueId).recycle();
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["documents"]);
      },
    }
  );
};

export const useAddDocument = (requestId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addDocument"],
    async (file: File) => {
      return spWebContext.web
        .getFolderByServerRelativePath(`requests/${requestId}`)
        .files.addUsingPath(file.name, file, { Overwrite: true });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["documents", requestId]);
      },
    }
  );
};

export interface SPDocument {
  Name: string;
  ModifiedBy: { Id: string; EMail: string; Title: string };
  TimeLastModified: string;
  ServerRelativeUrl: string;
  UniqueId: string;
}
