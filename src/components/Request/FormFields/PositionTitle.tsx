import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { TextFieldIcon } from "@fluentui/react-icons-mdl2";

const PositionTitle = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
      >
        <TextFieldIcon className="requestFieldIcon" />
        Position Title
      </Label>
      <Controller
        name="positionTitle"
        control={form.control}
        rules={{
          maxLength: {
            value: 255,
            message: "Position Title can be no longer than 255 characters",
          },
          required: "Position Title is required",
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.positionTitle ? "true" : "false"
            }
            id={name + "Id"}
          />
        )}
      />
      {form.formState.errors.positionTitle && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.positionTitle.message}
        </Text>
      )}
    </div>
  );
};
export default PositionTitle;
