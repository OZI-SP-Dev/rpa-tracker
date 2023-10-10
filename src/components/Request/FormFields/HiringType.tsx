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

interface IHiringType {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const HiringType = (hiringType: IHiringType) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={hiringType.name + "Id"}
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
        control={hiringType.control}
        rules={{
          required: "Hiring Type is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={hiringType.name + "Id"}
            aria-describedby={hiringType.name + "Err"}
            aria-invalid={hiringType.errors.hireType ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Internal" value="Internal" label="Internal" />
            <Radio key="External" value="External" label="External" />
          </RadioGroup>
        )}
      />
      {hiringType.errors.hireType && (
        <Text
          role="alert"
          id={hiringType.name + "Err"}
          className="requestErrorText"
        >
          {hiringType.errors.hireType.message}
        </Text>
      )}
    </div>
  );
};
export default HiringType;
