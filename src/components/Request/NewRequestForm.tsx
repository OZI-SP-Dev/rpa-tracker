import {
  Label,
  Title1,
  Button,
  Spinner,
  Tooltip,
  Badge,
  Title2,
  Divider,
  InfoLabel,
} from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";
import {
  AlertSolidIcon,
  CompletedIcon,
  ContactIcon,
} from "@fluentui/react-icons-mdl2";
import { Person, RPARequest, useAddRequest } from "api/requestsApi";
import { useCurrentUser } from "api/UserApi";
import * as FormFields from "components/Request/FormFields/FormFields";
import "components/Request/Request.css";
import { addDays } from "@fluentui/react";
import { Navigate } from "react-router-dom";

export type RHFRequest = {
  requestType: string;
  mcrRequired: string;
  paySystem: string; // "NH" | "GS" | "GG";
  hireType: string; // "Internal" | "External";
  advertisementLength: string; // "Normal" | "Extended";
  lastIncumbent: string;
  series: string; // 4 digit string
  grade: string;
  positionTitle: string;
  mpcn: string;
  cpcn: string;
  fms: string;
  officeSymbol: string;
  positionSensitivity: string;
  dutyLocation: string;
  osf: string;
  orgApprover?: Person;
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
};

const NewRequestForm = () => {
  const user = useCurrentUser();
  const addRequest = useAddRequest();

  const today = new Date(Date.now());

  const myForm = useForm<RHFRequest>({
    defaultValues: {
      requestType: "",
      mcrRequired: "",
      paySystem: "NH",
      hireType: "",
      advertisementLength: "",
      lastIncumbent: "",
      series: "",
      grade: "",
      positionTitle: "",
      mpcn: "",
      cpcn: "",
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
    },
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  const methods = myForm.watch("methods");
  const lcmc = methods.includes("lcmc");
  const joa = methods.includes("joa");
  const linkedinPost = methods.includes("linkedinPost");
  const linkedinSearch = methods.includes("linkedinSearch");
  const resumeSearch = methods.includes("resumeSearch");
  const usaJobsFlyer = methods.includes("usaJobsFlyer");

  const linkedinQualifications = myForm.watch("linkedinQualifications");
  const linkedinCertification =
    linkedinQualifications.includes("certification");

  const temporary = myForm.watch("temporary");

  const createNewRequest = async (data: RHFRequest) => {
    const data2 = {
      stage: "Draft",
      ...data,
    } as RPARequest;

    const newRequest = await addRequest.mutateAsync(data2);
    console.log(newRequest);
  };

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
      <FormProvider {...myForm}>
        <form
          id="inReqForm"
          className="requestFormContainer"
          onSubmit={myForm.handleSubmit(createNewRequest)}
        >
          {addRequest.isSuccess && (
            <Navigate to={"/Request/" + addRequest.data.Id} />
          )}
          <Divider inset>
            <Title2 align="center">Routing Information</Title2>
          </Divider>
          {/* Requestor */}
          <div className="requestFieldContainer">
            <Label
              id="requestorId"
              weight="semibold"
              className="fieldLabel"
              required
            >
              <ContactIcon className="fieldIcon" />
              Requestor
            </Label>
            {user.text}
          </div>
          <FormFields.RequestType />
          <FormFields.OSF />
          <FormFields.OrgApprover />
          <FormFields.MCRRequired />

          <Divider inset>
            <Title2 align="center">Position Information</Title2>
          </Divider>
          <FormFields.PositionTitle />
          <FormFields.PaySystem />
          <FormFields.Series />
          <FormFields.Grade />
          <FormFields.OfficeSymbol />
          <FormFields.Supervisor />
          <FormFields.MPCN />
          <FormFields.CPCN />
          <FormFields.FMS />
          <FormFields.PositionSensitivity />
          <FormFields.DutyLocation />
          <FormFields.Incumbent />

          <Divider inset>
            <Title2 align="center">Hiring Information</Title2>
          </Divider>
          <FormFields.HiringType />
          <FormFields.AdvertisementLength />
          <FormFields.Methods />

          {lcmc && (
            <>
              <Divider inset>
                <Title2 align="center">
                  Additional LCMC Job Board Information
                </Title2>
              </Divider>
              <FormFields.CloseDateLCMC />
            </>
          )}

          {joa && (
            <>
              <Divider inset>
                <Title2 align="center">JOA Additional Information</Title2>
              </Divider>
              <FormFields.CloseDateJOA />
              <FormFields.OrganizationalPOC />
              <FormFields.IssueTo />
              <FormFields.FullPartTime />
              <FormFields.Salary />
              <FormFields.Telework />
              <FormFields.Remote />
              <FormFields.PCS />
              <FormFields.JOAQualifications />

              <FormFields.JOAIdealCandidate />
            </>
          )}

          {linkedinPost && (
            <>
              <Divider inset>
                <Title2 align="center">
                  LinkedIn Job Posting Additional Information
                  <InfoLabel
                    size="large"
                    info="LinkedIn anouncements are posted for 30 days"
                  />
                </Title2>
              </Divider>
              <FormFields.Temporary />
              {(temporary === "Term" || temporary === "Temp") && (
                <FormFields.NTE />
              )}
              <FormFields.Salary />
              <FormFields.Incentives />
              <FormFields.Telework />
              <FormFields.LinkedinPositionSummary />
              <FormFields.LinkedinQualifications />
              {linkedinCertification && <FormFields.Certifications />}
              <FormFields.LinkedinKSAs />
            </>
          )}

          {linkedinSearch && (
            <>
              <Divider inset>
                <Title2 align="center">
                  LinkedIn Profile Search Additional Information
                </Title2>
              </Divider>
              <FormFields.LinkedinSearchTitles />
              <FormFields.LinkedinSearchSkills />
              <FormFields.LinkedinSearchEmployers />
              <FormFields.LinkedinSearchStudies />
              <FormFields.LinkedinSearchKeywords />
              <FormFields.LinkedinSearchComments />
            </>
          )}

          {resumeSearch && (
            <>
              <Divider inset>
                <Title2 align="center">
                  Resume Search Additional Information
                </Title2>
              </Divider>
            </>
          )}

          {usaJobsFlyer && (
            <>
              <Divider inset>
                <Title2 align="center">
                  USA Jobs Flyer Additional Information
                </Title2>
              </Divider>
              <FormFields.CloseDateUsaJobs />
            </>
          )}

          <div className="requestCreateButton">
            <div>
              {addRequest.isLoading && (
                <Spinner
                  style={{ justifyContent: "flex-start" }}
                  label="Creating Request..."
                />
              )}
              {!addRequest.isLoading && (
                <Button appearance="primary" type="submit">
                  {!addRequest.isError ? "Submit Request" : "Retry"}
                </Button>
              )}
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
              {addRequest.isSuccess && (
                <Tooltip content="Success!" relationship="label">
                  <Badge
                    size="extra-large"
                    appearance="ghost"
                    color="success"
                    icon={<CompletedIcon />}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewRequestForm;
