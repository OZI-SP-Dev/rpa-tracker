import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { useFormContext } from "react-hook-form";

const Grade = () => {
  const form = useFormContext();
  const paySystem = form.watch("paySystem");
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="grade"
        labelText="Grade"
        rules={{
          required: "Grade is required",
        }}
      >
        {paySystem === "NH"
          ? ACQGRADES.map((reqType) => (
              <Option key={reqType} value={reqType}>
                {reqType}
              </Option>
            ))
          : GENERALGRADES.map((reqType) => (
              <Option key={reqType} value={reqType}>
                {reqType}
              </Option>
            ))}
      </BACCombobox>
    </div>
  );
};
export default Grade;
