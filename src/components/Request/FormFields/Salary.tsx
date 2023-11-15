import { Input, Label, Text } from "@fluentui/react-components";
import { Controller } from "react-hook-form";
import { FormField } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";

const Salary = ({ name, form }: FormField) => {
  return (
    <div className="requestFieldContainer">
      <p>
        <Label
          htmlFor={name + "Id"}
          weight="semibold"
          className="requestFieldLabel"
          required
        >
          <NumberFieldIcon className="requestFieldIcon" />
          Salary Range
        </Label>
        <Controller
          name="salaryLow"
          control={form.control}
          rules={{
            required: "Salary range is required",
            max: {
              value: 999999,
              message: "Salary cannot exceed 6 digits",
            },
            min: {
              value: 10000,
              message: "Salary must be at least 5 digits",
            },
            validate: (value) => {
              return value >= Number(form.getValues("salaryHigh"))
                ? "Salary range must be low to high"
                : undefined;
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              contentBefore={<Text>$</Text>}
              value={field.value.toString()}
              type="number"
              aria-describedby={name + "Err"}
              aria-invalid={form.formState.errors.salaryLow ? "true" : "false"}
              id={name + "Id"}
              style={{ marginInline: "0em 1em" }}
              onChange={(ev, data) => {
                field.onChange(ev, data);
                form.trigger("salaryHigh");
              }}
            />
          )}
        />
        to
        <Controller
          name="salaryHigh"
          control={form.control}
          rules={{
            required: "Salary range is required",
            max: {
              value: 999999,
              message: "Salary cannot exceed 6 digits",
            },
            min: {
              value: 10000,
              message: "Salary must be at least 5 digits",
            },
            validate: (value) => {
              return value <= Number(form.getValues("salaryLow"))
                ? "Salary range must be low to high"
                : undefined;
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              contentBefore={<Text>$</Text>}
              value={field.value.toString()}
              type="number"
              aria-describedby={name + "Err"}
              aria-invalid={form.formState.errors.salaryHigh ? "true" : "false"}
              id={name + "Id"}
              style={{ marginInline: "1em 0em" }}
              onChange={(ev, data) => {
                field.onChange(ev, data);
                form.trigger("salaryLow");
              }}
            />
          )}
        />
        <br />
        <Text>
          Select and include the appropriate locality within the{" "}
          <a href="./Interactive_AcqDemo_Salary_Ranges.pdf" target="_blank">
            salary ranges document
          </a>
        </Text>
        {(form.formState.errors.salaryLow && (
          <>
            <br />
            <Text role="alert" id={name + "Err"} className="requestErrorText">
              {form.formState.errors.salaryLow.message}
            </Text>
          </>
        )) ||
          (form.formState.errors.salaryHigh && (
            <>
              <br />
              <Text role="alert" id={name + "Err"} className="requestErrorText">
                {form.formState.errors.salaryHigh.message}
              </Text>
            </>
          ))}
      </p>
    </div>
  );
};
export default Salary;
