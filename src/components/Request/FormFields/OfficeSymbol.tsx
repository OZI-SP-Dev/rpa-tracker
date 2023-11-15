import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const OfficeSymbol = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <TextFieldIcon className="requestFieldIcon" />
        Office Symbol
      </Label>
      <Controller
        name="officeSymbol"
        control={form.control}
        rules={{
          maxLength: {
            value: 255,
            message: "Office Symbol can be no longer than 255 characters",
          },
          required: "Office Symbol is required",
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.officeSymbol ? "true" : "false"}
            id={name + "Id"}
            placeholder="Example format: 'AFLCMC/OZIP'"
          />
        )}
      />
      {form.formState.errors.officeSymbol && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.officeSymbol.message}
        </Text>
      )}
    </div>
  );
};
export default OfficeSymbol;
