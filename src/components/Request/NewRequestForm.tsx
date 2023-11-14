import {
  Label,
  Title1,
  Button,
  Spinner,
  Tooltip,
  Badge,
  Title2,
  Divider,
} from "@fluentui/react-components";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  AlertSolidIcon,
  CompletedIcon,
  ContactIcon,
} from "@fluentui/react-icons-mdl2";
import { Person, RPARequest, useAddRequest } from "api/requestsApi";
import { useCurrentUser } from "api/UserApi";
import {
  RequestType,
  MCRRequired,
  PaySystem,
  HiringType,
  AdvertisementLength,
  Incumbent,
  Series,
  Grade,
  PositionTitle,
  MPCN,
  CPCN,
  FMS,
  OfficeSymbol,
  PositionSensitivity,
  DutyLocation,
  OSF,
  OrgApprover,
  Methods,
  Supervisor,
  OrganizationalPOC,
  IssueTo,
  FullPartTime,
  Salary,
  Telework,
  Remote,
  PCS,
  JOAQualifications,
  JOAIdealCandidate,
  Temporary,
  NTE,
  Incentives,
  CloseDateLCMC,
  CloseDateJOA,
  LinkedinPositionSummary,
  LinkedinQualifications,
  Certifications,
  LinkedinKSAs,
} from "components/Request/FormFields/FormFields";
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
  linkedinPositionSummary: string;
  linkedinQualifications: string[];
  dcwf: string[];
  linkedinKSAs: string;
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

  const linkedinQualifications = myForm.watch("linkedinQualifications");
  const linkedinCertification =
    linkedinQualifications.includes("certification");

  const temporary = myForm.watch("temporary");

  const createNewRequest = async (data: RHFRequest) => {
    const data2 = {
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

        <RequestType name="requestType" form={myForm} />

        <OSF name="osf" form={myForm} />

        <OrgApprover name="orgApprover" form={myForm} />

        <MCRRequired name="mcrRequired" form={myForm} />

        <Divider inset>
          <Title2 align="center">Position Information</Title2>
        </Divider>

        <PositionTitle name="positionTitle" form={myForm} />

        <PaySystem name="paySystem" form={myForm} />

        <Series name="series" form={myForm} />

        <Grade name="grade" form={myForm} />

        <OfficeSymbol name="officeSymbol" form={myForm} />

        <Supervisor name="supervisor" form={myForm} />

        <MPCN name="mpcn" form={myForm} />

        <CPCN name="cpcn" form={myForm} />

        <FMS name="fms" form={myForm} />

        <PositionSensitivity name="positionSensitivity" form={myForm} />

        <DutyLocation name="dutyLocation" form={myForm} />

        <Incumbent name="lastIncumbent" form={myForm} />

        <Divider inset>
          <Title2 align="center">Hiring Information</Title2>
        </Divider>

        <HiringType name="hiringType" form={myForm} />

        <AdvertisementLength name="advertisementLength" form={myForm} />

        <Methods name="methods" form={myForm} />

        {/* TODO: Possibly make below sections their own "pages" in a wizard like sequence? */}

        {lcmc && (
          <>
            <Divider inset>
              <Title2 align="center">
                Additional LCMC Job Board Information
              </Title2>
            </Divider>

            <CloseDateLCMC name="closeDateLCMC" form={myForm} />
          </>
        )}

        {joa && (
          <>
            <Divider inset>
              <Title2 align="center">JOA Additional Information</Title2>
            </Divider>

            <CloseDateJOA name="closeDateJOA" form={myForm} />

            <OrganizationalPOC name="organizationalPOC" form={myForm} />

            <IssueTo name="issueTo" form={myForm} />

            <FullPartTime name="fullPartTime" form={myForm} />

            <Salary name="salary" form={myForm} />

            <Telework name="telework" form={myForm} />

            <Remote name="remote" form={myForm} />

            <PCS name="pcs" form={myForm} />

            <JOAQualifications name="joaQualifications" form={myForm} />

            <JOAIdealCandidate name="joaIdealCandidate" form={myForm} />
          </>
        )}

        {linkedinPost && (
          <>
            <Divider inset>
              <Title2 align="center">
                LinkedIn Job Posting Additional Information
              </Title2>
            </Divider>

            <Temporary name="temporary" form={myForm} />

            {(temporary === "Term" || temporary === "Temp") && (
              <NTE name="nte" form={myForm} />
            )}

            <Salary name="salary" form={myForm} />

            <Incentives name="incentives" form={myForm} />

            <Telework name="telework" form={myForm} />

            <LinkedinPositionSummary
              name="linkedinPositionSummary"
              form={myForm}
            />

            <LinkedinQualifications
              name="linkedinQualifications"
              form={myForm}
            />

            {linkedinCertification && (
              <Certifications name="dcwf" form={myForm} />
            )}

            <LinkedinKSAs name="linkedinKSAs" form={myForm} />
          </>
        )}

        {linkedinSearch && (
          <>
            <Divider inset>
              <Title2 align="center">
                LinkedIn Profile Search Additional Information
              </Title2>
            </Divider>
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
