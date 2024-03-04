import { DatePicker, DatePickerProps } from "@fluentui/react-datepicker-compat";
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
  fieldProps?: Partial<DatePickerProps>;
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
        aria-invalid={fieldState.error ? "true" : "false"}
        placeholder="Select a date..."
        aria-label={
          field.value
            ? labelText +
              " has selected date of " +
              field.value.toLocaleDateString()
            : labelText + ", no date selected. Select a date."
        }
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
