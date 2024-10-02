import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACInput from "components/BaseFormFields/BACInput";

const AdvertisementLength = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="advertisementLength"
        labelText="Advertisement Length"
        rules={{
          required: "Close date is required",
          min: {
            value: 7,
            message: "Advertisement Length can be 7 to 30 days",
          },
          max: {
            value: 30,
            message: "Advertisement Length can be 7 to 30 days",
          },
        }}
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
