import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { useOSFs } from "api/osfApi";

const OSFField = () => {
  const OSFS = useOSFs();
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="osf"
        labelText="OSF"
        rules={{
          required: "OSF is required",
        }}
      >
        {OSFS.data?.map((osf) => (
          <Option key={osf.Title} value={osf.Title}>
            {osf.Title}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};

export default OSFField;
