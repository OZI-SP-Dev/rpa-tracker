import { Label, Title1, Button } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { RPARequest } from "api/requestsApi";
import { useCurrentUser } from "api/UserApi";
import {
  RequestType,
  MCRRequired,
  PaySystem,
  HiringType,
  AdvertisementLength,
  Incumbent,
} from "./FormFields/FormFields";
import "./Request.css";

// Probably use the omit system with RPARequest later, too simple right now
export type RHFRequest = {
  requestType: string;
  mcrRequired: string;
  paySystem: string; // "NH" | "GS" | "GG";
  hireType: string; // "Internal" | "External";
  advertisementLength: string; // "Normal" | "Extended";
  lastIncumbent: string;
};

const NewRequestForm = () => {
  const user = useCurrentUser();
  //const addRequest = useAddRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RHFRequest>({
    defaultValues: {
      requestType: "",
      mcrRequired: "",
      paySystem: "NH",
      hireType: "",
      advertisementLength: "",
      lastIncumbent: "",
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

    //const newRequest = await addRequest.mutateAsync(data2);
    console.log(data2);
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
        onSubmit={handleSubmit(createNewRequest)}
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

        <RequestType
          name="requestType"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <MCRRequired
          name="mcrRequired"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <PaySystem
          name="paySystem"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <HiringType
          name="hiringType"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        {/* Advertisement Length */}
        <AdvertisementLength
          name="advertisementLength"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        {/* Incumbent */}
        <Incumbent
          name="lastIncumbent"
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <div className="requestCreateButton">
          <div>
            {/* {(addRequest.isLoading || addAdditionalInfo.isLoading) && (
              <Spinner
                style={{ justifyContent: "flex-start" }}
                size="small"
                label="Creating Request..."
              />
            )} */}
            {
              // !addRequest.isLoading && !addAdditionalInfo.isLoading && (
              <Button appearance="primary" type="submit">
                Submit Request
                {/* {!addRequest.isError && !addAdditionalInfo.isError
                    ? "Create In Processing Request"
                    : "Retry"} */}
              </Button>
              // )
            }
            {/* {addRequest.isError && (
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
            )} */}
            {/* {addAdditionalInfo.isError && (
              <Tooltip
                content={
                  addAdditionalInfo.error instanceof Error
                    ? addAdditionalInfo.error.message
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
            )} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRequestForm;
