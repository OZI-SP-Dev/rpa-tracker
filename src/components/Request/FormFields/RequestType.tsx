import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { REQUESTTYPES } from "consts/RequestTypes";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";

const RequestType = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        Request Type
      </Label>
      <Controller
        name="requestType"
        control={form.control}
        rules={{
          required: "Request Type is required",
        }}
        render={({ field }) => (
          <Combobox
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.requestType ? "true" : "false"}
            autoComplete="on"
            {...field}
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              field.onChange(data.optionValue ?? "");
            }}
          >
            {REQUESTTYPES.map((reqType) => (
              <Option key={reqType} value={reqType}>
                {reqType}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {form.formState.errors.requestType && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.requestType.message}
        </Text>
      )}
    </div>
  );
};
export default RequestType;
