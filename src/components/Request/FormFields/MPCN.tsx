import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";

const MPCN = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
      >
        <NumberFieldIcon className="requestFieldIcon" />
        MPCN
      </Label>
      <Controller
        name="mpcn"
        control={form.control}
        rules={{
          required: "MPCN is required",
          minLength: {
            value: 7,
            message: "MPCN cannot be less than 7 digits",
          },
          maxLength: {
            value: 10,
            message: "MPCN cannot be more than 10 digits",
          },
          pattern: {
            value: /^\d+$/,
            message: "MPCN can only consist of numbers",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.mpcn ? "true" : "false"}
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.mpcn && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.mpcn.message}
        </Text>
      )}
    </div>
  );
};
export default MPCN;
