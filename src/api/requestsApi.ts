import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REQUESTTYPES } from "consts/RequestTypes";
import { PAYSYSTEMS } from "consts/PaySystems";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { OSFS } from "consts/OSFs";
import { STAGES } from "consts/Stages";

export interface Person {
  Id: string;
  EMail: string;
  Title: string;
}

export interface RPARequest {
  Author?: Person;
  Id?: string;
  stage: (typeof STAGES)[number]["key"];
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
  fullPartTime?: "Full" | "Part";
  salaryLow?: number;
  salaryHigh?: number;
  telework?: "Yes" | "No";
  remote?: "Yes" | "No";
  pcs?: "Yes" | "No";
  joaQualifications?: string;
  joaIdealCandidate?: string;
  temporary?: "Full" | "Term" | "Temp";
  nte?: Date;
  incentives?: "Yes" | "No";
  closeDateLCMC?: Date;
  closeDateJOA?: Date;
  closeDateUsaJobsFlyer?: Date;
  linkedinPositionSummary?: string;
  linkedinQualifications: string[];
  dcwf: string[];
  linkedinKSAs?: string;
  linkedinSearchTitle1?: string;
  linkedinSearchTitle2?: string;
  linkedinSearchTitle3?: string;
  linkedinSearchTitle4?: string;
  linkedinSearchSkill1?: string;
  linkedinSearchSkill2?: string;
  linkedinSearchSkill3?: string;
  linkedinSearchSkill4?: string;
  linkedinSearchEmployer1?: string;
  linkedinSearchEmployer2?: string;
  linkedinSearchEmployer3?: string;
  linkedinSearchEmployer4?: string;
  linkedinSearchStudy1?: string;
  linkedinSearchStudy2?: string;
  linkedinSearchStudy3?: string;
  linkedinSearchStudy4?: string;
  linkedinSearchKeyword1?: string;
  linkedinSearchKeyword2?: string;
  linkedinSearchKeyword3?: string;
  linkedinSearchKeyword4?: string;
  linkedinSearchComments?: string;
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

/**
 * Get a specific request
 */
export const useRequest = (requestId: number) => {
  return useQuery({
    queryKey: ["requests", requestId],
    queryFn: () => getRequest(requestId),
    select: transformRequestFromSP,
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

  return spWebContext.web.lists
    .getByTitle("requests")
    .items.select(requestedFields)
    .expand(expandedFields)
    .filter("ContentType eq 'RPADocSet'")
    .top(5000)();
};

const getRequest = async (Id: number) => {
  const requestedFields =
    "*," +
    "Author/Id,Author/EMail,Author/Title," +
    "orgApprover/Id,orgApprover/EMail,orgApprover/Title," +
    "supervisor/Id,supervisor/EMail,supervisor/Title," +
    "organizationalPOC/Id,organizationalPOC/EMail,organizationalPOC/Title," +
    "issueTo/Id,issueTo/EMail,issueTo/Title";

  const expandedFields =
    "Author,orgApprover,supervisor,organizationalPOC,issueTo";

  return spWebContext.web.lists
    .getByTitle("requests")
    .items.getById(Id)
    .select(requestedFields)
    .expand(expandedFields)();
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
      const folderName = now.toISOString().replace(/:/g, "-");
      const newFolder = await spWebContext.web.lists
        .getByTitle("requests")
        .rootFolder.folders.addUsingPath(folderName);

      const newFolderFields = await newFolder.folder.listItemAllFields();

      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(newFolderFields.Id)
        .update({
          FileLeafRef: newFolderFields.Id.toString(), // rename folder
          Title: newFolderFields.Id.toString(),
          ContentTypeId: contentTypeId, // update to RPADocSet content type
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

export const useDeleteRequest = () => {
  return useMutation(["deleteRequest"], async (requestId: number) => {
    await spWebContext.web.lists
      .getByTitle("requests")
      .items.getById(requestId)
      .recycle();
  });
};

export const useUpdateStage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["updateStage"],
    async (request: {
      requestId: number;
      newStage: (typeof STAGES)[number]["key"];
    }) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update({ stage: request.newStage });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );
};

type InternalRequestItem = Omit<
  RPARequest,
  | "orgApprover"
  | "methods"
  | "dcwf"
  | "linkedinQualifications"
  | "supervisor"
  | "organizationalPOC"
  | "issueTo"
> & {
  orgApproverId?: string;
  methods: string;
  dcwf: string;
  linkedinQualifications: string;
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
    dcwf,
    linkedinQualifications,
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

    // stringify arrays for storage in SharePoint
    methods: JSON.stringify(methods),
    dcwf: JSON.stringify(dcwf),
    linkedinQualifications: JSON.stringify(linkedinQualifications),

    // Required Person field
    supervisorId: supervisorId,

    // include the rest of the properties from the RPARequest
    ...rest,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformRequestFromSP = (request: any): RPARequest => {
  return {
    Id: request.Id,
    stage: request.stage,
    Author: request.Author,
    requestType: request.requestType,
    mcrRequired: request.mcrRequired,
    paySystem: request.paySystem,
    hireType: request.hireType,
    advertisementLength: request.advertisementLength,
    lastIncumbent: request.lastIncumbent,
    series: request.series,
    grade: request.grade,
    positionTitle: request.positionTitle,
    mpcn: request.mpcn,
    cpcn: request.cpcn,
    fms: request.fms,
    officeSymbol: request.officeSymbol,
    positionSensitivity: request.positionSensitivity,
    dutyLocation: request.dutyLocation,
    osf: request.osf,
    orgApprover: request.orgApprover,
    methods: JSON.parse(request.methods),
    supervisor: request.supervisor,
    organizationalPOC: request.organizationalPOC,
    issueTo: request.issueTo,
    fullPartTime: request.fullPartTime,
    salaryLow: request.salaryLow,
    salaryHigh: request.salaryHigh,
    telework: request.telework,
    remote: request.remote,
    pcs: request.pcs,
    joaQualifications: request.joaQualifications,
    joaIdealCandidate: request.joaIdealCandidate,
    temporary: request.temporary,
    nte: new Date(request.nte),
    incentives: request.incentives,
    closeDateLCMC: new Date(request.closeDateLCMC),
    closeDateJOA: new Date(request.closeDateJOA),
    closeDateUsaJobsFlyer: new Date(request.closeDateUsaJobsFlyer),
    linkedinPositionSummary: request.linkedinPositionSummary,
    linkedinQualifications: JSON.parse(request.linkedinQualifications),
    dcwf: JSON.parse(request.dcwf),
    linkedinKSAs: request.linkedinKSAs,
    linkedinSearchTitle1: request.linkedinSearchTitle1,
    linkedinSearchTitle2: request.linkedinSearchTitle2,
    linkedinSearchTitle3: request.linkedinSearchTitle3,
    linkedinSearchTitle4: request.linkedinSearchTitle4,
    linkedinSearchSkill1: request.linkedinSearchSkill1,
    linkedinSearchSkill2: request.linkedinSearchSkill2,
    linkedinSearchSkill3: request.linkedinSearchSkill3,
    linkedinSearchSkill4: request.linkedinSearchSkill4,
    linkedinSearchEmployer1: request.linkedinSearchEmployer1,
    linkedinSearchEmployer2: request.linkedinSearchEmployer2,
    linkedinSearchEmployer3: request.linkedinSearchEmployer3,
    linkedinSearchEmployer4: request.linkedinSearchEmployer4,
    linkedinSearchStudy1: request.linkedinSearchStudy1,
    linkedinSearchStudy2: request.linkedinSearchStudy2,
    linkedinSearchStudy3: request.linkedinSearchStudy3,
    linkedinSearchStudy4: request.linkedinSearchStudy4,
    linkedinSearchKeyword1: request.linkedinSearchKeyword1,
    linkedinSearchKeyword2: request.linkedinSearchKeyword2,
    linkedinSearchKeyword3: request.linkedinSearchKeyword3,
    linkedinSearchKeyword4: request.linkedinSearchKeyword4,
    linkedinSearchComments: request.linkedinSearchComments,
  };
};
