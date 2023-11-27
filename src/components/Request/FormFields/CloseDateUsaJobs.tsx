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

const CloseDateUsaJobs = ({ name, form }: FormField) => {
  const today = new Date(Date.now());

  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <CalendarIcon className="requestFieldIcon" />
        Close date for USA Jobs Flyer
      </Label>
      <Controller
        name="closeDateUsaJobsFlyer"
        control={form.control}
        rules={{
          required: "A date is required",
        }}
        render={({ field }) => (
          <DatePicker
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={
              form.formState.errors.closeDateUsaJobsFlyer ? "true" : "false"
            }
            placeholder="Select a date..."
            ariaLabel="Select a date"
            formatDate={onFormatDate}
            minDate={today}
            onSelectDate={field.onChange}
            {...field}
          />
        )}
      />
      {form.formState.errors.closeDateUsaJobsFlyer && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.closeDateUsaJobsFlyer.message}
        </Text>
      )}
    </div>
  );
};

export default CloseDateUsaJobs;
