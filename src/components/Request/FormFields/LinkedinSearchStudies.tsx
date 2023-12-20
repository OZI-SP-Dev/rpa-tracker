import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { useFormContext } from "react-hook-form";

const rules = {
  maxLength: {
    value: 255,
    message: "Field of Study can be no longer than 255 characters",
  },
};

const LinkedinSearchStudies = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="fieldIcon" />
        <InfoLabel
          weight="semibold"
          info="Computer Science, Aerospace Engineering, etc."
        >
          Preferred Academic Field of Study
        </InfoLabel>
      </legend>
      <div style={{ display: "grid" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchStudy1"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Study 1" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchStudy2"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Study 2" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchStudy3"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Study 3" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchStudy4"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Study 4" }}
          disableError
        />
      </div>
      {(form.formState.errors.linkedinSearchStudy1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="fieldErrorText">
            {form.formState.errors.linkedinSearchStudy1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchStudy2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchStudy2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchStudy3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchStudy3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchStudy4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchStudy4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchStudies;
