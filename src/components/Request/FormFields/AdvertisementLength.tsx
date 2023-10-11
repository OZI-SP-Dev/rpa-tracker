import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { RadioButtonFilled } from "@fluentui/react-icons";

const AdvertisementLength = ({ name, form }: FormField) => {
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
        Advertisement Length
      </Label>
      <Controller
        name="advertisementLength"
        control={form.control}
        rules={{
          required: "Advertisement Length is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={name + "Id"}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.advertisementLength ? "true" : "false"
            }
            layout="horizontal"
            {...field}
          >
            <Radio value="Normal" label="Normal Period" />
            <Radio value="Extended" label="Extended Period (> 14 days)" />
          </RadioGroup>
        )}
      />
      {form.formState.errors.advertisementLength && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.advertisementLength.message}
        </Text>
      )}
    </div>
  );
};
export default AdvertisementLength;
