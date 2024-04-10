import { spWebContext } from "api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REQUESTTYPES } from "consts/RequestTypes";
import { PAYSYSTEMS } from "consts/PaySystems";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { STAGES } from "consts/Stages";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { useAddEvent } from "./eventsApi";
import { FieldValues } from "react-hook-form";
import emailTemplates from "./emailTemplates";
import { useOSFs } from "./osfApi";
import { useSendEmail } from "./emailApi";

const PAGESIZE = 5;

export interface Person {
  Id: string;
  EMail: string;
  Title: string;
}

export interface RPARequest {
  Author?: Person;
  Id?: string;
  Created?: Date;
  stage: (typeof STAGES)[number]["key"];
  subStage: string;
  requestType: (typeof REQUESTTYPES)[number];
  mcrRequired: "Yes" | "No";
  paySystem: (typeof PAYSYSTEMS)[number]["key"];
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
  osf: string;
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

const defaultSortParams: SortParams = {
  sortColumn: "Created",
  sortDirection: "ascending",
};

export const usePagedRequests = (
  page = 0,
  sortParams = defaultSortParams,
  filterParams: RequestFilter[]
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["paged-requests", sortParams, filterParams, page],
    queryFn: () =>
      getPagedRequests(
        queryClient.getQueryData([
          "paged-requests",
          sortParams,
          filterParams,
          page - 1,
        ]),
        sortParams,
        filterParams
      ),
    // results must remain cached
    // if results are not kept in cache a scenario may arise where you are on
    //  a page > 1, but the previous page has been removed from cache. The
    //  query function depends on the previous page's results. Going "back"
    //  would result in page-1 actually holding the results for page 0.
    cacheTime: Infinity,
    select: transformPagedRequestsFromSP,
    keepPreviousData: true,
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

const getPagedRequests = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  sortParams: SortParams,
  filterParams: RequestFilter[]
) => {
  if (data?.hasNext) {
    return data.getNext();
  }

  const requestedFields =
    "Id,positionTitle,requestType,paySystem,series,grade,officeSymbol,stage,Created," +
    "Author/Id,Author/EMail,Author/Title";

  const expandedFields = "Author";

  let queryString = "ContentType eq 'RPADocSet'";
  filterParams.forEach((filter) => {
    queryString += ` and ${filter.queryString}`;
  });

  return spWebContext.web.lists
    .getByTitle("requests")
    .items.select(requestedFields)
    .expand(expandedFields)
    .filter(queryString)
    .top(PAGESIZE)
    .orderBy(
      sortParams.sortColumn?.toString() || "Created",
      sortParams.sortDirection !== "descending"
    )
    .orderBy("Id", true) // Include this or non-unique sort values can cause issues
    .getPaged();
};

const getRequest = async (Id: number) => {
  if (!Id) {
    return Promise.reject();
  }
  const requestedFields =
    "*," +
    "Author/Id,Author/EMail,Author/Title," +
    "supervisor/Id,supervisor/EMail,supervisor/Title," +
    "organizationalPOC/Id,organizationalPOC/EMail,organizationalPOC/Title," +
    "issueTo/Id,issueTo/EMail,issueTo/Title";

  const expandedFields = "Author,supervisor,organizationalPOC,issueTo";

  return spWebContext.web.lists
    .getByTitle("requests")
    .items.getById(Id)
    .select(requestedFields)
    .expand(expandedFields)();
};

export const useMutateRequest = () => {
  const queryClient = useQueryClient();
  const contentTypes = useContentTypes();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["requests"],
    async (newRequest: RPARequest) => {
      let id = newRequest.Id ? parseInt(newRequest.Id) : 0;
      if (id) {
        await spWebContext.web.lists
          .getByTitle("requests")
          .items.getById(id)
          .update({
            ...(await transformRequestToSP(newRequest)),
          });
      } else {
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
        id = newFolderFields.Id;

        await spWebContext.web.lists
          .getByTitle("notes")
          .items.add({ Title: id.toString() });

        await spWebContext.web.lists
          .getByTitle("requests")
          .items.getById(id)
          .update({
            FileLeafRef: id.toString(), // rename folder
            Title: id.toString(),
            ContentTypeId: contentTypeId, // update to RPADocSet content type
            ...(await transformRequestToSP(newRequest)),
          });
      }

      // Pass back the request that came to us, but add in the Id returned from SharePoint
      const data = structuredClone(newRequest);
      data.Id = id.toString();
      return data;
    },
    {
      onSuccess: async () => {
        // Mark requests as needing refreshed
        queryClient.invalidateQueries(["requests"]);
        dispatchToast(
          <Toast>
            <ToastTitle>Request saved!</ToastTitle>
          </Toast>,
          { intent: "success" }
        );
      },
      onError: async (error) => {
        console.log(error);
        if (error instanceof Error) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error saving request
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};

export const useDeleteRequest = () => {
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["deleteRequest"],
    async (requestId: number) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(requestId)
        .recycle();
    },
    {
      onSuccess: async () => {
        dispatchToast(
          <Toast>
            <ToastTitle>Deleted request</ToastTitle>
          </Toast>,
          { intent: "success" }
        );
      },
      onError: async (error) => {
        console.log(error);
        if (error instanceof Error) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error deleting request
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};

export const useUpdateStage = () => {
  const queryClient = useQueryClient();
  const addEvent = useAddEvent();
  const OSFs = useOSFs();
  const sendEmail = useSendEmail();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["updateStage"],
    async (request: {
      requestId: number;
      newStage: (typeof STAGES)[number]["key"];
      eventTitle: string;
    }) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update({ stage: request.newStage });
    },
    {
      onSuccess: async (_data, request) => {
        //Inform User
        dispatchToast(
          <Toast>
            <ToastTitle>Updated stage</ToastTitle>
          </Toast>,
          { intent: "success" }
        );

        //Log event
        addEvent.mutate({
          Title: request.eventTitle,
          requestId: request.requestId,
        });

        //Send messages
        const requestData: undefined | RPARequest = queryClient.getQueryData([
          "requests",
          request.requestId,
        ]);
        if (requestData && OSFs.data) {
          const email = emailTemplates.createStageUpdateEmail(
            request,
            requestData,
            OSFs.data
          );
          if (email) {
            await sendEmail.mutateAsync({
              email,
              requestId: request.requestId,
            });
          }
        }

        //refetch data
        queryClient.invalidateQueries(["requests", request.requestId]);
      },
      onError: async (error) => {
        console.log(error);
        if (error instanceof Error) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error updating stage
              </ToastTitle>
              <ToastBody>{error.message}</ToastBody>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};

type InternalRequestItem = Omit<
  RPARequest,
  | "methods"
  | "dcwf"
  | "linkedinQualifications"
  | "supervisor"
  | "organizationalPOC"
  | "issueTo"
  | "Created"
> & {
  methods: string;
  dcwf: string;
  linkedinQualifications: string;
  supervisorId?: string;
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
    methods,
    dcwf,
    linkedinQualifications,
    supervisor,
    organizationalPOC,
    issueTo,
    ...rest
  } = request;

  let supervisorId;
  if (supervisor) {
    if (supervisor.Id === "-1") {
      supervisorId = (
        await spWebContext.web.ensureUser(supervisor.EMail)
      ).data.Id.toString();
    } else {
      supervisorId = supervisor.Id;
    }
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
    if (issueTo.Id === "-1") {
      issueToId = (
        await spWebContext.web.ensureUser(issueTo.EMail)
      ).data.Id.toString();
    } else {
      issueToId = issueTo.Id;
    }
  }

  return {
    // if Person fields have been selected, include them
    ...(supervisorId && { supervisorId: supervisorId }),
    ...(organizationalPOCId && { organizationalPOCId: organizationalPOCId }),
    ...(issueToId && { issueToId: issueToId }),

    // stringify arrays for storage in SharePoint
    methods: JSON.stringify(methods),
    dcwf: JSON.stringify(dcwf),
    linkedinQualifications: JSON.stringify(linkedinQualifications),

    // include the rest of the properties from the RPARequest
    ...rest,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformRequestFromSP = (request: any): RPARequest => {
  return {
    Id: request.Id,
    Created: new Date(request.Created),
    stage: request.stage,
    Author: request.Author,
    requestType: request.requestType,
    mcrRequired: request.mcrRequired,
    paySystem: request.paySystem,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPagedRequestsFromSP = (requests: any) => {
  const returnObject: {
    results: PagedRequest[];
    hasNext: boolean;
    getNext: () => void;
  } = {
    results: [],
    hasNext: requests.hasNext,
    getNext: requests?.getNext,
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  requests.results.forEach((request: any) => {
    returnObject.results.push({
      Id: request.Id,
      Author: request.Author,
      requestType: request.requestType,
      paySystem: request.paySystem,
      series: request.series,
      grade: request.grade,
      positionTitle: request.positionTitle,
      officeSymbol: request.officeSymbol,
      stage: request.stage,
      Created: new Date(request.Created),
    });
  });

  return returnObject;
};

interface PagedRequest {
  Id: string;
  Author: Person;
  requestType: (typeof REQUESTTYPES)[number];
  paySystem: (typeof PAYSYSTEMS)[number]["key"];
  series: string;
  grade: (typeof GENERALGRADES)[number] | (typeof ACQGRADES)[number];
  positionTitle: string;
  officeSymbol: string;
  stage: (typeof STAGES)[number]["key"];
  Created: Date;
}

interface SortParams {
  sortColumn: string | number | undefined;
  sortDirection: "ascending" | "descending";
}

export interface RequestFilter {
  column: string;
  filter: string | Date | number | Person;
  modifier?: string;
  queryString: string;
}

/** This function is used to validate if all fields are populated for a Draft Request
 * @param values - An object containing the request form values
 * @returns Object containing whether any section had errors
 */

export const validateRequest = (values: FieldValues) => {
  const HiringInfo =
    values.advertisementLength === "" || values.methods.length === 0;

  const JobBoard: boolean =
    values.methods.includes("lcmc") && values.closeDateLCMC === undefined;

  const JOA: boolean =
    values.methods.includes("joa") &&
    (!values.closeDateJOA ||
      !values.organizationalPOC ||
      !values.issueTo ||
      !values.fullPartTime ||
      !values.salaryLow ||
      !values.salaryHigh ||
      !values.telework ||
      !values.remote ||
      !values.pcs ||
      !values.joaQualifications ||
      !values.joaIdealCandidate);

  const LinkedInPost: boolean =
    values.methods.includes("linkedinPost") &&
    (!values.temporary ||
      !values.salaryLow ||
      !values.salaryHigh ||
      !(values.temporary === "Full-Time" ? true : values.nte) ||
      !values.incentives ||
      !values.telework ||
      !values.linkedinPositionSummary ||
      !(
        !values.linkedinQualifications.includes("certification") ||
        values.dcwf.length > 0
      ) ||
      !values.linkedinKSAs);

  const USAJobs: boolean =
    values.methods.includes("usaJobsFlyer") &&
    values.closeDateUsaJobsFlyer === undefined;

  const hasErrors = HiringInfo || JobBoard || JOA || LinkedInPost || USAJobs;

  return {
    hasErrors,
    HiringInfo,
    JobBoard,
    JOA,
    LinkedInPost,
    USAJobs,
  };
};
