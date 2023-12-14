import { DatePicker, IDatePickerProps } from "@fluentui/react";
import { InfoLabel, Text } from "@fluentui/react-components";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { CalendarIcon } from "@fluentui/react-icons-mdl2";

const BACDatePicker = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  fieldProps,
}: BaseFormField<T> & {
  fieldProps?: Partial<IDatePickerProps>;
}) => {
  const form = useFormContext<T>();

  const { field, fieldState } = useController<T>({
    name,
    control: form.control,
    rules,
  });

  /* Is it a required field, if so, then mark the label as required */
  const isRequired: boolean = rules?.required ? true : false;

  return (
    <>
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="fieldLabel"
        required={isRequired}
        info={labelInfo}
      >
        <CalendarIcon className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <DatePicker
        {...fieldProps}
        aria-describedby={name + "Err"}
        aria-labelledby={name + "Id"}
        aria-invalid={fieldState.error ? "true" : "false"}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        onSelectDate={field.onChange}
        {...field}
      />

      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACDatePicker;
