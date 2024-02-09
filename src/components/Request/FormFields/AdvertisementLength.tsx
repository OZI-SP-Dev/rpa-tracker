import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const AdvertisementLength = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="advertisementLength"
        labelText="Advertisement Length"
        fieldProps={{ layout: "horizontal" }}
      >
        <Radio value="Normal" label="Normal Period" />
        <Radio value="Extended" label="Extended Period (> 14 days)" />
      </BACRadioGroup>
    </div>
  );
};
export default AdvertisementLength;
