import { PAYSYSTEMS } from "consts/PaySystems";
import {
  Text,
  Label,
  Combobox,
  Option,
  Title1,
  RadioGroup,
  Radio,
  Button,
  Input,
} from "@fluentui/react-components";
import { useForm, Controller } from "react-hook-form";
import {
  // TextFieldIcon,
  // NumberFieldIcon,
  // CalendarIcon,
  DropdownIcon,
  ContactIcon,
  // AlertSolidIcon,
} from "@fluentui/react-icons-mdl2";
import { ToggleLeftRegular, RadioButtonFilled } from "@fluentui/react-icons";
// import { UserContext } from "providers/UserProvider";
import { RPARequest } from "api/requestsApi";
import { useCurrentUser } from "api/UserApi";
import RequestType from "./RequestType";
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

        {/* MCR Required */}
        <div className="requestFieldContainer">
          <Label
            htmlFor="mcrRequiredId"
            size="small"
            weight="semibold"
            className="requestFieldLabel"
            required
          >
            <RadioButtonFilled className="requestFieldIcon" />
            MCR Required
          </Label>
          <Controller
            name="mcrRequired"
            control={control}
            rules={{
              required: "MCR Required is required",
            }}
            render={({ field }) => (
              <RadioGroup
                id="mcrRequiredId"
                aria-describedby="mcrRequiredErr"
                layout="horizontal"
                {...field}
              >
                <Radio key="Yes" value="Yes" label="Yes" />
                <Radio key="No" value="No" label="No" />
              </RadioGroup>
            )}
          />
          {errors.mcrRequired && (
            <Text id="mcrRequiredErr" className="requesterrorText">
              {errors.mcrRequired.message}
            </Text>
          )}
        </div>

        {/* Pay System */}
        <div className="requestFieldContainer">
          <Label
            id="paySystemId"
            size="small"
            weight="semibold"
            className="requestFieldLabel"
            required
          >
            <DropdownIcon className="requestFieldIcon" />
            Pay System
          </Label>
          <Controller
            name="paySystem"
            control={control}
            render={({ field }) => (
              <Combobox
                aria-describedby="paySystemErr"
                aria-labelledby="paySystemId"
                autoComplete="on"
                {...field}
                value={
                  PAYSYSTEMS.find(({ key }) => key === field.value)?.text ?? ""
                }
                selectedOptions={[field.value ?? ""]}
                onOptionSelect={(_event, data) => {
                  setValue("paySystem", data.optionValue ?? "", {
                    shouldValidate: true,
                  });
                }}
              >
                {PAYSYSTEMS.map((paysys) => (
                  <Option key={paysys.key} value={paysys.key}>
                    {paysys.text}
                  </Option>
                ))}
              </Combobox>
            )}
          />
          {errors.paySystem && (
            <Text id="paySystem" className="requesterrorText">
              {errors.paySystem.message}
            </Text>
          )}
        </div>

        {/* Hiring Type */}
        <div className="requestFieldContainer">
          <Label
            htmlFor="hireTypeId"
            size="small"
            weight="semibold"
            className="requestFieldLabel"
            required
          >
            <RadioButtonFilled className="requestFieldIcon" />
            Hiring Type
          </Label>
          <Controller
            name="hireType"
            control={control}
            rules={{
              required: "Hiring Type is required",
            }}
            render={({ field }) => (
              <RadioGroup
                id="empTypeId"
                aria-describedby="empTypeErr"
                layout="horizontal"
                {...field}
              >
                <Radio key="Internal" value="Internal" label="Internal" />
                <Radio key="External" value="External" label="External" />
              </RadioGroup>
            )}
          />
          {errors.hireType && (
            <Text id="hireTypeErr" className="requesterrorText">
              {errors.hireType.message}
            </Text>
          )}
        </div>

        {/* Advertisement Length */}
        <div className="requestFieldContainer">
          <Label
            htmlFor="advertisementLengthId"
            size="small"
            weight="semibold"
            className="requestFieldLabel"
            required
          >
            <RadioButtonFilled className="requestFieldIcon" />
            Advertisement Length
          </Label>
          <Controller
            name="advertisementLength"
            control={control}
            rules={{
              required: "Advertisement Length is required",
            }}
            render={({ field }) => (
              <RadioGroup
                id="advertisementLengthId"
                aria-describedby="advertisementLengthErr"
                layout="horizontal"
                {...field}
              >
                <Radio value="Normal" label="Normal Period" />
                <Radio value="Extended" label="Extended Period (> 14 days)" />
              </RadioGroup>
            )}
          />
          {errors.advertisementLength && (
            <Text id="advertisementLengthErr" className="requesterrorText">
              {errors.advertisementLength.message}
            </Text>
          )}
        </div>

        {/* Incumbent */}
        <div className="requestFieldContainer">
          <Label
            htmlFor="lastIncumbentId"
            size="small"
            weight="semibold"
            className="requestFieldLabel"
          >
            <ContactIcon className="requestFieldIcon" />
            Name of last incubment (if applicable)
          </Label>
          <Controller
            name="lastIncumbent"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                aria-describedby="lastIncumbentErr"
                id="lastIncumbentId"
                placeholder="Example format: 'Last, First MI'"
              />
            )}
          />
          {errors.lastIncumbent && (
            <Text id="lastIncumbentErr" className="requesterrorText">
              {errors.lastIncumbent.message}
            </Text>
          )}
        </div>

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
