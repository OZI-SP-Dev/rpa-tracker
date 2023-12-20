import { OSFS } from "consts/OSFs";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";

const OSF = () => {
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="osf"
        labelText="OSF"
        rules={{
          required: "OSF is required",
        }}
      >
        {OSFS.map((osf) => (
          <Option key={osf} value={osf}>
            {osf}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};

export default OSF;
