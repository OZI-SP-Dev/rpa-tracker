import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const HiringType = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="hireType"
        labelText="Hiring Type"
        rules={{
          required: "Hiring Type is required",
        }}
        fieldProps={{ layout: "horizontal" }}
      >
        <Radio key="Internal" value="Internal" label="Internal" />
        <Radio key="External" value="External" label="External" />
      </BACRadioGroup>
    </div>
  );
};
export default HiringType;
