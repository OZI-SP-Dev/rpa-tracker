import { Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { useFormContext } from "react-hook-form";

const rules = {
  maxLength: {
    value: 255,
    message: "Keywords can be no longer than 255 characters",
  },
};

const LinkedinSearchKeywords = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="fieldIcon" />
        <Text weight="semibold">Preferred Profile Keywords</Text>
      </legend>
      <div style={{ display: "grid" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchKeyword1"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Profile Keyword 1" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchKeyword2"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Profile Keyword 2" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchKeyword3"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Profile Keyword 3" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchKeyword4"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Profile Keyword 4" }}
          disableError
        />
      </div>
      {(form.formState.errors.linkedinSearchKeyword1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="fieldErrorText">
            {form.formState.errors.linkedinSearchKeyword1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchKeyword2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchKeyword2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchKeyword3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchKeyword3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchKeyword4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchKeyword4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchKeywords;
