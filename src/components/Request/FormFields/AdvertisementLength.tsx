import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACInput from "components/BaseFormFields/BACInput";

const AdvertisementLength = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="advertisementLength"
        labelText="Advertisement Length"
        fieldProps={{
          type: "number",
          step: "1",
          min: "7",
          max: "30",
        }}
      />
    </div>
  );
};
export default AdvertisementLength;
