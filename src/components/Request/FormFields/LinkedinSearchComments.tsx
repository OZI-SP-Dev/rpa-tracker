import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACTextarea from "components/BaseFormFields/BACTextarea";

const LinkedinSearchComments = () => {
  return (
    <div className="requestFieldContainer">
      <BACTextarea<RHFRequest>
        name="linkedinSearchComments"
        labelText="Additional Comments/Information"
        fieldProps={{ resize: "vertical", rows: 10 }}
      />
    </div>
  );
};
export default LinkedinSearchComments;
