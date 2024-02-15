import {
  Text,
  Dropdown,
  InfoLabel,
  DropdownProps,
} from "@fluentui/react-components";
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

const BACDropdown = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  children,
  fieldProps,
  customOnOptionSelect,
  customValue,
}: BaseFormField<T> & {
  fieldProps?: Partial<DropdownProps>;
  customOnOptionSelect?: onOptionSelectCallback<T>;
  customValue?: valueCallback<T>;
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
        <DropdownIcon className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <Dropdown
        {...field}
        id={name + "Id"}
        aria-describedby={name + "Err"}
        aria-invalid={fieldState.error ? "true" : "false"}
        selectedOptions={field.value}
        onOptionSelect={
          customOnOptionSelect
            ? (event, data) => customOnOptionSelect(event, data, field)
            : (_e, data) => {
                field.onChange(data.selectedOptions);
              }
        }
        value={customValue ? customValue(field.value) : field.value}
        {...fieldProps}
      >
        {children ?? <></>}
      </Dropdown>
      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACDropdown;
