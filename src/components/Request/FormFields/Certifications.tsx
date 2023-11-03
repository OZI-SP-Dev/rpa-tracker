import { Dropdown, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { DCWFCodes } from "consts/DCWF";
import { Controller } from "react-hook-form";
import "components/Request/Request.css";
import { FormField } from "components/Request/NewRequestForm";

const Certifications = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id={name + "Id"}
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        Certifications/Licensure
      </Label>
      <Controller
        name="dcwf"
        control={form.control}
        rules={{
          required: "Certifications/Licensure is required",
        }}
        render={({ field }) => (
          <Dropdown
            aria-describedby={name + "Err"}
            aria-labelledby={name + "Id"}
            aria-invalid={form.formState.errors.dcwf ? "true" : "false"}
            multiselect={true}
            aria-required
            //{...field}
            selectedOptions={field.value}
            onOptionSelect={(_e, data) => {
              if (data.selectedOptions.length <= 3) {
                field.onChange(data.selectedOptions);
              }
            }}
          >
            {DCWFCodes.map((item) => (
              <Option
                key={item.Code}
                text={item.Code + " " + item.Role}
                value={item.Code}
              >
                {item.Code}&nbsp;{item.Role}
              </Option>
            ))}
          </Dropdown>
        )}
      />
      <Text>Select one to three options</Text>
      {form.formState.errors.grade && (
        <Text role="alert" id={name + "Err"} className="requestErrorText">
          {form.formState.errors.grade.message}
        </Text>
      )}
    </div>
  );
};
export default Certifications;
