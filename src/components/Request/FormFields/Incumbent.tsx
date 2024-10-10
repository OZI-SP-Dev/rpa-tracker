import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

const Incumbent = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="lastIncumbent"
        labelText="Name of last incumbent (if applicable)"
        labelIcon={<ContactIcon className="fieldIcon" />}
        fieldProps={{ placeholder: "Example format: 'Last, First MI'" }}
      />
    </div>
  );
};
export default Incumbent;
