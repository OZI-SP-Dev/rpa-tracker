import { InfoLabel, Text } from "@fluentui/react-components";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { useFormContext } from "react-hook-form";

const rules = {
  maxLength: {
    value: 255,
    message: "Skills can be no longer than 255 characters",
  },
};

const LinkedinSearchSkills = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="fieldIcon" />
        <InfoLabel weight="semibold" info="C++, MATLAB, etc.">
          Skills
        </InfoLabel>
      </legend>
      <div style={{ display: "grid" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchSkill1"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Skill 1" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchSkill2"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Skill 2" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchSkill3"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Skill 3" }}
          disableError
        />
      </div>
      <div style={{ display: "grid", marginTop: "1em" }}>
        <BACInput<RHFRequest>
          name="linkedinSearchSkill4"
          rules={rules}
          fieldProps={{ title: "LinkedIn Search Skill 4" }}
          disableError
        />
      </div>
      {(form.formState.errors.linkedinSearchSkill1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="fieldErrorText">
            {form.formState.errors.linkedinSearchSkill1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchSkill2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchSkill2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchSkill3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchSkill3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchSkill4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.linkedinSearchSkill4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchSkills;
