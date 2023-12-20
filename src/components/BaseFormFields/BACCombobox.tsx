import { Combobox, InfoLabel, Text } from "@fluentui/react-components";
import { SelectionEvents, OptionOnSelectData } from "@fluentui/react-combobox";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";

export type onOptionSelectCallback<T extends FieldValues> = (
  event: SelectionEvents,
  data: OptionOnSelectData,
  field: ControllerRenderProps<T, Path<T>>
) => void;

export type valueCallback<T extends FieldValues> = (
  value: PathValue<T, Path<T>>
) => string | (readonly string[] & string) | undefined;

const BACCombobox = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  children,
  customOnOptionSelect,
  customValue,
}: BaseFormField<T> & {
  customOnOptionSelect?: onOptionSelectCallback<T>;
  customValue?: valueCallback<T>;
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
        <DropdownIcon className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <Combobox
        aria-describedby={name + "Err"}
        id={name + "Id"}
        aria-invalid={fieldState.error ? "true" : "false"}
        autoComplete="on"
        {...field}
        selectedOptions={[field.value ?? ""]}
        onOptionSelect={
          customOnOptionSelect
            ? (event, data) => customOnOptionSelect(event, data, field)
            : (_event, data) => {
                field.onChange(data.optionValue ?? "");
              }
        }
        value={customValue ? customValue(field.value) : field.value}
      >
        {children ?? <></>}
      </Combobox>
      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACCombobox;
