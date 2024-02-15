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

  if (noteItem.error instanceof Error) {
    return useQuery({
      queryKey: ["notes", noteId],
      queryFn: () => Promise.reject(noteItem.error),
    });
  }

  return useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => getNotes(noteId),
    enabled: !!noteId,
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
