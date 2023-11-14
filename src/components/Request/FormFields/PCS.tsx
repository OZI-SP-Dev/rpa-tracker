import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { RadioButtonFilled } from "@fluentui/react-icons";

const PCS = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <RadioButtonFilled className="requestFieldIcon" />
        Position Eligible for PCS
      </Label>
      <Controller
        name="pcs"
        control={form.control}
        rules={{
          required: "A selection is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.pcs ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Yes" value="Yes" label="Yes" />
            <Radio key="No" value="No" label="No" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.pcs && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.pcs.message}
        </Text>
      )}
    </div>
  );
};
export default PCS;
