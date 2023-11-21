import { InfoLabel, Input, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const rules = {
  maxLength: {
    value: 255,
    message: "Employer can be no longer than 255 characters",
  },
};

const LinkedinSearchEmployers = ({ name, form }: FormField) => {
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="requestFieldIcon" />
        <InfoLabel weight="semibold" info="Google, Boeing, Raytheon, etc.">
          Preferred Current/Past Employers
        </InfoLabel>
      </legend>
      <Controller
        name="linkedinSearchEmployer1"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Employer 1"
            style={{ width: "100%" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchEmployer1 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchEmployer2"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Employer 2"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchEmployer2 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchEmployer3"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Employer 3"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchEmployer3 ? "true" : "false"
            }
            id={name + "3Id"}
          />
        )}
      />
      <Controller
        name="linkedinSearchEmployer4"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Employer 4"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchEmployer4 ? "true" : "false"
            }
            id={name + "4Id"}
          />
        )}
      />
      <br />
      {(form.formState.errors.linkedinSearchEmployer1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="requestErrorText">
            {form.formState.errors.linkedinSearchEmployer1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchEmployer2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchEmployer2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchEmployer3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchEmployer3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchEmployer4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchEmployer4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchEmployers;
