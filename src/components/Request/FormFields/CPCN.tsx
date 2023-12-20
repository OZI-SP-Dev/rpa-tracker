import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";

const CPCN = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="cpcn"
        labelText="CPCN"
        rules={{
          required: "CPCN is required",
          maxLength: {
            value: 30,
            message: "CPCN cannot exceed 30 characters",
          },
        }}
      />
    </div>
  );
};
export default CPCN;
