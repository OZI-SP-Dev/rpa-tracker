import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";

const PositionSensitivity = () => {
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="positionSensitivity"
        labelText="Position Sensitivity"
        rules={{
          required: "Position Sensitivity is required",
        }}
        customValue={(value) => {
          return (
            POSITIONSENSITIVIES.find(({ key }) => key === value)?.text ?? ""
          );
        }}
      >
        {POSITIONSENSITIVIES.map((sensitivity) => (
          <Option key={sensitivity.key} value={sensitivity.key}>
            {sensitivity.text}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};
export default PositionSensitivity;
