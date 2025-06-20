import { Title1, Tooltip, Badge } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import { AlertSolidIcon } from "@fluentui/react-icons-mdl2";
import { Person, useMutateRequest, useRequest } from "api/requestsApi";
import "components/Request/Request.css";
import { addDays } from "@fluentui/react";
import Wizard from "components/Request/NewRequestForm.Wizard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export type RHFRequest = {
  Id?: string;
  requestType: string;
  requestTypeOther: string;
  mcrRequired: string;
  paySystem: string; // "NH" | "GS" | "GG";
  advertisementLength: number;
  lastIncumbent: string;
  series: string; // 4 digit string
  grade: string;
  positionTitle: string;
  mpcn: string;
  sprd: string;
  fms: string;
  officeSymbol: string;
  positionSensitivity: string;
  dutyLocation: string;
  osf: string;
  methods: string[];
  supervisor: Person;
  organizationalPOC: Person;
  issueTo: Person;
  fullPartTime: string;
  salaryLow: number;
  salaryHigh: number;
  telework: string;
  remote: string;
  pcs: string;
  joaQualifications: string;
  joaIdealCandidate: string;
  temporary: string;
  nte?: Date;
  incentives: string;
  closeDateLCMC?: Date;
  closeDateJOA?: Date;
  closeDateUsaJobsFlyer?: Date;
  linkedinPositionSummary: string;
  linkedinQualifications: string[];
  dcwf: string[];
  dcwf2: string[];
  dcwf3: string[];
  dcwfLevel?: string;
  dcwf2Level?: string;
  dcwf3Level?: string;
  linkedinKSAs: string;
  linkedinSearchTitle1: string;
  linkedinSearchTitle2: string;
  linkedinSearchTitle3: string;
  linkedinSearchTitle4: string;
  linkedinSearchSkill1: string;
  linkedinSearchSkill2: string;
  linkedinSearchSkill3: string;
  linkedinSearchSkill4: string;
  linkedinSearchEmployer1: string;
  linkedinSearchEmployer2: string;
  linkedinSearchEmployer3: string;
  linkedinSearchEmployer4: string;
  linkedinSearchStudy1: string;
  linkedinSearchStudy2: string;
  linkedinSearchStudy3: string;
  linkedinSearchStudy4: string;
  linkedinSearchKeyword1: string;
  linkedinSearchKeyword2: string;
  linkedinSearchKeyword3: string;
  linkedinSearchKeyword4: string;
  linkedinSearchComments: string;
  supervisory: string;
  paq: string;
};

const NewRequestForm = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const addRequest = useMutateRequest();

  const today = new Date(Date.now());
  const defaultValues = {
    requestType: "",
    requestTypeOther: "",
    mcrRequired: "",
    paySystem: "NH",
    advertisementLength: 7,
    lastIncumbent: "",
    series: "",
    grade: "",
    positionTitle: "",
    mpcn: "",
    sprd: "",
    fms: "",
    officeSymbol: "",
    positionSensitivity: "",
    dutyLocation: "",
    osf: "",
    methods: [],
    fullPartTime: "",
    salaryLow: 20999,
    salaryHigh: 31683,
    telework: "",
    remote: "",
    pcs: "",
    joaQualifications: "",
    joaIdealCandidate: "",
    temporary: "",
    incentives: "",
    closeDateLCMC: addDays(today, 7),
    closeDateJOA: addDays(today, 30),
    closeDateUsaJobsFlyer: addDays(today, 14),
    linkedinPositionSummary: "",
    linkedinQualifications: [
      "citizenship",
      "clearance",
      "drugtest",
      "certification",
      "financial",
      "physical",
      "travel",
    ],
    dcwf: [],
    dcwf2: [],
    dcwf3: [],
    dcwfLevel: "",
    dcwf2Level: "",
    dcwf3Level: "",
    linkedinKSAs: "",
    linkedinSearchTitle1: "",
    linkedinSearchTitle2: "",
    linkedinSearchTitle3: "",
    linkedinSearchTitle4: "",
    linkedinSearchSkill1: "",
    linkedinSearchSkill2: "",
    linkedinSearchSkill3: "",
    linkedinSearchSkill4: "",
    linkedinSearchEmployer1: "",
    linkedinSearchEmployer2: "",
    linkedinSearchEmployer3: "",
    linkedinSearchEmployer4: "",
    linkedinSearchStudy1: "",
    linkedinSearchStudy2: "",
    linkedinSearchStudy3: "",
    linkedinSearchStudy4: "",
    linkedinSearchKeyword1: "",
    linkedinSearchKeyword2: "",
    linkedinSearchKeyword3: "",
    linkedinSearchKeyword4: "",
    linkedinSearchComments: "",
    supervisory: "No",
    paq: "No",
  };

  const myForm = useForm<RHFRequest>({
    defaultValues: defaultValues,
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  useEffect(() => {
    if (params.requestId) {
      // Remove optional Author and Created properties from data object
      const { Author, Created, ...data } = request.data ?? {};
      myForm.reset(data);
    } else {
      myForm.reset(defaultValues);
    }
  }, [request.data, params.requestId, myForm]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Title1 align="center">
        <b>Initiate New RPA Request</b>
      </Title1>
      {!!params.requestId && request.isLoading && "Loading..."}
      {(!params.requestId || request.isFetched) && (
        <FormProvider {...myForm}>
          <form id="inReqForm" className="requestFormContainer">
            <Wizard />

            {addRequest.isError && (
              <Tooltip
                content={
                  addRequest.error instanceof Error
                    ? addRequest.error.message
                    : "An error occurred."
                }
                relationship="label"
              >
                <Badge
                  size="extra-large"
                  appearance="ghost"
                  color="danger"
                  icon={<AlertSolidIcon />}
                />
              </Tooltip>
            )}
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default NewRequestForm;
