import { InfoLabel, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const LinkedinPositionSummary = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
        info="A brief summary of the job description (3-4 sentences)"
      >
        <TextFieldIcon className="requestFieldIcon" />
        Position Summary
      </InfoLabel>
      <Controller
        name="linkedinPositionSummary"
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
              form.formState.errors.linkedinPositionSummary ? "true" : "false"
            }
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.linkedinPositionSummary && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.linkedinPositionSummary.message}
        </Text>
      )}
    </div>
  );
};
export default LinkedinPositionSummary;
