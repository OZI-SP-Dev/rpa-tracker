import { spWebContext } from "api/SPWebContext";
import { useMutation } from "@tanstack/react-query";

export interface EventLogItem {
  requestId: number;
  Title: string;
}

export const useAddEvent = () => {
  return useMutation(["addEvent"], async (item: EventLogItem) => {
    return spWebContext.web.lists.getByTitle("events").items.add(item);
  });
};
