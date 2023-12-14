import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCheckbox from "components/BaseFormFields/BACCheckbox";

const options = [
  { id: "lcmc", text: "LCMC Job Announcement Board" },
  { id: "joa", text: "Job Opportunity Announcement (JOA)" },
  { id: "linkedinPost", text: "LinkedIn Job Posting" },
  { id: "linkedinSearch", text: "LinkedIn Profile Search" },
  { id: "resumeSearch", text: "COS Resume Repository Search" },
  { id: "usaJobsFlyer", text: "USA Jobs Flyer" },
];

const Methods = () => {
  return (
    <div className="requestFieldContainer">
      <BACCheckbox<RHFRequest>
        name="methods"
        labelText="Announcement Method(s)"
        rules={{
          required: "At least one Announcement Method is required",
        }}
        options={options}
      />
    </div>
  );
};
export default Methods;
