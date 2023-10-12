import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { POSITIONSENSITIVIES } from "consts/PositionSensitivities";

const PositionSensitivity = ({ name, form }: FormField) => {
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
        Position Sensitivity
      </Label>
      <Controller
        name="positionSensitivity"
        control={form.control}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={
              form.formState.errors.positionSensitivity ? "true" : "false"
            }
            autoComplete="on"
            {...field}
            value={
              POSITIONSENSITIVIES.find(({ key }) => key === field.value)
                ?.text ?? ""
            }
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
            }}
          >
            {POSITIONSENSITIVIES.map((sensitivity) => (
              <Option key={sensitivity.key} value={sensitivity.key}>
                {sensitivity.text}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {form.formState.errors.positionSensitivity && (
        <Text role="alert" id={name + "Id"} className="requestErrorText">
          {form.formState.errors.positionSensitivity.message}
        </Text>
      )}
    </div>
  );
};
export default PositionSensitivity;
