import { Label, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const LinkedinSearchComments = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <TextFieldIcon className="requestFieldIcon" />
        Additional Comments/Information
      </Label>
      <Controller
        name="linkedinSearchComments"
        control={form.control}
        render={({ field }) => (
          <Textarea
            {...field}
            resize="vertical"
            rows={10}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.linkedinSearchComments ? "true" : "false"
            }
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.linkedinSearchComments && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.linkedinSearchComments.message}
        </Text>
      )}
    </div>
  );
};
export default LinkedinSearchComments;
