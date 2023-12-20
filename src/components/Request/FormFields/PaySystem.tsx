import { PAYSYSTEMS } from "consts/PaySystems";
import { Option } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { useFormContext } from "react-hook-form";

const PaySystem = () => {
  const form = useFormContext<RHFRequest>();
  return (
    <div className="requestFieldContainer">
      <BACCombobox<RHFRequest>
        name="paySystem"
        labelText="Pay System"
        rules={{
          required: "Pay System is required",
        }}
        customOnOptionSelect={(_e, data, field) => {
          field.onChange(data.optionValue ?? "");
          // Only reset grade if changing to or from the NH pay system
          if (data.optionValue === "NH" && field.value === "NH") {
            return;
          }
          if (
            data.optionValue === "NH" ||
            field.value === "NH" ||
            data.optionValue === ""
          ) {
            form.setValue("grade", "", {
              shouldValidate: true,
            });
          }
        }}
        customValue={(value) => {
          return PAYSYSTEMS.find(({ key }) => key === value)?.text ?? "";
        }}
      >
        {PAYSYSTEMS.map((paysys) => (
          <Option key={paysys.key} value={paysys.key}>
            {paysys.text}
          </Option>
        ))}
      </BACCombobox>
    </div>
  );
};

export default PaySystem;
