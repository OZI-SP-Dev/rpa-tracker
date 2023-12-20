import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";
import { addDays } from "@fluentui/react";

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const CloseDateLCMC = () => {
  const today = new Date(Date.now());
  const minDate = addDays(today, 7);
  const maxDate = addDays(today, 30);

  return (
    <div className="requestFieldContainer">
      <BACDatePicker<RHFRequest>
        name="closeDateLCMC"
        labelText="Close date for AFLCMC Posting"
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
export default CloseDateLCMC;
