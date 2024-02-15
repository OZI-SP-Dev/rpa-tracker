import { DCWFCodes } from "consts/DCWF";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDropdown from "components/BaseFormFields/BACDropdown";

const Certifications = () => {
  return (
    <div className="requestFieldContainer">
      <BACDropdown<RHFRequest>
        name="dcwf"
        labelText="Certifications/Licensure"
        labelInfo="Select one to three options"
        fieldProps={{
          multiselect: true,
        }}
        customOnOptionSelect={(_e, data, field) => {
          if (data.selectedOptions.length <= 3) {
            field.onChange(data.selectedOptions);
          }
        }}
        customValue={(value) => {
          let retVal = "";
          let arrayVal = [];
          if (Array.isArray(value)) {
            arrayVal = value.map(
              (value) =>
                value +
                  " " +
                  DCWFCodes.find(({ Code }) => Code === value)?.Role ?? ""
            );
            retVal = arrayVal.join(", ");
          }
          return retVal;
        }}
      >
        {DCWFCodes.map((item) => (
          <Option
            key={item.Code}
            text={item.Code + " " + item.Role}
            value={item.Code}
          >
            {item.Code}&nbsp;{item.Role}
          </Option>
        ))}
      </BACDropdown>
    </div>
  );
};
export default Certifications;
