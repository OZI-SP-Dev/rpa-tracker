import { Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { useFormContext } from "react-hook-form";

const rules = {
  maxLength: {
    value: 255,
    message: "Job Titles can be no longer than 255 characters",
  },
};

const LinkedinSearchTitles = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="fieldIcon" />
        <Text weight="semibold">Similar Job Titles</Text>
      </legend>
      <div style={{ display: "grid" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchTitle1"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Title 1" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchTitle2"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Title 2" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchTitle3"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Title 3" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchTitle4"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Title 4" }}
          disableError
        />
      </div>
      {(form.formState.errors.linkedinSearchTitle1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="fieldErrorText">
            {form.formState.errors.linkedinSearchTitle1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchTitle2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchTitle2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchTitle3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchTitle3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchTitle4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchTitle4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchTitles;
