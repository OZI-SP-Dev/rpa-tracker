import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { RadioButtonFilled } from "@fluentui/react-icons";

const FullPartTime = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <RadioButtonFilled className="requestFieldIcon" />
        Full Time/Part Time Position
      </Label>
      <Controller
        name="fullPartTime"
        control={form.control}
        rules={{
          required: "Full Time/Part Time Position is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.fullPartTime ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio value="Full" label="Full Time" />
            <Radio value="Part" label="Part Time" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.fullPartTime && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.fullPartTime.message}
        </Text>
      )}
    </div>
  );
};
export default FullPartTime;
