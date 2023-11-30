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
import { UseFormReturn, useForm } from "react-hook-form";
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

export interface FormField {
  name: string;
  form: UseFormReturn<RHFRequest, unknown, undefined>;
}

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

      <form
        id="inReqForm"
        className="requestFormContainer"
        onSubmit={myForm.handleSubmit(createNewRequest)}
      >
        <Divider inset>
          <Title2 align="center">Routing Information</Title2>
        </Divider>
        {/* Requestor */}
        <div className="requestFieldContainer">
          <Label
            id="requestorId"
            weight="semibold"
            className="requestFieldLabel"
            required
          >
            <ContactIcon className="requestFieldIcon" />
            Requestor
          </Label>
          {user.text}
        </div>
        <FormFields.RequestType name="requestType" form={myForm} />
        <FormFields.OSF name="osf" form={myForm} />
        <FormFields.OrgApprover name="orgApprover" form={myForm} />
        <FormFields.MCRRequired name="mcrRequired" form={myForm} />

        <Divider inset>
          <Title2 align="center">Position Information</Title2>
        </Divider>
        <FormFields.PositionTitle name="positionTitle" form={myForm} />
        <FormFields.PaySystem name="paySystem" form={myForm} />
        <FormFields.Series name="series" form={myForm} />
        <FormFields.Grade name="grade" form={myForm} />
        <FormFields.OfficeSymbol name="officeSymbol" form={myForm} />
        <FormFields.Supervisor name="supervisor" form={myForm} />
        <FormFields.MPCN name="mpcn" form={myForm} />
        <FormFields.CPCN name="cpcn" form={myForm} />
        <FormFields.FMS name="fms" form={myForm} />
        <FormFields.PositionSensitivity
          name="positionSensitivity"
          form={myForm}
        />
        <FormFields.DutyLocation name="dutyLocation" form={myForm} />
        <FormFields.Incumbent name="lastIncumbent" form={myForm} />

        <Divider inset>
          <Title2 align="center">Hiring Information</Title2>
        </Divider>
        <FormFields.HiringType name="hiringType" form={myForm} />
        <FormFields.AdvertisementLength
          name="advertisementLength"
          form={myForm}
        />
        <FormFields.Methods name="methods" form={myForm} />

        {lcmc && (
          <>
            <Divider inset>
              <Title2 align="center">
                Additional LCMC Job Board Information
              </Title2>
            </Divider>
            <FormFields.CloseDateLCMC name="closeDateLCMC" form={myForm} />
          </>
        )}

        {joa && (
          <>
            <Divider inset>
              <Title2 align="center">JOA Additional Information</Title2>
            </Divider>
            <FormFields.CloseDateJOA name="closeDateJOA" form={myForm} />
            <FormFields.OrganizationalPOC
              name="organizationalPOC"
              form={myForm}
            />
            <FormFields.IssueTo name="issueTo" form={myForm} />
            <FormFields.FullPartTime name="fullPartTime" form={myForm} />
            <FormFields.Salary name="salary" form={myForm} />
            <FormFields.Telework name="telework" form={myForm} />
            <FormFields.Remote name="remote" form={myForm} />
            <FormFields.PCS name="pcs" form={myForm} />
            <FormFields.JOAQualifications
              name="joaQualifications"
              form={myForm}
            />

            <FormFields.JOAIdealCandidate
              name="joaIdealCandidate"
              form={myForm}
            />
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
            <FormFields.Temporary name="temporary" form={myForm} />
            {(temporary === "Term" || temporary === "Temp") && (
              <FormFields.NTE name="nte" form={myForm} />
            )}
            <FormFields.Salary name="salary" form={myForm} />
            <FormFields.Incentives name="incentives" form={myForm} />
            <FormFields.Telework name="telework" form={myForm} />
            <FormFields.LinkedinPositionSummary
              name="linkedinPositionSummary"
              form={myForm}
            />
            <FormFields.LinkedinQualifications
              name="linkedinQualifications"
              form={myForm}
            />
            {linkedinCertification && (
              <FormFields.Certifications name="dcwf" form={myForm} />
            )}
            <FormFields.LinkedinKSAs name="linkedinKSAs" form={myForm} />
          </>
        )}

        {linkedinSearch && (
          <>
            <Divider inset>
              <Title2 align="center">
                LinkedIn Profile Search Additional Information
              </Title2>
            </Divider>
            <FormFields.LinkedinSearchTitles
              name="linkedinTitles"
              form={myForm}
            />
            <FormFields.LinkedinSearchSkills
              name="linkedinSkills"
              form={myForm}
            />
            <FormFields.LinkedinSearchEmployers
              name="linkedinEmployers"
              form={myForm}
            />
            <FormFields.LinkedinSearchStudies
              name="linkedinStudies"
              form={myForm}
            />
            <FormFields.LinkedinSearchKeywords
              name="linkedinKeyWords"
              form={myForm}
            />
            <FormFields.LinkedinSearchComments
              name="linkedinComments"
              form={myForm}
            />
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
            <FormFields.CloseDateUsaJobs
              name="closeDateUsaJobs"
              form={myForm}
            />
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
    </div>
  );
};

export default NewRequestForm;
