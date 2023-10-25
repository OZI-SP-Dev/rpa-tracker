import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REQUESTTYPES } from "consts/RequestTypes";
import { PAYSYSTEMS } from "consts/PaySystems";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { OSFS } from "consts/OSFs";

export interface Person {
  Id: string;
  EMail: string;
  Title: string;
}

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
  osf: (typeof OSFS)[number];
  orgApprover?: Person;
  methods: string[];
}

/**
 * Gets all requests
 */
export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: () => getRequests(),
    retry: false, // disable retries for initial setup
    //select: transformRequestsFromSP,
  });
};

const getRequests = async () => {
  const requestedFields =
    "*,orgApprover/Id,orgApprover/EMail,orgApprover/Title";
  const expandedFields = "orgApprover";
  return spWebContext.web.lists
    .getByTitle("requests")
    .items.select(requestedFields)
    .expand(expandedFields)
    .top(5000)();
};

export const useAddRequest = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["requests"],
    async (newRequest: RPARequest) => {
      const response = await spWebContext.web.lists
        .getByTitle("requests")
        .items.add(await transformRequestToSP(newRequest));

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

type InternalRequestItem = Omit<RPARequest, "orgApprover" | "methods"> & {
  orgApproverId?: string;
  methods: string;
};

const transformRequestToSP = async (
  request: RPARequest
): Promise<InternalRequestItem> => {
  // desctructure the request object
  // this removes any named properties we don't want to send to SharePoint
  // rest object will include any remaining properties
  const { orgApprover, methods, ...rest } = request;
  let orgApproverId;

  if (orgApprover) {
    // resolve orgApprover is no current Id set
    if (orgApprover.Id === "-1") {
      orgApproverId = (
        await spWebContext.web.ensureUser(orgApprover.EMail)
      ).data.Id.toString();
    } else {
      orgApproverId = orgApprover.Id;
    }
  }

  return {
    // if an orgApprover has been selected, include them, otherwise leave the property off the object
    ...(orgApproverId && { orgApproverId: orgApproverId }),

    // stringify methods for storage in SharePoint
    methods: JSON.stringify(methods),

    // include the rest of the properties from the RPARequest
    ...rest,
  };
};
