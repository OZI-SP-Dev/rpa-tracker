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

interface IMCRRequired {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const MCRRequired = (mcrRequired: IMCRRequired) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={mcrRequired.name + "Id"}
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
        control={mcrRequired.control}
        rules={{
          required: "MCR Required is required",
        }}
        render={({ field }) => (
          <RadioGroup
            id={mcrRequired.name + "Id"}
            aria-describedby={mcrRequired.name + "Err"}
            aria-invalid={mcrRequired.errors.mcrRequired ? "true" : "false"}
            layout="horizontal"
            {...field}
          >
            <Radio key="Yes" value="Yes" label="Yes" />
            <Radio key="No" value="No" label="No" />
          </RadioGroup>
        )}
      />
      {mcrRequired.errors.mcrRequired && (
        <Text
          role="alert"
          id={mcrRequired.name + "Err"}
          className="requestErrorText"
        >
          {mcrRequired.errors.mcrRequired.message}
        </Text>
      )}
    </div>
  );
};
export default MCRRequired;
