import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";

const PaySystem = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <NumberFieldIcon className="requestFieldIcon" />
        Series number
      </Label>
      <Controller
        name="series"
        control={form.control}
        rules={{
          required: "Series is required",
          minLength: {
            value: 4,
            message: "Series is a 4 digit identifier",
          },
          maxLength: {
            value: 4,
            message: "Series is a 4 digit identifier",
          },
          pattern: {
            value: /^\d+$/,
            message: "Series can only consist of numbers",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.series ? "true" : "false"}
            id={name + "Id"}
            placeholder="Example: 2210"
          />
        )}
      />
      {form.formState.errors.series && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.series.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
