import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";

const MPCN = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="mpcn"
        labelText="MPCN"
        labelIcon={<NumberFieldIcon className="fieldIcon" />}
        rules={{
          required: "MPCN is required",
          minLength: {
            value: 7,
            message: "MPCN cannot be less than 7 digits",
          },
          maxLength: {
            value: 10,
            message: "MPCN cannot be more than 10 digits",
          },
          pattern: {
            value: /^\d+$/,
            message: "MPCN can only consist of numbers",
          },
        }}
      />
    </div>
  );
};
export default MPCN;
