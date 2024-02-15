import { Input, InputProps, InfoLabel, Text } from "@fluentui/react-components";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const BACInput = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  labelIcon,
  rules,
  fieldProps,
  disableError,
}: BaseFormField<T> & {
  fieldProps?: Partial<InputProps>;
  /** Don't show the error message within the component -- If using this, you should be displaying the error message elsewhere.  It still sets the aria-invalid flag and sets RHF as error */
  disableError?: boolean;
}) => {
  const form = useFormContext<T>();
  let finalRules = { ...rules };
  /* If we aren't limiting the Single Line of Text explicitly, then add in one since SharePoint will not allow more than 255 */
  if (!finalRules?.maxLength) {
    finalRules = {
      ...finalRules,
      maxLength: {
        value: 255,
        message: `${labelText} can be no longer than 255 characters`,
      },
    };
  }

  const { field, fieldState } = useController<T>({
    name,
    control: form.control,
    rules: finalRules,
  });

  /* Is it a required field, if so, then mark the label as required */
  const isRequired: boolean = finalRules?.required ? true : false;

  return (
    <>
      {labelText && (
        <InfoLabel
          htmlFor={name + "Id"}
          weight="semibold"
          className="fieldLabel"
          required={isRequired}
          info={labelInfo}
        >
          {labelIcon ?? <TextFieldIcon className="fieldIcon" />}
          {labelText}
        </InfoLabel>
      )}
      <Input
        {...field}
        {...fieldProps}
        aria-describedby={name + "Err"}
        aria-invalid={fieldState.error ? "true" : "false"}
        id={name + "Id"}
      />
      {!disableError && fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACInput;
