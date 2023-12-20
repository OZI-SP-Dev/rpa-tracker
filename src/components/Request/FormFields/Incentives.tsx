import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const Incentives = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="incentives"
        labelText="Recruitment, Retention, and Relocation incentives are available"
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
export default Incentives;
