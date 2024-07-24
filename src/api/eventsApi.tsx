import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface EventLogItem {
  requestId: number;
  Title: string;
}

export const useAddEvent = () => {
  return useMutation(["addEvent"], async (item: EventLogItem) => {
    return spWebContext.web.lists.getByTitle("events").items.add(item);
  });
};

export const useReworkEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
    select: transformReworkEvents,
    staleTime: Infinity, // Prevent refetch
    cacheTime: Infinity,
  });
};

const getEvents = async () => {
  let items: EventLogItem[] = [];
  for await (const pagedItems of spWebContext.web.lists
    .getByTitle("events")
    .items.filter(`startswith(Title,'Backward Stage Change:')`)
    .top(5000)<EventLogItem[]>) {
    items = items.concat(pagedItems);
  }

  return items;
};

const transformReworkEvents = (events: EventLogItem[]) => {
  const eventsMap = new Map<number, ReworkEvent>();

  events.forEach((reworkEvent) => {
    //find exisitng or create new object for this request Id
    const thisRequest: ReworkEvent = eventsMap.get(reworkEvent.requestId) ?? {
      requestId: reworkEvent.requestId,
    };

    const stage = findFromStage(reworkEvent);
    thisRequest[stage] = (thisRequest[stage] ?? 0) + 1;
    eventsMap.set(reworkEvent.requestId, thisRequest);
  });

  const eventsArray = Array.from(eventsMap, ([_name, value]) => value);
  return eventsArray;
};

export type ReworkEvent = {
  requestId: number;
  PackageReview?: number;
  OSFReview?: number;
  HRLReview?: number;
  Recruiting?: number;
  Selection?: number;
  PackageApproval?: number;
  DraftPackageHRL?: number;
  SelectionPackageOSFApproval?: number;
  SelectionPackageCSFApproval?: number;
  SelectionPackageHQApproval?: number;
  SelectionPackageCAApproval?: number;
  TitleV?: number;
  Unknown?: number;
};

const findFromStage = (reworkEvent: EventLogItem) => {
  const shortName = reworkEvent.Title.match(
    /Backward Stage Change: (.*) to (?:.*)/
  );

  if (shortName) {
    switch (shortName[1]) {
      case "Package Review":
        return "PackageReview";

      case "OSF Review":
        return "OSFReview";

      case "HRL/COSF Review":
        return "HRLReview";

      case "Recruiting":
        return "Recruiting";

      case "Candidate Selection":
        return "Selection";

      case "Package Approval":
        return "PackageApproval";

      case "Draft Package (HRL)":
        return "DraftPackageHRL";

      case "OSF Approval":
        return "SelectionPackageOSFApproval";

      case "CSF Approval":
        return "SelectionPackageCSFApproval";

      case "HQ Approval":
        return "SelectionPackageHQApproval";

      case "CA Approval":
        return "SelectionPackageCAApproval";

      case "Title V":
        return "TitleV";
    }
  }
  return "Unknown";
};
