import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { GENERALGRADES, ACQGRADES } from "consts/Grades";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";

const Grade = ({ name, form }: FormField) => {
  const paySystem = form.watch("paySystem");
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
        Grade
      </Label>
      <Controller
        name="grade"
        control={form.control}
        rules={{
          validate: (value) => {
            return value?.length > 0 ? undefined : "Grade is required";
          },
        }}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.grade ? "true" : "false"}
            autoComplete="on"
            {...field}
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
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
          </Combobox>
        )}
      />
      {form.formState.errors.grade && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.grade.message}
        </Text>
      )}
    </div>
  );
};
export default Grade;
