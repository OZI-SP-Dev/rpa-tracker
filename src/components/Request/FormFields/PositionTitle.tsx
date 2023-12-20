import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";

const PositionTitle = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="positionTitle"
        labelText="Position Title"
        rules={{
          required: "Position Title is required",
        }}
      />
    </div>
  );
};
export default PositionTitle;
