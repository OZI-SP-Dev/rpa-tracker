import {
  InfoLabel,
  Text,
  Textarea,
  TextareaProps,
} from "@fluentui/react-components";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { BaseFormField } from "components/BaseFormFields/BaseTypeDef";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const BACTextarea = <T extends FieldValues>({
  name,
  labelText,
  labelInfo,
  rules,
  fieldProps,
}: BaseFormField<T> & {
  fieldProps?: Partial<TextareaProps>;
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
        <TextFieldIcon className="fieldIcon" />
        {labelText}
      </InfoLabel>
      <Textarea
        {...field}
        {...fieldProps}
        aria-describedby={name + "Err"}
        aria-invalid={fieldState.error ? "true" : "false"}
        id={name + "Id"}
      />

      {fieldState.error && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {fieldState.error?.message}
        </Text>
      )}
    </>
  );
};
export default BACTextarea;
