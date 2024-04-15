import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useNoteItem = (requestId: number) => {
  return useQuery({
    queryKey: ["noteItem", requestId],
    queryFn: () => getNoteItem(requestId),
    select: selectNoteId,
    staleTime: Infinity, // Prevent refetch
    cacheTime: Infinity, // Prevent garbage collection
  });
};

const getNoteItem = async (requestId: number) => {
  return spWebContext.web.lists
    .getByTitle("notes")
    .items.filter(`Title eq ${requestId}`)();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectNoteId = (noteItems: any) => {
  const noteId = noteItems[0]?.Id;
  if (noteId) {
    return { Id: noteId };
  }
  throw new Error("No note item found. Contact support.");
};

export const useNotes = (requestId: number) => {
  const noteItem = useNoteItem(requestId);
  const noteId = noteItem.data?.Id;

  const hasNoteError = noteItem.error instanceof Error;
  const returnFunction = hasNoteError
    ? () => Promise.reject(noteItem.error) // If we erred trying to get noteItem, then return that error
    : () => getNotes(noteId); // If we successfuly got the noteItem, then return the Notes

  return useQuery({
    queryKey: ["notes", noteId],
    queryFn: returnFunction,
    enabled: !!noteId || hasNoteError,
  });
};

const getNotes = async (noteId: number) => {
  return spWebContext.web.lists
    .getByTitle("notes")
    .items.getById(noteId)
    .comments();
};

export const useAddNote = (requestId: number) => {
  const queryClient = useQueryClient();
  const noteItem = useNoteItem(requestId);
  const noteId = noteItem.data?.Id;
  return useMutation(
    ["addNote"],
    async (note: string) => {
      return spWebContext.web.lists
        .getByTitle("notes")
        .items.getById(noteId)
        .comments.add(note);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["notes", noteId]);
      },
    }
  );
};
