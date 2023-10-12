import {
  Label,
  Title1,
  Button,
  Spinner,
  Tooltip,
  Badge,
} from "@fluentui/react-components";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  AlertSolidIcon,
  CompletedIcon,
  ContactIcon,
} from "@fluentui/react-icons-mdl2";
import { RPARequest, useAddRequest } from "api/requestsApi";
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
} from "components/Request/FormFields/FormFields";
import "components/Request/Request.css";

// Probably use the omit system with RPARequest later, too simple right now
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
};

export interface FormField {
  name: string;
  form: UseFormReturn<RHFRequest, unknown, undefined>;
}

const NewRequestForm = () => {
  const user = useCurrentUser();
  const addRequest = useAddRequest();

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
    },
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  const createNewRequest = async (data: RHFRequest) => {
    //TODO: properly convert from RHFRequest to Request
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
        {/* Requestor */}
        <div className="requestFieldContainer">
          <Label
            id="requestorId"
            size="small"
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

        <MCRRequired name="mcrRequired" form={myForm} />

        <PositionTitle name="positionTitle" form={myForm} />

        <PaySystem name="paySystem" form={myForm} />

        <Series name="series" form={myForm} />

        <Grade name="grade" form={myForm} />

        <MPCN name="mpcn" form={myForm} />

        <CPCN name="cpcn" form={myForm} />

        <FMS name="fms" form={myForm} />

        <OfficeSymbol name="officeSymbol" form={myForm} />

        <PositionSensitivity name="positionSensitivity" form={myForm} />

        <DutyLocation name="dutyLocation" form={myForm} />

        <HiringType name="hiringType" form={myForm} />

        <AdvertisementLength name="advertisementLength" form={myForm} />

        <Incumbent name="lastIncumbent" form={myForm} />

        <div className="requestCreateButton">
          <div>
            {addRequest.isLoading && (
              <Spinner
                style={{ justifyContent: "flex-start" }}
                size="small"
                label="Creating Request..."
              />
            )}
            {!addRequest.isLoading && (
              <Button appearance="primary" type="submit">
                Submit Request
                {!addRequest.isError ? "Create In Processing Request" : "Retry"}
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
