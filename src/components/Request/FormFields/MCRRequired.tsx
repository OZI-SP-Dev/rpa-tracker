import { Radio } from "@fluentui/react-components";
import "components/Request/Request.css";
import { RHFRequest } from "components/Request/NewRequestForm";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import BACTextarea from "components/BaseFormFields/BACTextarea";
import { useWatch } from "react-hook-form";

const MCRRequired = () => {
  const mcrRequired = useWatch({ name: "mcrRequired" });

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<RHFRequest>
          name="mcrRequired"
          labelText="Management Change Request (MCR) Required"
          labelInfo="An MCR is required when there is an administrative change in an MPCN's information such as duty location, SAR code, etc"
          rules={{
            required: "Management Change Request (MCR) Required is required",
          }}
          fieldProps={{ layout: "horizontal" }}
        >
          <Radio key="Yes" value="Yes" label="Yes" />
          <Radio key="No" value="No" label="No" />
        </BACRadioGroup>
      </div>
      {mcrRequired === "Yes" && (
        <div className="requestFieldContainer">
          <BACTextarea<RHFRequest>
            name="mcrJustification"
            labelText="Mission Justification/Mission Impact/Personnel Impact for MCR"
            rules={{
              required:
                "Mission Justification/Mission Impact/Personnel Impact for MCR is required when MCR required is 'Yes'",
            }}
            fieldProps={{ rows: 3 }}
          ></BACTextarea>
        </div>
      )}
    </>
  );
};
export default MCRRequired;
