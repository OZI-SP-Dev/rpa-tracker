import { Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";

const OrgApprover = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label id={name + "Id"} weight="semibold" className="requestFieldLabel">
        <ContactIcon className="requestFieldIcon" />
        Org Approver
      </Label>
      <Controller
        name="orgApprover"
        control={form.control}
        render={({ field }) => (
          <PeoplePicker
            ariaLabel="Org Approver"
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.osf ? "true" : "false"}
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
      <Text>
        For orgs that have additional internal approvals such as CROWS and WAC
      </Text>
      {form.formState.errors.orgApprover && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.orgApprover.message}
        </Text>
      )}
    </div>
  );
};

export default OrgApprover;
