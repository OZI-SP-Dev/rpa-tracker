import { InfoLabel, Input, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const rules = {
  maxLength: {
    value: 255,
    message: "Skills can be no longer than 255 characters",
  },
};

const LinkedinSearchSkills = ({ name, form }: FormField) => {
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="requestFieldIcon" />
        <InfoLabel weight="semibold" info="C++, MATLAB, etc.">
          Skills
        </InfoLabel>
      </legend>
      <Controller
        name="linkedinSearchSkill1"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Skill 1"
            style={{ width: "100%" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchSkill1 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchSkill2"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Skill 2"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchSkill2 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchSkill3"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Skill 3"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchSkill3 ? "true" : "false"
            }
            id={name + "3Id"}
          />
        )}
      />
      <Controller
        name="linkedinSearchSkill4"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Skill 4"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchSkill4 ? "true" : "false"
            }
            id={name + "4Id"}
          />
        )}
      />
      <br />
      {(form.formState.errors.linkedinSearchSkill1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="requestErrorText">
            {form.formState.errors.linkedinSearchSkill1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchSkill2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchSkill2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchSkill3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchSkill3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchSkill4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchSkill4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchSkills;
