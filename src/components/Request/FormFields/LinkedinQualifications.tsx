import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCheckbox from "components/BaseFormFields/BACCheckbox";

const options = [
  { id: "citizenship", text: "U.S. Citizenship" },
  { id: "clearance", text: "Obtain & maintain Security clearance" },
  { id: "drugtest", text: "This is designated Drug Testing Position" },
  { id: "certification", text: "Certifications/Licensure" },
  {
    id: "financial",
    text: "Financial Management Statement - OGE-450 Financial Disclosure Report",
  },
  {
    id: "travel",
    text: "Travel - Select if travel is more than occasional. For more detail, reference the SPRD.",
  },
];

const LinkedinQualifications = () => {
  return (
    <div className="requestFieldContainer">
      <BACCheckbox<RHFRequest>
        name="linkedinQualifications"
        labelText="Qualifications"
        labelInfo="De-select what is not applicable for your position from the following
        list"
        options={options}
      />
    </div>
  );
};
export default LinkedinQualifications;
