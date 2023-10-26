import { Label, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const JOAIdealCandidate = ({ name, form }: FormField) => {
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
        Ideal Candidate
      </Label>
      <Controller
        name="joaIdealCandidate"
        control={form.control}
        rules={{
          required: "Ideal Candidate text is required",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            resize="vertical"
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.joaIdealCandidate ? "true" : "false"
            }
            id={name + "Id"}
            style={{ height: "20em" }}
          />
        )}
      />
      {form.formState.errors.joaIdealCandidate && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.joaIdealCandidate.message}
        </Text>
      )}
    </div>
  );
};
export default JOAIdealCandidate;
