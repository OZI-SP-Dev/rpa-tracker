import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { RadioButtonFilled } from "@fluentui/react-icons";

const Telework = ({ name, form }: FormField) => {
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
        Telework Possible
      </Label>
      <Controller
        name="telework"
        control={form.control}
        rules={{
          required: "Telework Possible is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.telework ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Yes" value="Yes" label="Yes" />
            <Radio key="No" value="No" label="No" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.telework && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.telework.message}
        </Text>
      )}
    </div>
  );
};
export default Telework;
