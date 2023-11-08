import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { OSFS } from "consts/OSFs";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";

const OSF = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        OSF
      </Label>
      <Controller
        name="osf"
        control={form.control}
        rules={{
          required: "OSF is required",
        }}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.osf ? "true" : "false"}
            autoComplete="on"
            {...field}
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
            }}
          >
            {OSFS.map((osf) => (
              <Option key={osf} value={osf}>
                {osf}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {form.formState.errors.osf && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.osf.message}
        </Text>
      )}
    </div>
  );
};

export default OSF;
