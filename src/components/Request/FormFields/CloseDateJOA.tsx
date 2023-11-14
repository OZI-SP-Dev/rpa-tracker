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

const CloseDateJOA = ({ name, form }: FormField) => {
  const today = new Date(Date.now());
  const minDate = addDays(today, 0);
  const maxDate = addDays(today, 120);

  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <CalendarIcon className="requestFieldIcon" />
        Close date for Job Opportunity Announcement (JOA)
      </Label>
      <Controller
        name="closeDateJOA"
        control={form.control}
        rules={{
          required: "A date is required",
        }}
        render={({ field }) => (
          <DatePicker
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.closeDateJOA ? "true" : "false"}
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
      {form.formState.errors.closeDateJOA && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.closeDateJOA.message}
        </Text>
      )}
    </div>
  );
};

export default CloseDateJOA;
