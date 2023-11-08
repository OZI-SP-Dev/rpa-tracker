import { DatePicker } from "@fluentui/react";
import { Label, Text } from "@fluentui/react-components";
import { CalendarIcon } from "@fluentui/react-icons-mdl2";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const NTE = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <CalendarIcon className="requestFieldIcon" />
        Not to exceed date
      </Label>
      <Controller
        name="nte"
        control={form.control}
        rules={{
          required: "A date is required",
        }}
        render={({ field }) => (
          <DatePicker
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.nte ? "true" : "false"}
            formatDate={onFormatDate}
            onSelectDate={field.onChange}
            {...field}
          />
        )}
      />
      {form.formState.errors.nte && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.nte.message}
        </Text>
      )}
    </div>
  );
};

export default NTE;
