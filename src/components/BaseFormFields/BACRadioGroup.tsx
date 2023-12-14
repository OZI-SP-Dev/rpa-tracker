import {
  RadioGroup,
  InfoLabel,
  Text,
  RadioGroupProps,
} from "@fluentui/react-components";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { RadioButtonFilled } from "@fluentui/react-icons";

const BACRadioGroup = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  fieldProps,
  children,
}: BaseFormField<T> & { fieldProps?: Partial<RadioGroupProps> }) => {
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
        <RadioButtonFilled className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <RadioGroup
        id={name + "Id"}
        aria-describedby={name + "Err"}
        aria-invalid={fieldState.error ? "true" : "false"}
        {...field}
        {...fieldProps}
      >
        {children ?? <></>}
      </RadioGroup>
      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};

export default BACRadioGroup;
