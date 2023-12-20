import { REQUESTTYPES } from "consts/RequestTypes";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";

const RequestType = () => {
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="requestType"
        labelText="Request Type"
        rules={{
          required: "Request Type is required",
        }}
      >
        {REQUESTTYPES.map((reqType) => (
          <Option key={reqType} value={reqType}>
            {reqType}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};
export default RequestType;
