import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const PCS = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="pcs"
        labelText="Position Eligible for PCS"
        rules={{
          required: "A selection is required",
        }}
        fieldProps={{ layout: "horizontal" }}
      >
        <Radio key="Yes" value="Yes" label="Yes" />
        <Radio key="No" value="No" label="No" />
      </BACRadioGroup>
    </div>
  );
};
export default PCS;
