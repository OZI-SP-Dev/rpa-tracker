import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";

const Temporary = () => {
  const options = ["Full-Time", "Temp", "Term"];

  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest> name="temporary" labelText="Type of Appointment">
        {options.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};

export default Temporary;
