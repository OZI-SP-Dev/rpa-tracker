import { Input, Label, Text } from "@fluentui/react-components";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import "../Request.css";
import { RHFRequest } from "../NewRequestForm";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

interface IIncumbent {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const PaySystem = (incumbent: IIncumbent) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={incumbent.name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
      >
        <ContactIcon className="requestFieldIcon" />
        Name of last incubment (if applicable)
      </Label>
      <Controller
        name="lastIncumbent"
        control={incumbent.control}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={incumbent.name + "Err"}
            aria-invalid={incumbent.errors.lastIncumbent ? "true" : "false"}
            id={incumbent.name + "Id"}
            placeholder="Example format: 'Last, First MI'"
          />
        )}
      />
      {incumbent.errors.lastIncumbent && (
        <Text
          role="alert"
          id={incumbent.name + "Err"}
          className="requestErrorText"
        >
          {incumbent.errors.lastIncumbent.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
