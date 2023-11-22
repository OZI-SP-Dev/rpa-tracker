import { Input, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const rules = {
  maxLength: {
    value: 255,
    message: "Keywords can be no longer than 255 characters",
  },
};

const LinkedinSearchKeywords = ({ name, form }: FormField) => {
  return (
    <fieldset>
      <legend>
        <TextFieldIcon className="requestFieldIcon" />
        <Text weight="semibold">Preferred Profile Keywords</Text>
      </legend>
      <Controller
        name="linkedinSearchKeyword1"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Keyword 1"
            style={{ width: "100%" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchKeyword1 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchKeyword2"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Keyword 2"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchKeyword2 ? "true" : "false"
            }
          />
        )}
      />
      <Controller
        name="linkedinSearchKeyword3"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Keyword 3"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchKeyword3 ? "true" : "false"
            }
            id={name + "3Id"}
          />
        )}
      />
      <Controller
        name="linkedinSearchKeyword4"
        control={form.control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            title="LinkedIn Search Keyword 4"
            style={{ width: "100%", marginTop: "1em" }}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchKeyword4 ? "true" : "false"
            }
            id={name + "4Id"}
          />
        )}
      />
      <br />
      {(form.formState.errors.linkedinSearchKeyword1 && (
        <>
          <br />
          <Text role="alert" id={name + "Err"} className="requestErrorText">
            {form.formState.errors.linkedinSearchKeyword1.message}
          </Text>
        </>
      )) ||
        (form.formState.errors.linkedinSearchKeyword2 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchKeyword2.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchKeyword3 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchKeyword3.message}
            </Text>
          </>
        )) ||
        (form.formState.errors.linkedinSearchKeyword4 && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.linkedinSearchKeyword4.message}
            </Text>
          </>
        ))}
    </fieldset>
  );
};
export default LinkedinSearchKeywords;
