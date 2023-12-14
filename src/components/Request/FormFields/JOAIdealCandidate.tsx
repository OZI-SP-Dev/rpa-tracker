import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACTextarea from "components/BaseFormFields/BACTextarea";

const JOAIdealCandidate = () => {
  return (
    <div className="requestFieldContainer">
      <BACTextarea<RHFRequest>
        name="joaIdealCandidate"
        labelText="Ideal Candidate"
        rules={{
          required: "Ideal Candidate text is required",
        }}
        fieldProps={{ resize: "vertical", rows: 10 }}
      />
    </div>
  );
};
export default JOAIdealCandidate;
