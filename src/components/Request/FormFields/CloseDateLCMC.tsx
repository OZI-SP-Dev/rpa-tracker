import { addDays, DatePicker } from "@fluentui/react";
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

const CloseDateLCMC = ({ name, form }: FormField) => {
  const today = new Date(Date.now());
  const minDate = addDays(today, 7);
  const maxDate = addDays(today, 30);

  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <CalendarIcon className="requestFieldIcon" />
        Close date for AFLCMC Posting
      </Label>
      <Controller
        name="closeDateLCMC"
        control={form.control}
        rules={{
          required: "A date is required",
        }}
        render={({ field }) => (
          <DatePicker
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={
              form.formState.errors.closeDateLCMC ? "true" : "false"
            }
            //isRequired
            placeholder="Select a date..."
            ariaLabel="Select a date"
            formatDate={onFormatDate}
            minDate={minDate}
            maxDate={maxDate}
            onSelectDate={field.onChange}
            {...field}
          />
        )}
      />
      {form.formState.errors.closeDateLCMC && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.closeDateLCMC.message}
        </Text>
      )}
    </div>
  );
};

export default CloseDateLCMC;
