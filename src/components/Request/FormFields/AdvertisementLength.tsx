import { Label, Radio, RadioGroup, Text } from "@fluentui/react-components";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import "../Request.css";
import { RHFRequest } from "../NewRequestForm";
import { RadioButtonFilled } from "@fluentui/react-icons";

interface IAdvertisementLength {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const PaySystem = (adLength: IAdvertisementLength) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={adLength.name + "Id"}
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
        control={adLength.control}
        rules={{
          required: "Advertisement Length is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={adLength.name + "Id"}
            aria-describedby={adLength.name + "Err"}
            aria-invalid={
              adLength.errors.advertisementLength ? "true" : "false"
            }
            layout="horizontal"
            {...field}
          >
            <Radio value="Normal" label="Normal Period" />
            <Radio value="Extended" label="Extended Period (> 14 days)" />
          </RadioGroup>
        )}
      />
      {adLength.errors.advertisementLength && (
        <Text
          role="alert"
          id={adLength.name + "Err"}
          className="requestErrorText"
        >
          {adLength.errors.advertisementLength.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
