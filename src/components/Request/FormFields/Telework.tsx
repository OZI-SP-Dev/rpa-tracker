import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";

const Telework = () => {
  return (
    <div className="requestFieldContainer">
      <BACRadioGroup<RHFRequest>
        name="telework"
        labelText="Telework Possible"
        fieldProps={{ layout: "horizontal" }}
        rules={{
          required: "Telework Possible is required",
        }}
      >
        <Radio key="None" value="None" label="None" />
        <Radio
          key="Regular-recurring"
          value="Regular-recurring"
          label="Regular-recurring"
        />
        <Radio key="Situational" value="Situational" label="Situational" />
      </BACRadioGroup>
    </div>
  );
};
export default Telework;
