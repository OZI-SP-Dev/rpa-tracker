import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const DutyLocation = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
      >
        <TextFieldIcon className="requestFieldIcon" />
        Duty Location
      </Label>
      <Controller
        name="dutyLocation"
        control={form.control}
        rules={{
          maxLength: {
            value: 255,
            message: "Duty Location can be no longer than 255 characters",
          },
          required: "Duty Location is required",
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={form.formState.errors.dutyLocation ? "true" : "false"}
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.dutyLocation && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.dutyLocation.message}
        </Text>
      )}
    </div>
  );
};
export default DutyLocation;
