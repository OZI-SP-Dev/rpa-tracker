import BACInput from "components/BaseFormFields/BACInput";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";

const DutyLocation = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="dutyLocation"
        labelText="Duty Location"
        rules={{
          required: "Duty Location is required",
        }}
      />
    </div>
  );
};
export default DutyLocation;
