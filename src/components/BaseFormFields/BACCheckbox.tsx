import { Checkbox, InfoLabel, Text } from "@fluentui/react-components";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { ClipboardCheckmarkRegular } from "@fluentui/react-icons";

const BACCheckbox = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  options,
}: BaseFormField<T> & {
  /* 1 or more checkbox entires */
  options: {
    id: string;
    text: string;
  }[];
}) => {
  const form = useFormContext<T>();
  /* Is it a required field, if so, then mark the label as required */
  const isRequired: boolean = rules?.required ? true : false;

  const { field, fieldState } = useController<T>({
    name,
    control: form.control,
    rules,
  });

  return (
    <>
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="fieldLabel"
        required={isRequired}
        info={labelInfo}
      >
        <ClipboardCheckmarkRegular className="fieldIcon" />
        {labelText}
      </InfoLabel>
      {options.map((option) => {
        return (
          <Checkbox
            {...field}
            id={option.id + "Id"}
            key={option.id}
            label={option.text}
            checked={field.value?.some((item: string) => item === option.id)}
            aria-describedby={name + "Err"}
            aria-invalid={fieldState.error ? "true" : "false"}
            onChange={(e) => {
              let values = [...field.value];
              if (e.target.checked) {
                values.push(option.id);
              } else {
                values = values.filter((v) => v !== option.id);
              }
              field.onChange(values);
            }}
          />
        );
      })}
      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACCheckbox;
