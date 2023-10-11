import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { PAYSYSTEMS } from "consts/PaySystems";

const PaySystem = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        Pay System
      </Label>
      <Controller
        name="paySystem"
        control={form.control}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.paySystem ? "true" : "false"}
            autoComplete="on"
            {...field}
            value={
              PAYSYSTEMS.find(({ key }) => key === field.value)?.text ?? ""
            }
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
              // Only reset grade if changing to or from the NH pay system
              if (data.optionValue === "NH" || field.value === "NH") {
                form.setValue("grade", "", {
                  shouldValidate: true,
                });
              }
            }}
          >
            {PAYSYSTEMS.map((paysys) => (
              <Option key={paysys.key} value={paysys.key}>
                {paysys.text}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {form.formState.errors.paySystem && (
        <Text role="alert" id={name + "Id"} className="requestErrorText">
          {form.formState.errors.paySystem.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
