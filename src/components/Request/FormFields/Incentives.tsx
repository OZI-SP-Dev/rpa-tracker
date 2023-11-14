import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { RadioButtonFilled } from "@fluentui/react-icons";

const Incentives = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <RadioButtonFilled className="requestFieldIcon" />
        Recruitment, Retention, and Relocation incentives are available
      </Label>
      <Controller
        name="incentives"
        control={form.control}
        rules={{
          required: "A selection is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.incentives ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Yes" value="Yes" label="Yes" />
            <Radio key="No" value="No" label="No" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.incentives && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.incentives.message}
        </Text>
      )}
    </div>
  );
};
export default Incentives;
