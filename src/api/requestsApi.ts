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
  supervisor: Person;
  organizationalPOC?: Person;
  issueTo?: Person;
  fullPartTime: "Full" | "Part";
  salaryLow: number;
  salaryHigh: number;
  telework: "Yes" | "No";
  remote: "Yes" | "No";
  pcs: "Yes" | "No";
  joaQualifications: string;
  joaIdealCandidate: string;
  temporary: "Full" | "Term" | "Temp";
  nte: Date;
  incentives: "Yes" | "No";
}

/**
 * Queries the "requests" lists for available content types
 * The internal Id of the RPADocSet is neeeded when creating
 * new requests
 */
const useContentTypes = () => {
  return useQuery({
    queryKey: ["requests", "contentTypes"],
    queryFn: () => spWebContext.web.lists.getByTitle("requests").contentTypes(),
    staleTime: Infinity, // Prevent refetch
    cacheTime: Infinity, // Prevent garbage collection
  });
};

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
  // Grab all fields, and expand Person fields
  const requestedFields =
    "*," +
    "orgApprover/Id,orgApprover/EMail,orgApprover/Title," +
    "supervisor/Id,supervisor/EMail,supervisor/Title," +
    "organizationalPOC/Id,organizationalPOC/EMail,organizationalPOC/Title," +
    "issueTo/Id,issueTo/EMail,issueTo/Title";

  const expandedFields = "orgApprover,supervisor,organizationalPOC,issueTo";

  //
  return spWebContext.web.lists
    .getByTitle("requests")
    .items.select(requestedFields)
    .expand(expandedFields)
    .top(5000)();
};

export const useAddRequest = () => {
  const queryClient = useQueryClient();
  const contentTypes = useContentTypes();

  return useMutation(
    ["requests"],
    async (newRequest: RPARequest) => {
      // We must have the ID of RPADocSet in order to create our DocSet folder
      let contentTypeId = "";
      if (contentTypes.data) {
        contentTypeId =
          contentTypes.data.find((ct) => ct.Name === "RPADocSet")?.StringId ||
          "";
      } else {
        throw new Error("RPADocSet Content Type not available to be created");
      }

      const now = new Date();
      const folderName = now.toISOString() + " " + newRequest.positionTitle;
      const newFolder = await spWebContext.web.lists
        .getByTitle("requests")
        .rootFolder.folders.addUsingPath(folderName);

      const newFolderFields = await newFolder.folder.listItemAllFields();

      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(newFolderFields.Id)
        .update({
          ContentTypeId: contentTypeId,
          Title: folderName,
          ...(await transformRequestToSP(newRequest)),
        });

      // Pass back the request that came to us, but add in the Id returned from SharePoint
      const data = structuredClone(newRequest);
      data.Id = newFolderFields.Id;
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

type InternalRequestItem = Omit<
  RPARequest,
  "orgApprover" | "methods" | "supervisor" | "organizationalPOC" | "issueTo"
> & {
  orgApproverId?: string;
  methods: string;
  supervisorId: string;
  organizationalPOCId?: string;
  issueToId?: string;
};

const transformRequestToSP = async (
  request: RPARequest
): Promise<InternalRequestItem> => {
  // Desctructure the request object
  // This removes any named properties we don't want to send to SharePoint
  // The "rest" object will include any remaining properties that can be
  // passed back to SharePoint without modification
  const {
    orgApprover,
    methods,
    supervisor,
    organizationalPOC,
    issueTo,
    ...rest
  } = request;

  let orgApproverId;
  if (orgApprover) {
    // resolve orgApprover if no current Id set
    if (orgApprover.Id === "-1") {
      orgApproverId = (
        await spWebContext.web.ensureUser(orgApprover.EMail)
      ).data.Id.toString();
    } else {
      orgApproverId = orgApprover.Id;
    }
  }

  let supervisorId;
  if (supervisor.Id === "-1") {
    supervisorId = (
      await spWebContext.web.ensureUser(supervisor.EMail)
    ).data.Id.toString();
  } else {
    supervisorId = supervisor.Id;
  }

  let organizationalPOCId;
  if (organizationalPOC) {
    if (organizationalPOC.Id === "-1") {
      organizationalPOCId = (
        await spWebContext.web.ensureUser(organizationalPOC.EMail)
      ).data.Id.toString();
    } else {
      organizationalPOCId = organizationalPOC.Id;
    }
  }

  let issueToId;
  if (issueTo) {
    if (issueTo.Id) {
      issueToId = issueTo.Id;
    } else {
      issueToId = (
        await spWebContext.web.ensureUser(issueTo.EMail)
      ).data.Id.toString();
    }
  }

  return {
    // if optional Person fields have been selected, include them
    ...(orgApproverId && { orgApproverId: orgApproverId }),
    ...(organizationalPOC && { organizationalPOCId: organizationalPOCId }),
    ...(issueTo && { issueToId: issueToId }),

    methods: JSON.stringify(methods), // stringify array of methods for storage in SharePoint
    supervisorId: supervisorId, // Required Person field

    ...rest, // include the rest of the properties from the RPARequest
  };
};
