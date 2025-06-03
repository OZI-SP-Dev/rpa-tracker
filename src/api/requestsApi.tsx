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
import { useAddEvent } from "api/eventsApi";
import { FieldValues } from "react-hook-form";
import emailTemplates from "api/emailTemplates";
import { OSF, useOSFs } from "api/osfApi";
import { useSendEmail } from "api/emailApi";
import { useMyRoles, useRoles } from "api/rolesApi";

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
  requestTypeOther: string;
  mcrRequired: "Yes" | "No";
  paySystem: (typeof PAYSYSTEMS)[number]["key"];
  advertisementLength: number;
  lastIncumbent: string;
  series: string;
  grade: (typeof GENERALGRADES)[number] | (typeof ACQGRADES)[number];
  positionTitle: string;
  mpcn: string;
  sprd: string;
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
  telework?: "None" | "Regular-recurring" | "Situational";
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
  dcwf2: string[];
  dcwf3: string[];
  dcwfLevel?: "Basic" | "Intermediate" | "Advanced";
  dcwf2Level?: "Basic" | "Intermediate" | "Advanced";
  dcwf3Level?: "Basic" | "Intermediate" | "Advanced";
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
  supervisory: "Yes" | "No";
  jobBoardPostDate?: Date;
  joaPostDate?: Date;
  linkedInPostDate?: Date;
  linkedInSearchDate?: Date;
  resumeSearchDate?: Date;
  usaJobsPostDate?: Date;
  hrl?: Person;
  jobBoardPostId?: string;
  joaPostId?: string;
  linkedInPostId?: string;
  linkedInSearchId?: string;
  resumeSearchId?: string;
  usaJobsPostId?: string;
  jobBoardPostPerson?: Person;
  joaPostPerson?: Person;
  linkedInPostPerson?: Person;
  linkedInSearchPerson?: Person;
  resumeSearchPerson?: Person;
  usaJobsPostPerson?: Person;
  panelRequired?: "Yes" | "No";
  currentEmployee?: "Yes" | "No";
  csfcaApproval?: "Yes" | "No";
  hqApproval?: "Yes" | "No";
  titleV?: "Yes" | "No";
  paq?: "Yes" | "No";
}

export interface UpdateRequestStage {
  requestId: number;
  newStage: (typeof STAGES)[number]["key"];
  newSubStage: string;
  eventTitle: string;
  currentEmployee?: "Yes" | "No" | null;
  csfcaApproval?: "Yes" | "No" | null;
  hqApproval?: "Yes" | "No" | null;
  titleV?: "Yes" | "No" | null;
  rework?: boolean;
  reworkText?: string;
  reworkAuthor?: string;
}

/**
 * Queries the "requests" lists for available content types
 * The internal Id of the RPADocSet is neeeded when creating
 * new requests
 */
