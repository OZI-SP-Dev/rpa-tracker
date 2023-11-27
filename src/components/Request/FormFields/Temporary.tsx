import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";

const Temporary = ({ name, form }: FormField) => {
  const options = ["Full-Time", "Temp", "Term"];
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        Type of Appointment
      </Label>
      <Controller
        name="temporary"
        control={form.control}
        rules={{
          required: "Duration is required",
        }}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.temporary ? "true" : "false"}
            autoComplete="on"
            {...field}
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
            }}
          >
            {options.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {form.formState.errors.temporary && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.temporary.message}
        </Text>
      )}
    </div>
  );
};

export default Temporary;
