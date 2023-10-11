import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { RadioButtonFilled } from "@fluentui/react-icons";

const HiringType = ({ name, form }: FormField) => {
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
        Hiring Type
      </Label>
      <Controller
        name="hireType"
        control={form.control}
        rules={{
          required: "Hiring Type is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.hireType ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Internal" value="Internal" label="Internal" />
            <Radio key="External" value="External" label="External" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.hireType && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.hireType.message}
        </Text>
      )}
    </div>
  );
};
export default HiringType;
