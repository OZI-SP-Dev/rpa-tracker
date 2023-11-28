import { spWebContext } from "api/SPWebContext";
import { useQuery } from "@tanstack/react-query";

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
    .expand("ModifiedBy")<SPDocument[]>();
};

export interface SPDocument {
  Name: string;
  ModifiedBy: { Id: string; EMail: string; Title: string };
  TimeLastModified: string;
  ServerRelativeUrl: string;
  UniqueId: string;
}
