import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACTextarea from "components/BaseFormFields/BACTextarea";

const LinkedinKSAs = () => {
  return (
    <div className="requestFieldContainer">
      <BACTextarea<RHFRequest>
        name="linkedinKSAs"
        labelText="Top related KSA's"
        labelInfo="In layman's terms, provide the top 3-4 related Knowledge, Skills, and
        Abilitiles (KSA's)"
        fieldProps={{ resize: "vertical", rows: 8 }}
      />
    </div>
  );
};
export default LinkedinKSAs;