const useContentTypes = () => {
  return useQuery({
    queryKey: ["contentTypes", "requests"],
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
  filterParams: RequestFilter[],
  allOpen = false,
  allItems = false
) => {
  const queryClient = useQueryClient();
  const myRoles = useMyRoles();
  const OSFs = useOSFs();

  return useQuery({
    queryKey: [
      "paged-requests",
      sortParams,
      filterParams,
      page,
      allOpen,
      allItems,
      myRoles.roles,
    ],
    enabled: OSFs.isFetched, // wait until OSFs are fetched
    queryFn: () => {
      let skiptoken = 0;

      if (page > 0) {
        const data: PagedRequest[] =
          queryClient.getQueryData([
            "paged-requests",
            sortParams,
            filterParams,
            page - 1,
            allOpen,
            allItems,
            myRoles.roles,
          ]) || [];

        skiptoken = Number(data[data.length - 1].Id);
      }

      return getPagedRequests(
        skiptoken,
        sortParams,
        filterParams,
        allOpen,
        allItems,
        myRoles,
        OSFs.data || []
      );
    },
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

interface MYROLES {
  isAdmin?: boolean;
  isCA?: boolean;
  isCOSF?: boolean;
  isCSF?: boolean;
  isHRL?: boolean;
  isOSF?: boolean;
  isHQ?: boolean;
  roles: string[];
}

declare const _spPageContextInfo: {
  userEmail: string;
};

const getPagedRequests = async (
  skiptoken: number,
  sortParams: SortParams,
  filterParams: RequestFilter[],
  allOpen: boolean,
  allItems: boolean,
  myRoles: MYROLES,
  OSFs: OSF[]
) => {
  const requestedFields =
    "Id,positionTitle,requestType,requestTypeOther,paySystem,series,grade,officeSymbol,stage,subStage,Created,mpcn," +
    "Author/Id,Author/EMail,Author/Title,hrl/Id,hrl/EMail,hrl/Title";
  const expandedFields = "Author,hrl";

  let queryString = "ContentType eq 'RPADocSet'";
  if (!allItems) {
    queryString += " and stage ne 'Complete' and stage ne 'Cancelled'";
  }

  // if not showing all open requests, filter for those items relevant to current user
  // current user may have multiple roles!
  if (!allOpen && !allItems) {
    // if current user is a CSF or COSF, they may see all post-draft requests
    // no other filters need be added
    if (myRoles.isCSF || myRoles.isCOSF) {
      queryString += ` and (stage ne 'Draft' or Author/EMail eq '${_spPageContextInfo.userEmail}')`;
    } else {
      //current user is not CSF or OSF, apply additional filters
      const roleFilters = [];

      // if you're the author, you can always view your items
      roleFilters.push(`Author/EMail eq '${_spPageContextInfo.userEmail}'`);

      // HRL sees requests assigned to them, and unassigned requests
      if (myRoles.isHRL) {
        roleFilters.push(
          `stage ne 'Draft' and (hrl/EMail eq '${_spPageContextInfo.userEmail}')`
        );
      }

      // OSF sees requests assigned to their org
      if (myRoles.isOSF) {
        const myOrgs = OSFs.filter((osf) => {
          return osf.email === _spPageContextInfo.userEmail;
        });
        myOrgs.forEach((org) => {
          roleFilters.push(`stage ne 'Draft' and (osf eq '${org.Title}')`);
        });
      }

      // HQ only see NH-04 requests in the Candidate Offer Stage
      if (myRoles.isHQ) {
        roleFilters.push(
          `stage eq 'PackageApproval' and requestType eq 'Create/Update NH-04')`
        );
      }

      if (roleFilters.length >= 1) {
        queryString += ` and (`;
        roleFilters.forEach((filter, index) => {
          if (index >= 1) {
            queryString += ` or `;
          }
          queryString += `(${filter})`;
        });
        queryString += `)`;
      }
    }
  }

  filterParams.forEach((filter) => {
    queryString += ` and ${filter.queryString}`;
  });

  return spWebContext.web.lists
    .getByTitle("requests")
    .items.select(requestedFields)
    .expand(expandedFields)
    .filter(queryString)
    .orderBy(
      sortParams.sortColumn?.toString() || "Created",
      sortParams.sortDirection !== "descending"
    )
    .orderBy("Id", true) // Include this or non-unique sort values can cause issues
    .skip(skiptoken)
    .top(PAGESIZE)();
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
    "issueTo/Id,issueTo/EMail,issueTo/Title," +
    "hrl/Id,hrl/EMail,hrl/Title," +
    "jobBoardPostPerson/Id,jobBoardPostPerson/EMail,jobBoardPostPerson/Title," +
    "joaPostPerson/Id,joaPostPerson/EMail,joaPostPerson/Title," +
    "linkedInPostPerson/Id,linkedInPostPerson/EMail,linkedInPostPerson/Title," +
    "linkedInSearchPerson/Id,linkedInSearchPerson/EMail,linkedInSearchPerson/Title," +
    "resumeSearchPerson/Id,resumeSearchPerson/EMail,resumeSearchPerson/Title," +
    "usaJobsPostPerson/Id,usaJobsPostPerson/EMail,usaJobsPostPerson/Title";

  const expandedFields =
    "Author,supervisor,organizationalPOC,issueTo,hrl,jobBoardPostPerson,joaPostPerson,linkedInPostPerson,linkedInSearchPerson,resumeSearchPerson,usaJobsPostPerson";

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
    ["updateRequest"],
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

        const newFolderFields = await spWebContext.web
          .getFolderByServerRelativePath(newFolder.ServerRelativeUrl)
          .listItemAllFields();
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
      onSuccess: async (_data, request) => {
        // Mark requests as needing refreshed
        queryClient.invalidateQueries(["requests", Number(request.Id)]);
        queryClient.invalidateQueries(["paged-requests"]);
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

export const useCancelRequest = () => {
  const { dispatchToast } = useToastController("toaster");
  const addEvent = useAddEvent();
  return useMutation(
    ["cancelRequest"],
    async (requestId: number) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(requestId)
        .update({ stage: "Cancelled" });
    },
    {
      onSuccess: async (_data, requestId) => {
        dispatchToast(
          <Toast>
            <ToastTitle>Deleted request</ToastTitle>
          </Toast>,
          { intent: "success" }
        );
        addEvent.mutate({
          Title: "Request Cancelled",
          requestId: requestId,
        });
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
                Error cancelling request
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
  const allRoles = useRoles();
  const sendEmail = useSendEmail();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["updateStage"],
    async (request: UpdateRequestStage) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update({
          stage: request.newStage,
          subStage: request.newSubStage,
          ...(request.currentEmployee !== undefined && {
            currentEmployee: request.currentEmployee,
          }),
          ...(request.csfcaApproval !== undefined && {
            csfcaApproval: request.csfcaApproval,
          }),
          ...(request.hqApproval !== undefined && {
            hqApproval: request.hqApproval,
          }),
          ...(request.titleV !== undefined && {
            titleV: request.titleV,
          }),
        });
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
            OSFs.data,
            allRoles.data || [],
            request.rework ?? false,
            request.reworkText ?? "",
            request.reworkAuthor ?? ""
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
  | "dcwf2"
  | "dcwf3"
  | "linkedinQualifications"
  | "supervisor"
  | "organizationalPOC"
  | "issueTo"
  | "hrl"
  | "Created"
  | "jobBoardPostPerson"
  | "joaPostPerson"
  | "linkedInPostPerson"
  | "linkedInSearchPerson"
  | "resumeSearchPerson"
  | "usaJobsPostPerson"
> & {
  methods: string;
  dcwf: string;
  dcwf2: string;
  dcwf3: string;
  linkedinQualifications: string;
  supervisorId?: string;
  organizationalPOCId?: string;
  issueToId?: string;
  hrlId?: string;
  jobBoardPostPersonId?: string;
  joaPostPersonId?: string;
  linkedInPostPersonId?: string;
  linkedInSearchPersonId?: string;
  resumeSearchPersonId?: string;
  usaJobsPostPersonId?: string;
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
    dcwf2,
    dcwf3,
    linkedinQualifications,
    supervisor,
    organizationalPOC,
    issueTo,
    hrl,
    jobBoardPostPerson,
    joaPostPerson,
    linkedInPostPerson,
    linkedInSearchPerson,
    resumeSearchPerson,
    usaJobsPostPerson,
    requestTypeOther,
    ...rest
  } = request;

  let supervisorId;
  if (supervisor) {
    if (supervisor.Id === "-1") {
      supervisorId = (
        await spWebContext.web.ensureUser(supervisor.EMail)
      ).Id.toString();
    } else {
      supervisorId = supervisor.Id;
    }
  }

  let organizationalPOCId;
  if (organizationalPOC) {
    if (organizationalPOC.Id === "-1") {
      organizationalPOCId = (
        await spWebContext.web.ensureUser(organizationalPOC.EMail)
      ).Id.toString();
    } else {
      organizationalPOCId = organizationalPOC.Id;
    }
  }

  let issueToId;
  if (issueTo) {
    if (issueTo.Id === "-1") {
      issueToId = (
        await spWebContext.web.ensureUser(issueTo.EMail)
      ).Id.toString();
    } else {
      issueToId = issueTo.Id;
    }
  }

  let hrlId;
  if (hrl) {
    if (hrl.Id === "-1") {
      hrlId = (await spWebContext.web.ensureUser(hrl.EMail)).Id.toString();
    } else {
      hrlId = hrl.Id;
    }
  }

  let jobBoardPostPersonId;
  if (jobBoardPostPerson) {
    if (jobBoardPostPerson.Id === "-1") {
      jobBoardPostPersonId = (
        await spWebContext.web.ensureUser(jobBoardPostPerson.EMail)
      ).Id.toString();
    } else {
      jobBoardPostPersonId = jobBoardPostPerson.Id;
    }
  }

  let joaPostPersonId;
  if (joaPostPerson) {
    if (joaPostPerson.Id === "-1") {
      joaPostPersonId = (
        await spWebContext.web.ensureUser(joaPostPerson.EMail)
      ).Id.toString();
    } else {
      joaPostPersonId = joaPostPerson.Id;
    }
  }

  let linkedInPostPersonId;
  if (linkedInPostPerson) {
    if (linkedInPostPerson.Id === "-1") {
      linkedInPostPersonId = (
        await spWebContext.web.ensureUser(linkedInPostPerson.EMail)
      ).Id.toString();
    } else {
      linkedInPostPersonId = linkedInPostPerson.Id;
    }
  }

  let linkedInSearchPersonId;
  if (linkedInSearchPerson) {
    if (linkedInSearchPerson.Id === "-1") {
      linkedInSearchPersonId = (
        await spWebContext.web.ensureUser(linkedInSearchPerson.EMail)
      ).Id.toString();
    } else {
      linkedInSearchPersonId = linkedInSearchPerson.Id;
    }
  }

  let resumeSearchPersonId;
  if (resumeSearchPerson) {
    if (resumeSearchPerson.Id === "-1") {
      resumeSearchPersonId = (
        await spWebContext.web.ensureUser(resumeSearchPerson.EMail)
      ).Id.toString();
    } else {
      resumeSearchPersonId = resumeSearchPerson.Id;
    }
  }

  let usaJobsPostPersonId;
  if (usaJobsPostPerson) {
    if (usaJobsPostPerson.Id === "-1") {
      usaJobsPostPersonId = (
        await spWebContext.web.ensureUser(usaJobsPostPerson.EMail)
      ).Id.toString();
    } else {
      usaJobsPostPersonId = usaJobsPostPerson.Id;
    }
  }

  return {
    // if Person fields have been selected, include them
    ...(supervisorId && { supervisorId: supervisorId }),
    ...(organizationalPOCId && { organizationalPOCId: organizationalPOCId }),
    ...(issueToId && { issueToId: issueToId }),
    ...(hrlId && { hrlId: hrlId }),
    ...(jobBoardPostPersonId && { jobBoardPostPersonId: jobBoardPostPersonId }),
    ...(joaPostPersonId && { joaPostPersonId: joaPostPersonId }),
    ...(linkedInPostPersonId && { linkedInPostPersonId: linkedInPostPersonId }),
    ...(linkedInSearchPersonId && {
      linkedInSearchPersonId: linkedInSearchPersonId,
    }),
    ...(resumeSearchPersonId && { resumeSearchPersonId: resumeSearchPersonId }),
    ...(usaJobsPostPersonId && { usaJobsPostPersonId: usaJobsPostPersonId }),

    // stringify arrays for storage in SharePoint
    methods: JSON.stringify(methods),
    dcwf: JSON.stringify(dcwf),
    dcwf2: JSON.stringify(dcwf2),
    dcwf3: JSON.stringify(dcwf3),
    linkedinQualifications: JSON.stringify(linkedinQualifications),

    // blank out requestTypeOther if requestType isn't Other
    requestTypeOther: rest.requestType === "Other" ? requestTypeOther : "",

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
    subStage: request.subStage,
    Author: request.Author,
    requestType: request.requestType,
    requestTypeOther: request.requestTypeOther,
    mcrRequired: request.mcrRequired,
    paySystem: request.paySystem,
    advertisementLength: request.advertisementLength,
    lastIncumbent: request.lastIncumbent,
    series: request.series,
    grade: request.grade,
    positionTitle: request.positionTitle,
    mpcn: request.mpcn,
    sprd: request.sprd,
    fms: request.fms,
    officeSymbol: request.officeSymbol,
    positionSensitivity: request.positionSensitivity,
    dutyLocation: request.dutyLocation,
    osf: request.osf,
    methods: JSON.parse(request.methods),
    supervisor: request.supervisor,
    organizationalPOC: request.organizationalPOC,
    issueTo: request.issueTo,
    hrl: request.hrl,
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
    dcwf2: JSON.parse(request.dcwf2),
    dcwf3: JSON.parse(request.dcwf3),
    dcwfLevel: request.dcwfLevel,
    dcwf2Level: request.dcwf2Level,
    dcwf3Level: request.dcwf3Level,
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
    supervisory: request.supervisory,
    jobBoardPostDate: request.jobBoardPostDate
      ? new Date(request.jobBoardPostDate)
      : undefined,
    joaPostDate: request.joaPostDate
      ? new Date(request.joaPostDate)
      : undefined,
    linkedInPostDate: request.linkedInPostDate
      ? new Date(request.linkedInPostDate)
      : undefined,
    linkedInSearchDate: request.linkedInSearchDate
      ? new Date(request.linkedInSearchDate)
      : undefined,
    resumeSearchDate: request.resumeSearchDate
      ? new Date(request.resumeSearchDate)
      : undefined,
    usaJobsPostDate: request.usaJobsPostDate
      ? new Date(request.usaJobsPostDate)
      : undefined,
    jobBoardPostId: request.jobBoardPostId,
    joaPostId: request.joaPostId,
    linkedInPostId: request.linkedInPostId,
    linkedInSearchId: request.linkedInSearchId,
    resumeSearchId: request.resumeSearchId,
    usaJobsPostId: request.usaJobsPostId,
    jobBoardPostPerson: request.jobBoardPostPerson,
    joaPostPerson: request.joaPostPerson,
    linkedInPostPerson: request.linkedInPostPerson,
    linkedInSearchPerson: request.linkedInSearchPerson,
    resumeSearchPerson: request.resumeSearchPerson,
    usaJobsPostPerson: request.usaJobsPostPerson,
    panelRequired: request.panelRequired,
    currentEmployee: request.currentEmployee,
    csfcaApproval: request.csfcaApproval,
    hqApproval: request.hqApproval,
    titleV: request.titleV,
    paq: request.paq,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPagedRequestsFromSP = (requests: any) => {
  const returnObject: PagedRequest[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requests.forEach((request: any) => {
    returnObject.push({
      Id: request.Id,
      Author: request.Author,
      requestType: request.requestType,
      paySystem: request.paySystem,
      series: request.series,
      grade: request.grade,
      positionTitle: request.positionTitle,
      officeSymbol: request.officeSymbol,
      stage: request.stage,
      subStage: request.subStage,
      Created: new Date(request.Created),
      mpcn: request.mpcn,
      hrl: request.hrl,
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
  subStage: string;
  Created: Date;
  mpcn: string;
  hrl: Person;
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
  const HiringInfo = !values.advertisementLength || values.methods.length === 0;

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
      !values.linkedinPositionSummary ||
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
