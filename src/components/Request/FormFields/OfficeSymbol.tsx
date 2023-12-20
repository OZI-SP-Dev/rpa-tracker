import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";

const OfficeSymbol = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="officeSymbol"
        labelText="Office Symbol"
        rules={{
          required: "Office Symbol is required",
        }}
        fieldProps={{ placeholder: "Example format: 'AFLCMC/OZIP'" }}
      />
    </div>
  );
};
export default OfficeSymbol;
