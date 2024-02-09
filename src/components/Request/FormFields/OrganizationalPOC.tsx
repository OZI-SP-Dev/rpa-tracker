import { Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller, useFormContext } from "react-hook-form";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";

const OrganizationalPOC = () => {
  const form = useFormContext<RHFRequest>();
  const name = "organizationalPOC";

  return (
    <div className="requestFieldContainer">
      <Label id={name + "Id"} weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        Organizational POC
      </Label>
      <Controller
        name="organizationalPOC"
        control={form.control}
        render={({ field }) => (
          <PeoplePicker
            ariaLabel="Organizational POC"
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={
              form.formState.errors.organizationalPOC ? "true" : "false"
            }
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
      {form.formState.errors.organizationalPOC && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {form.formState.errors.organizationalPOC.message}
        </Text>
      )}
    </div>
  );
};
export default OrganizationalPOC;
