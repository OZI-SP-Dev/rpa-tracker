import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";

const Series = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="series"
        labelText="Series number"
        rules={{
          required: "Series is required",
          minLength: {
            value: 4,
            message: "Series is a 4 digit identifier",
          },
          maxLength: {
            value: 4,
            message: "Series is a 4 digit identifier",
          },
          pattern: {
            value: /^\d+$/,
            message: "Series can only consist of numbers",
          },
        }}
        fieldProps={{ placeholder: "Example: 2210" }}
      />
    </div>
  );
};
export default Series;
