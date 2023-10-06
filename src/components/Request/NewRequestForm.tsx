import { PAYSYSTEMS } from "consts/PaySystems";
import {
  makeStyles,
  Text,
  Label,
  tokens,
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
import { REQUESTTYPES } from "consts/RequestTypes";

/* FluentUI Styling */
const useStyles = makeStyles({
  formContainer: { display: "grid", maxWidth: "800px", width: "100%" },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    display: "block",
  },
  fieldIcon: {
    marginRight: ".5em",
  },
  fieldContainer: {
    marginLeft: "1em",
    marginRight: "1em",
    marginTop: "1em",
    marginBottom: "1em",
    display: "grid",
    position: "relative",
  },
  fieldLabel: {
    paddingBottom: ".5em",
    display: "flex",
  },
  fieldDescription: {
    display: "block",
  },
  createButton: {
    display: "grid",
    justifyContent: "end",
    marginLeft: "1em",
    marginRight: "1em",
    marginTop: ".5em",
    marginBottom: ".5em",
  },
  listBox: { maxHeight: "15em" },
});

// Probably use the omit system with RPARequest later, too simple right now
type RHFRequest = {
  requestType: string;
  mcrRequired: string;
  paySystem: string; // "NH" | "GS" | "GG";
  hireType: string; // "Internal" | "External";
  advertisementLength: string; // "Normal" | "Extended";
  lastIncumbent: string;
};

const NewRequestForm = () => {
  const classes = useStyles();
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
      <Title1
        align="center"
        style={{
          whiteSpace: "nowrap",
          marginLeft: "1em",
          marginRight: "1em",
          marginTop: ".5em",
          marginBottom: ".5em",
        }}
      >
        <b>Initiate New RPA Request</b>
      </Title1>

      <form
        id="inReqForm"
        className={classes.formContainer}
        onSubmit={handleSubmit(createNewRequest)}
      >
        {/* Requestor */}
        <div className={classes.fieldContainer}>
          <Label
            id="requestorId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <ContactIcon className={classes.fieldIcon} />
            Requestor
          </Label>
          {user.text}
        </div>

        {/* Request Type */}
        <div className={classes.fieldContainer}>
          <Label
            id="requestTypeId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <DropdownIcon className={classes.fieldIcon} />
            Request Type
          </Label>
          <Controller
            name="requestType"
            control={control}
            render={({ field }) => (
              <Combobox
                aria-describedby="requestTypeErr"
                aria-labelledby="requestTypeId"
                autoComplete="on"
                {...field}
                selectedOptions={[field.value ?? ""]}
                onOptionSelect={(_event, data) => {
                  setValue("requestType", data.optionValue ?? "", {
                    shouldValidate: true,
                  });
                }}
              >
                {REQUESTTYPES.map((reqType) => (
                  <Option key={reqType} value={reqType}>
                    {reqType}
                  </Option>
                ))}
              </Combobox>
            )}
          />
          {errors.requestType && (
            <Text id="requestType" className={classes.errorText}>
              {errors.requestType.message}
            </Text>
          )}
        </div>

        {/* MCR Required */}
        <div className={classes.fieldContainer}>
          <Label
            htmlFor="mcrRequiredId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <RadioButtonFilled className={classes.fieldIcon} />
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
            <Text id="mcrRequiredErr" className={classes.errorText}>
              {errors.mcrRequired.message}
            </Text>
          )}
        </div>

        {/* Pay System */}
        <div className={classes.fieldContainer}>
          <Label
            id="paySystemId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <DropdownIcon className={classes.fieldIcon} />
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
                  setValue("paySystem", data.optionValue, {
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
            <Text id="paySystem" className={classes.errorText}>
              {errors.paySystem.message}
            </Text>
          )}
        </div>

        {/* Hiring Type */}
        <div className={classes.fieldContainer}>
          <Label
            htmlFor="hireTypeId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <RadioButtonFilled className={classes.fieldIcon} />
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
            <Text id="hireTypeErr" className={classes.errorText}>
              {errors.hireType.message}
            </Text>
          )}
        </div>

        {/* Advertisement Length */}
        <div className={classes.fieldContainer}>
          <Label
            htmlFor="advertisementLengthId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
            required
          >
            <RadioButtonFilled className={classes.fieldIcon} />
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
            <Text id="advertisementLengthErr" className={classes.errorText}>
              {errors.advertisementLength.message}
            </Text>
          )}
        </div>

        {/* Incumbent */}
        <div className={classes.fieldContainer}>
          <Label
            htmlFor="lastIncumbentId"
            size="small"
            weight="semibold"
            className={classes.fieldLabel}
          >
            <ContactIcon className={classes.fieldIcon} />
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
            <Text id="lastIncumbentErr" className={classes.errorText}>
              {errors.lastIncumbent.message}
            </Text>
          )}
        </div>

        <div className={classes.createButton}>
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
