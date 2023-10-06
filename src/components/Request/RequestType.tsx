import { Combobox, Label, Option, Text } from "@fluentui/react-components";
import { DropdownIcon } from "@fluentui/react-icons-mdl2";
import { REQUESTTYPES } from "consts/RequestTypes";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import "./Request.css";
import { RHFRequest } from "./NewRequestForm";

interface IRequestType {
  name: string;
  control: Control<RHFRequest, unknown>;
  errors: FieldErrors<RHFRequest>;
  setValue: UseFormSetValue<RHFRequest>;
}

const RequestType = (rt: IRequestType) => {
  return (
    <div className="requestFieldContainer">
      <Label
        id="requestTypeId"
        size="small"
        weight="semibold"
        className="requestFieldLabel"
        required
      >
        <DropdownIcon className="requestFieldIcon" />
        Request Type
      </Label>
      <Controller
        name="requestType"
        control={rt.control}
        render={({ field }) => (
          <Combobox
            aria-describedby="requestTypeErr"
            aria-labelledby="requestTypeId"
            autoComplete="on"
            {...field}
            selectedOptions={[field.value ?? ""]}
            onOptionSelect={(_event, data) => {
              rt.setValue("requestType", data.optionValue ?? "", {
                shouldValidate: true,
              });
            }}
          >
            {REQUESTTYPES.map((reqType) => (
              <Option key={reqType} value={reqType}>
                {reqType}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {rt.errors.requestType && (
        <Text id="requestType" className="requestErrorText">
          {rt.errors.requestType.message}
        </Text>
      )}
    </div>
  );
};
export default RequestType;
