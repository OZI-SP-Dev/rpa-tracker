import BACInput from "components/BaseFormFields/BACInput";
import { RHFRequest } from "components/Request/NewRequestForm";
import { useFormContext } from "react-hook-form";
import "components/Request/Request.css";

const DutyLocation = () => {
  const form = useFormContext();

  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="dutyLocation"
        labelText="Duty Location"
        rules={{
          required: "Duty Location is required",
        }}
        onBlur={() => form.trigger(undefined, { shouldFocus: true })}
      />
    </div>
  );
};
export default DutyLocation;
