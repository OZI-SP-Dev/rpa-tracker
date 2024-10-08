import { DCWFCodes } from "consts/DCWF";
import { Option, Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACDropdown, {
  onOptionSelectCallback,
  valueCallback,
} from "components/BaseFormFields/BACDropdown";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { useFormContext } from "react-hook-form";

const customOnOptionSelect: onOptionSelectCallback<RHFRequest> = (
  _e,
  data,
  field
) => field.onChange(data.selectedOptions);

const customValue: valueCallback<RHFRequest> = (value) => {
  let retVal = "";
  let arrayVal = [];
  if (Array.isArray(value)) {
    arrayVal = value.map(
      (value) =>
        value + " " + DCWFCodes.find(({ Code }) => Code === value)?.Role ?? ""
    );
    retVal = arrayVal.join(", ");
  }
  return retVal;
};

const dcwfCodeOptions = () =>
  DCWFCodes.map((item) => (
    <Option
      key={item.Code}
      text={item.Code + " " + item.Role}
      value={item.Code}
    >
      {item.Code}&nbsp;{item.Role}
    </Option>
  ));

const Certifications = () => {
  const { watch, setValue } = useFormContext();
  const dcwf2 = watch("dcwf2");
  const dcwf3 = watch("dcwf3");

  if (dcwf2?.length !== 1) {
    setValue("dcwf2Level", "");
  }

  if (dcwf3?.length !== 1) {
    setValue("dcwf3Level", "");
  }

  return (
    <fieldset>
      <legend>Defense Cyber Work Force (DCWF)</legend>
      <div className="requestFieldContainer">
        <BACDropdown<RHFRequest>
          name="dcwf"
          labelText="DCWF Role 1"
          customOnOptionSelect={customOnOptionSelect}
          customValue={customValue}
          fieldProps={{ clearable: true }}
          rules={{
            required: "DCWF Role 1 is required",
          }}
        >
          {dcwfCodeOptions()}
        </BACDropdown>
      </div>

      <div className="requestFieldContainer">
        <BACRadioGroup<RHFRequest>
          name="dcwfLevel"
          labelText="DCWF Role 1 Proficiency"
          fieldProps={{ layout: "horizontal" }}
          rules={{
            required: "DCWF Role 1 Proficiency is required",
          }}
        >
          <Radio key="Basic" value="Basic" label="Basic" />
          <Radio key="Intermediate" value="Intermediate" label="Intermediate" />
          <Radio key="Advanced" value="Advanced" label="Advanced" />
        </BACRadioGroup>
      </div>

      <div className="requestFieldContainer">
        <BACDropdown<RHFRequest>
          name="dcwf2"
          labelText="DCWF Role 2"
          customOnOptionSelect={customOnOptionSelect}
          customValue={customValue}
          fieldProps={{ clearable: true }}
        >
          {dcwfCodeOptions()}
        </BACDropdown>
      </div>

      <div className="requestFieldContainer">
        <BACRadioGroup<RHFRequest>
          name="dcwf2Level"
          labelText="DCWF Role 2 Proficiency"
          fieldProps={{ layout: "horizontal" }}
          rules={{
            required:
              dcwf2?.length === 1 ? "DCWF Role 2 Proficiency is required" : "",
          }}
        >
          <Radio key="Basic" value="Basic" label="Basic" />
          <Radio key="Intermediate" value="Intermediate" label="Intermediate" />
          <Radio key="Advanced" value="Advanced" label="Advanced" />
        </BACRadioGroup>
      </div>

      <div className="requestFieldContainer">
        <BACDropdown<RHFRequest>
          name="dcwf3"
          labelText="DCWF Role 3"
          customOnOptionSelect={customOnOptionSelect}
          customValue={customValue}
          fieldProps={{ clearable: true }}
        >
          {dcwfCodeOptions()}
        </BACDropdown>
      </div>

      <div className="requestFieldContainer">
        <BACRadioGroup<RHFRequest>
          name="dcwf3Level"
          labelText="DCWF Role 3 Proficiency"
          fieldProps={{ layout: "horizontal" }}
          rules={{
            required:
              dcwf3?.length === 1 ? "DCWF Role 3 Proficiency is required" : "",
          }}
        >
          <Radio key="Basic" value="Basic" label="Basic" />
          <Radio key="Intermediate" value="Intermediate" label="Intermediate" />
          <Radio key="Advanced" value="Advanced" label="Advanced" />
        </BACRadioGroup>
      </div>
    </fieldset>
  );
};
export default Certifications;
