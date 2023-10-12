import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REQUESTTYPES } from "consts/RequestTypes";
import { PAYSYSTEMS } from "consts/PaySystems";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";

export interface RPARequest {
  //requestor: ;
  Id?: string;
  requestType: (typeof REQUESTTYPES)[number];
  mcrRequired: "Yes" | "No";
  paySystem: (typeof PAYSYSTEMS)[number]["key"];
  hireType: "Internal" | "External";
  advertisementLength: "Normal" | "Extended";
  lastIncumbent: string;
  series: string;
  grade: (typeof GENERALGRADES)[number] | (typeof ACQGRADES)[number];
  positionTitle: string;
  mpcn: string;
  cpcn: string;
  fms: "Yes" | "No";
  officeSymbol: string;
  positionSensitivity: (typeof POSITIONSENSITIVIES)[number]["key"];
  dutyLocation: string;
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

export const useAddRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["requests"],
    async (newRequest: RPARequest) => {
      const response = await spWebContext.web.lists
        .getByTitle("requests")
        .items.add(newRequest);

      // Pass back the request that came to us, but add in the Id returned from SharePoint
      const data = structuredClone(newRequest);
      data.Id = response.data.Id;
      return data;
    },
    {
      onSuccess: async () => {
        // Mark requests as needing refreshed
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );
};
