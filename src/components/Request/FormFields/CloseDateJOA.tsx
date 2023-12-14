import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import { addDays } from "@fluentui/react";

const today = new Date(Date.now());
const minDate = addDays(today, 0);
const maxDate = addDays(today, 120);

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const CloseDateJOA = () => {
  return (
    <div className="requestFieldContainer">
      <BACDatePicker<RHFRequest>
        name="closeDateJOA"
        labelText="Close date for Job Opportunity Announcement (JOA)"
        rules={{
          required: "A date is required",
        }}
        fieldProps={{
          formatDate: onFormatDate,
          minDate: minDate,
          maxDate: maxDate,
        }}
      />
    </div>
  );
};
export default CloseDateJOA;
