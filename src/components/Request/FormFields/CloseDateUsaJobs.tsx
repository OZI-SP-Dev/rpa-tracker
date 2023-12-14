import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";

const today = new Date(Date.now());

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const CloseDateUsaJobs = () => {
  return (
    <div className="requestFieldContainer">
      <BACDatePicker<RHFRequest>
        name="closeDateUsaJobsFlyer"
        labelText="Close date for USA Jobs Flyer"
        rules={{
          required: "A date is required",
        }}
        fieldProps={{ formatDate: onFormatDate, minDate: today }}
      />
    </div>
  );
};
export default CloseDateUsaJobs;
