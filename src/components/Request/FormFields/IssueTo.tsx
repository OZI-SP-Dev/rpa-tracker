import { Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";

const IssueTo = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
      >
        <ContactIcon className="requestFieldIcon" />
        Issue Certificate To
      </Label>
      <Controller
        name="issueTo"
        control={form.control}
        rules={{
          required: "Issue Certificate To is required",
        }}
        render={({ field }) => (
          <PeoplePicker
            ariaLabel="Issue Certificate To"
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.issueTo ? "true" : "false"}
            selectedItems={field.value ?? []}
            updatePeople={(items) => {
              if (items?.[0]?.Title) {
                field.onChange(items[0]);
              } else {
                field.onChange([]);
              }
            }}
          />
        )}
      />
      {form.formState.errors.issueTo && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.issueTo.message}
        </Text>
      )}
    </div>
  );
};

export default IssueTo;
