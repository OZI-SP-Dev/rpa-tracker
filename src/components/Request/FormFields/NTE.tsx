import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDatePicker from "components/BaseFormFields/BACDatePicker";

const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};

const NTEField = () => {
  return (
    <div className="requestFieldContainer">
      <BACDatePicker<RHFRequest>
        name="nte"
        labelText="Not to exceed date"
        fieldProps={{ formatDate: onFormatDate }}
      />
    </div>
  );
};
export default NTEField;
