import { Label, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const JOAQualifications = ({ name, form }: FormField) => {
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
        Qualifications/Requirements
      </Label>
      <Controller
        name="joaQualifications"
        control={form.control}
        rules={{
          required: "Qualifications/Requirements is required",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            resize="vertical"
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.joaQualifications ? "true" : "false"
            }
            id={name + "Id"}
            style={{ height: "20em" }}
          />
        )}
      />
      <Text>
        The staffing specialist will review the Qualifications/Requirements and
        may reach out to you for additional information
      </Text>
      {form.formState.errors.joaQualifications && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.joaQualifications.message}
        </Text>
      )}
    </div>
  );
};
export default JOAQualifications;
