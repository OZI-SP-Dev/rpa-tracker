import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import "../Request.css";
import { RHFRequest } from "../NewRequestForm";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { PAYSYSTEMS } from "consts/PaySystems";

interface IPaySystem {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const PaySystem = (paySystem: IPaySystem) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={paySystem.name + "Id"}
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
        control={paySystem.control}
        render={({ field }) => (
          <Combobox
            aria-describedby={paySystem.name + "Err"}
            aria-labelledby={paySystem.name + "Id"}
            aria-invalid={paySystem.errors.paySystem ? "true" : "false"}
            autoComplete="on"
            {...field}
            value={
              PAYSYSTEMS.find(({ key }) => key === field.value)?.text ?? ""
            }
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              paySystem.setValue("paySystem", data.optionValue ?? "", {
                shouldValidate: true,
              });
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
      {paySystem.errors.paySystem && (
        <Text
          role="alert"
          id={paySystem.name + "Id"}
          className="requestErrorText"
        >
          {paySystem.errors.paySystem.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
