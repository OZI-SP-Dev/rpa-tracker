import { InfoLabel, Input, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const rules = {
  maxLength: {
    value: 255,
    message: "Field of Study can be no longer than 255 characters",
  },
};

const LinkedinSearchStudies = ({ name, form }: FormField) => {
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="requestFieldIcon" />
        <InfoLabel
          weight="semibold"
          info="Computer Science, Aerospace Engineering, etc."
        >
          Preferred Academic Field of Study
        </InfoLabel>
      </legend>
      <Controller
        name="linkedinSearchStudy1"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Study 1"
            style={{ width: "100%" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchStudy1 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchStudy2"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Study 2"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchStudy2 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchStudy3"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Study 3"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchStudy3 ? "true" : "false"
            }
            id={name + "3Id"}
          />
        )}
      />
      <Controller
        name="linkedinSearchStudy4"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Study 4"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchStudy4 ? "true" : "false"
            }
            id={name + "4Id"}
          />
        )}
      />
      <br />
      {(form.formState.errors.linkedinSearchStudy1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="requestErrorText">
            {form.formState.errors.linkedinSearchStudy1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchStudy2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchStudy2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchStudy3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchStudy3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchStudy4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchStudy4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchStudies;
