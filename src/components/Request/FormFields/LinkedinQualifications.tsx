import { InfoLabel, Checkbox, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { ClipboardCheckmarkRegular } from "@fluentui/react-icons";

const options = [
  { id: "citizenship", text: "U.S. Citizenship" },
  { id: "clearance", text: "Obtain & maintain Security clearance" },
  { id: "drugtest", text: "This is designated Drug Testing Position" },
  { id: "certification", text: "Certifications/Licensure" },
  {
    id: "financial",
    text: "Financial management Statement - OGE-450 Financial Disclosure Report",
  },
  { id: "physical", text: "Must be able to pass pre-employment physical" },
  {
    id: "travel",
    text: "Travel - Select if trave is more than occasional. Reference SPRD.",
  },
];

const LinkedinQualifications = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <InfoLabel
        htmlFor={name + "Id"}
        weight="semibold"
        className="requestFieldLabel"
        required
        info="De-select what is not applicable for your position from the following
        list"
      >
        <ClipboardCheckmarkRegular className="requestFieldIcon" />
        Qualifications
      </InfoLabel>
      <Controller
        name="linkedinQualifications"
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
      {form.formState.errors.linkedinQualifications && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.linkedinQualifications.message}
        </Text>
      )}
    </div>
  );
};
export default LinkedinQualifications;
