import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { ContactIcon } from "@fluentui/react-icons-mdl2";

const PaySystem = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
      >
        <ContactIcon className="requestFieldIcon" />
        Name of last incubment (if applicable)
      </Label>
      <Controller
        name="lastIncumbent"
        control={form.control}
        rules={{
          maxLength: {
            value: 255,
            message: "Last Incumbent can be no longer than 255 characters",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-describedby={name + "Err"}
            aria-invalid={
              form.formState.errors.lastIncumbent ? "true" : "false"
            }
            id={name + "Id"}
            placeholder="Example format: 'Last, First MI'"
          />
        )}
      />
      {form.formState.errors.lastIncumbent && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.lastIncumbent.message}
        </Text>
      )}
    </div>
  );
};
export default PaySystem;
