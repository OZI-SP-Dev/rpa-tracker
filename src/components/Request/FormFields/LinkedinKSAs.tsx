import { InfoLabel, Text, Textarea } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const LinkedinKSAs = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
        info="In layman's terms, provide the top 3-4 related Knowledge, Skills, and
        Abilitiles (KSA's)"
      >
        <TextFieldIcon className="requestFieldIcon" />
        Top related KSA's
      </InfoLabel>
      <Controller
        name="linkedinKSAs"
        control={form.control}
        rules={{
          required: "KSA's are required",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            resize="vertical"
            rows={8}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.linkedinKSAs ? "true" : "false"}
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.linkedinKSAs && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.linkedinKSAs.message}
        </Text>
      )}
    </div>
  );
};
export default LinkedinKSAs;
