import { Label, Checkbox, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";
import { ClipboardCheckmarkRegular } from "@fluentui/react-icons";

const Methods = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        htmlFor={name + "Id"}
        size="small"
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
            <Checkbox
              id="lcmcId"
              label="LCMC Job Announcement Board"
              checked={field.value?.some((item) => item === "lcmc")}
              aria-describedby={name + "Err"}
              onChange={(e) => {
                let values = [...field.value];
                if (e.target.checked) {
                  values.push("lcmc");
                } else {
                  values = values.filter((v) => v !== "lcmc");
                }
                field.onChange(values);
              }}
            />
            <Checkbox
              id="joaId"
              label="Job Opportunity Announcement (JOA)"
              checked={field.value?.some((item) => item === "joa")}
              aria-describedby={name + "Err"}
              onChange={(e) => {
                let values = [...field.value];
                if (e.target.checked) {
                  values.push("joa");
                } else {
                  values = values.filter((v) => v !== "joa");
                }
                field.onChange(values);
              }}
            />
            <Checkbox
              id="linkedinPostId"
              label="LinkedIn Job Posting"
              checked={field.value?.some((item) => item === "linkedinPost")}
              aria-describedby={name + "Err"}
              onChange={(e) => {
                let values = [...field.value];
                if (e.target.checked) {
                  values.push("linkedinPost");
                } else {
                  values = values.filter((v) => v !== "linkedinPost");
                }
                field.onChange(values);
              }}
            />
            <Checkbox
              id="linkedinSearchId"
              label="LinkedIn Profile Search"
              checked={field.value?.some((item) => item === "linkedinSearch")}
              aria-describedby={name + "Err"}
              onChange={(e) => {
                let values = [...field.value];
                if (e.target.checked) {
                  values.push("linkedinSearch");
                } else {
                  values = values.filter((v) => v !== "linkedinSearch");
                }
                field.onChange(values);
              }}
            />
            <Checkbox
              id="resumeSearchId"
              label="Resume Search"
              checked={field.value?.some((item) => item === "resumeSearch")}
              aria-describedby={name + "Err"}
              onChange={(e) => {
                let values = [...field.value];
                if (e.target.checked) {
                  values.push("resumeSearch");
                } else {
                  values = values.filter((v) => v !== "resumeSearch");
                }
                field.onChange(values);
              }}
            />
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
