import { Label, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const JOAPositionSummary = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <TextFieldIcon className="requestFieldIcon" />
        Position Summary
      </Label>
      <Controller
        name="joaPositionSummary"
        control={form.control}
        rules={{
          required: "Position Summary is required",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            resize="vertical"
            rows={10}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.joaPositionSummary ? "true" : "false"
            }
            id={name + "Id"}
          />
        )}
      />
      <Text>A brief summary of the job description (3-4 sentences)</Text>
      {form.formState.errors.joaPositionSummary && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.joaPositionSummary.message}
        </Text>
      )}
    </div>
  );
};
export default JOAPositionSummary;
