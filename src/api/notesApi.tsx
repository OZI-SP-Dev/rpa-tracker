import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotes = (requestId: number) => {
  return useQuery({
    queryKey: ["notes", requestId],
    queryFn: () => getNotes(requestId),
  });
};

const getNotes = async (requestId: number) => {
  return spWebContext.web.lists
    .getByTitle("requests")
    .items.getById(requestId)
    .comments();
};

export const useAddNote = (requestId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addNote"],
    async (note: string) => {
      return spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(requestId)
        .comments.add(note);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["notes", requestId]);
      },
    }
  );
};
