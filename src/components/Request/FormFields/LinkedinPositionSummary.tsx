import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACTextarea from "components/BaseFormFields/BACTextarea";

const LinkedinPositionSummary = () => {
  return (
    <div className="requestFieldContainer">
      <BACTextarea<RHFRequest>
        name="linkedinPositionSummary"
        labelText="Position Summary"
        labelInfo="A brief summary of the job description (3-4 sentences)"
        rules={{
          required: "Position Summary is required",
        }}
        fieldProps={{ resize: "vertical", rows: 10 }}
      />
    </div>
  );
};
export default LinkedinPositionSummary;
