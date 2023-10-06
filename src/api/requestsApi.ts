import { spWebContext } from "api/SPWebContext";
import { useQuery } from "@tanstack/react-query";
import { REQUESTTYPES } from "consts/RequestTypes";

export interface RPARequest {
  //requestor: ;
  requestType: (typeof REQUESTTYPES)[number];
  mcrRequired: "Yes" | "No";
  paySystem: "NH" | "GS" | "GG";
  hireType: "Internal" | "External";
  advertisementLength: "Normal" | "Extended";
  lastIncumbent: string;
}

/**
 * Gets all requests
 *
 */
export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: () => getRequests(),
    retry: false, // disable retries for initial setup
    //select: transformCheckListItemsFromSP,
  });
};

/**
 * Gets checklist items for current user's roles
 * Currently unable to filter specifically for where user is the Supervisor or Employee
 * Module using this function then filters for the correct supervisor/employee
 * @returns TypeTBD
 */
const getRequests = async () => {
  return spWebContext.web.lists.getByTitle("requests").items();
};

// const transformCheckListItemFromSP = (
//   request: ICheckListResponseItem
// ): ICheckListItem => {
//   let lead: RoleType;
//   if (Object.values(RoleType).includes(request.Lead as RoleType)) {
//     lead = request.Lead as RoleType;
//   } else {
//     // If the Lead specified in the record doesn't exist on our mapping -- make the Lead ADMIN
//     lead = RoleType.ADMIN;
//   }

//   return {
//     Id: request.Id,
//     Title: request.Title,
//     Description: request.Description,
//     Lead: lead,
//     CompletedDate: request.CompletedDate
//       ? DateTime.fromISO(request.CompletedDate)
//       : undefined,
//     CompletedBy: request.CompletedBy
//       ? new Person({
//           Id: request.CompletedBy.Id,
//           Title: request.CompletedBy.Title,
//           EMail: request.CompletedBy.EMail,
//         })
//       : undefined,
//     RequestId: request.RequestId,
//     TemplateId: request.TemplateId,
//     Active: request.Active,
//   };
// };
