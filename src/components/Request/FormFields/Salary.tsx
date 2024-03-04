import { Input, Label, Text } from "@fluentui/react-components";
import { Controller, useFormContext } from "react-hook-form";
import "components/Request/Request.css";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";
import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import { RPARequest } from "api/requestsApi";

const Salary = () => {
  const form = useFormContext<RHFRequest | RPARequest>();
  const name = "salary";

  return (
    <div className="requestFieldContainer">
      <p>
        <Label htmlFor={name + "Id"} weight="semibold" className="fieldLabel">
          <NumberFieldIcon className="fieldIcon" />
          Salary Range
        </Label>
        <Controller
          name="salaryLow"
          control={form.control}
          rules={{
            max: {
              value: 999999,
              message: "Salary cannot exceed 6 digits",
            },
            min: {
              value: 10000,
              message: "Salary must be at least 5 digits",
            },
            validate: (value) => {
              return value !== undefined &&
                value >= Number(form.getValues("salaryHigh"))
                ? "Salary range must be low to high"
                : undefined;
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              contentBefore={<Text>$</Text>}
              value={field.value?.toString()}
              type="number"
              aria-label="Min Salary"
              aria-describedby={name + "Err"}
              aria-invalid={form.formState.errors.salaryLow ? "true" : "false"}
              id={name + "LowId"}
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
            max: {
              value: 999999,
              message: "Salary cannot exceed 6 digits",
            },
            min: {
              value: 10000,
              message: "Salary must be at least 5 digits",
            },
            validate: (value) => {
              return value !== undefined &&
                value <= Number(form.getValues("salaryLow"))
                ? "Salary range must be low to high"
                : undefined;
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              contentBefore={<Text>$</Text>}
              value={field.value?.toString()}
              type="number"
              aria-label="Max Salary"
              aria-describedby={name + "Err"}
              aria-invalid={form.formState.errors.salaryHigh ? "true" : "false"}
              id={name + "HighId"}
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
            <Text role="alert" id={name + "Err"} className="fieldErrorText">
              {form.formState.errors.salaryLow.message}
            </Text>
          </>
        )) ||
          (form.formState.errors.salaryHigh && (
            <>
              <br />
              <Text role="alert" id={name + "Err"} className="fieldErrorText">
                {form.formState.errors.salaryHigh.message}
              </Text>
            </>
          ))}
      </p>
    </div>
  );
};
export default Salary;
