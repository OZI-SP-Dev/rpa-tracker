import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const CPCN = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
      >
        <TextFieldIcon className="requestFieldIcon" />
        CPCN
      </Label>
      <Controller
        name="cpcn"
        control={form.control}
        rules={{
          required: "CPCN is required",
          maxLength: {
            value: 30,
            message: "CPCN cannot exceed 30 characters",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.cpcn ? "true" : "false"}
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.cpcn && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.cpcn.message}
        </Text>
      )}
    </div>
  );
};
export default CPCN;
