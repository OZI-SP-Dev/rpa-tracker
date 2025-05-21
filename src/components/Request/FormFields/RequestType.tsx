import { REQUESTTYPES } from "consts/RequestTypes";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { useWatch } from "react-hook-form";
import BACInput from "components/BaseFormFields/BACInput";

const RequestType = () => {
  const reqType = useWatch({ name: "requestType" });
  return (
    <>
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
      {reqType === "Other" && (
        <div className="requestFieldContainer">
          <BACInput<RHFRequest>
            name="requestTypeOther"
            labelText="Other Request Type, please specify."
            fieldProps={{
              placeholder:
                "Enter the Request Type that was not available in the dropdown",
            }}
            rules={{
              required: "Required when selecting 'Other' as Request Type",
            }}
          />
        </div>
      )}
    </>
  );
};
export default RequestType;
