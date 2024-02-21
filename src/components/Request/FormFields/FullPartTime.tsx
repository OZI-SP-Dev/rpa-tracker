import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const FullPartTime = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="fullPartTime"
        labelText="Full Time/Part Time Position"
        fieldProps={{ layout: "horizontal" }}
      >
        <Radio value="Full" label="Full Time" />
        <Radio value="Part" label="Part Time" />
      </BACRadioGroup>
    </div>
  );
};
export default FullPartTime;
