import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { useFormContext } from "react-hook-form";

const rules = {
  maxLength: {
    value: 255,
    message: "Employer can be no longer than 255 characters",
  },
};

const LinkedinSearchEmployers = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="fieldIcon" />
        <InfoLabel weight="semibold" info="Google, Boeing, Raytheon, etc.">
          Preferred Current/Past Employers
        </InfoLabel>
      </legend>
      <div style={{ display: "grid" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchEmployer1"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Employer 1" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchEmployer2"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Employer 2" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchEmployer3"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Employer 3" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchEmployer4"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Employer 4" }}
          disableError
        />
      </div>
      {(form.formState.errors.linkedinSearchEmployer1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="fieldErrorText">
            {form.formState.errors.linkedinSearchEmployer1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchEmployer2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchEmployer2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchEmployer3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchEmployer3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchEmployer4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchEmployer4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchEmployers;
