import { Label, Text } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { Controller, useFormContext } from "react-hook-form";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";

const Supervisor = () => {
  const form = useFormContext<RHFRequest>();
  const name = "supervisor";

  return (
    <div className="requestFieldContainer">
      <Label id={name + "Id"} weight="semibold" className="fieldLabel" required>
        <ContactIcon className="fieldIcon" />
        Supervisor
      </Label>
      <Controller
        name="supervisor"
        control={form.control}
        rules={{
          required: "Supervisor is required",
        }}
        render={({ field }) => (
          <PeoplePicker
            ariaLabel="Supervisor"
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
      {form.formState.errors.supervisor && (
        <Text role="alert" id={name + "Err"} className="fieldErrorText">
          {form.formState.errors.supervisor.message}
        </Text>
      )}
    </div>
  );
};

export default Supervisor;
