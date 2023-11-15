import { Label, Checkbox, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { ClipboardCheckmarkRegular } from "@fluentui/react-icons";

const options = [
  { id: "lcmc", text: "LCMC Job Announcement Board" },
  { id: "joa", text: "Job Opportunity Announcement (JOA)" },
  { id: "linkedinPost", text: "LinkedIn Job Posting" },
  { id: "linkedinSearch", text: "LinkedIn Profile Search" },
  { id: "resumeSearch", text: "COS Resume Repository Search" },
];

const Methods = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <ClipboardCheckmarkRegular className="requestFieldIcon" />
        Announcement Method(s)
      </Label>
      <Controller
        name="methods"
        control={form.control}
        rules={{
          required: "At least one Announcement Method is required",
        }}
        render={({ field }) => (
          <>
            {options.map((option) => {
              return (
                <Checkbox
                  id={option.id + "Id"}
                  key={option.id}
                  label={option.text}
                  checked={field.value?.some((item) => item === option.id)}
                  aria-describedby={name + "Err"}
                  onChange={(e) => {
                    let values = [...field.value];
                    if (e.target.checked) {
                      values.push(option.id);
                    } else {
                      values = values.filter((v) => v !== option.id);
                    }
                    field.onChange(values);
                  }}
                />
              );
            })}
          </>
        )}
      />
      {form.formState.errors.methods && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.methods.message}
        </Text>
      )}
    </div>
  );
};
export default Methods;
