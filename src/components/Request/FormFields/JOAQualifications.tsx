import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { Text } from "@fluentui/react-components";

const JOAQualifications = () => {
  return (
    <div className="requestFieldContainer">
      <BACTextarea<RHFRequest>
        name="joaQualifications"
        labelText="Qualifications/Requirements"
        rules={{
          required: "Qualifications/Requirements is required",
        }}
        fieldProps={{ resize: "vertical", rows: 10 }}
      />
      <Text>
        The staffing specialist will review the Qualifications/Requirements and
        may reach out to you for additional information
      </Text>
    </div>
  );
};
export default JOAQualifications;
