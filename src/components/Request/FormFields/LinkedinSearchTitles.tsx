import { Input, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const rules = {
  maxLength: {
    value: 255,
    message: "Job Titles can be no longer than 255 characters",
  },
};

const LinkedinSearchTitles = ({ name, form }: FormField) => {
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="requestFieldIcon" />
        <Text weight="semibold">Similar Job Titles</Text>
      </legend>
      <Controller
        name="linkedinSearchTitle1"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Title 1"
            style={{ width: "100%" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchTitle1 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchTitle2"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Title 2"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchTitle2 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchTitle3"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Title 3"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchTitle3 ? "true" : "false"
            }
            id={name + "3Id"}
          />
        )}
      />
      <Controller
        name="linkedinSearchTitle4"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Title 4"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchTitle4 ? "true" : "false"
            }
            id={name + "4Id"}
          />
        )}
      />
      <br />
      {(form.formState.errors.linkedinSearchTitle1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="requestErrorText">
            {form.formState.errors.linkedinSearchTitle1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchTitle2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchTitle2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchTitle3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchTitle3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchTitle4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchTitle4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchTitles;
