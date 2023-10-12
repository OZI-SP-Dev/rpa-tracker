import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { RadioButtonFilled } from "@fluentui/react-icons";

const MCRRequired = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <RadioButtonFilled className="requestFieldIcon" />
        MCR Required
      </Label>
      <Controller
        name="mcrRequired"
        control={form.control}
        rules={{
          required: "MCR Required is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.mcrRequired ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Yes" value="Yes" label="Yes" />
            <Radio key="No" value="No" label="No" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.mcrRequired && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.mcrRequired.message}
        </Text>
      )}
    </div>
  );
};
export default MCRRequired;
