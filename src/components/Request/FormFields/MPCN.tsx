import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { NumberFieldIcon } from "@fluentui/react-icons-mdl2";
import { Radio } from "@fluentui/react-components";
import BACRadioGroup from "components/BaseFormFields/BACRadioGroup";
import { useWatch } from "react-hook-form";

const MPCNField = () => {
  const paq = useWatch({ name: "paq" });

  const rules = {
    required: paq === "Yes" ? false : "MPCN is required",
    validate: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      minLength: (v: any) => {
        return (
          paq === "Yes" ||
          v.length > 6 ||
          "MPCN cannot be less than 7 characters"
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      maxLength: (v: any) => {
        return (
          paq === "Yes" ||
          v.length < 11 ||
          "MPCN cannot be more than 10 characters"
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pattern: (v: any) =>
        paq === "Yes" ||
        (v.match(/^[A-Za-z]{0,3}\d+$/)?.length
          ? true
          : "MPCN can only consist of zero to three characters followed by numbers"),
    },
  };

  return (
    <>
      <div className="requestFieldContainer">
        <BACRadioGroup<RHFRequest>
          name="paq"
          labelText="PAQ/PCIP/Pathways Position"
          fieldProps={{ layout: "horizontal" }}
          rules={{ required: "PAQ/PCIP/Pathways Position is required" }}
        >
          <Radio key="Yes" value="Yes" label="Yes" />
          <Radio key="No" value="No" label="No" />
        </BACRadioGroup>
      </div>
      <div className="requestFieldContainer">
        <BACInput<RHFRequest>
          name="mpcn"
          labelText="MPCN"
          labelIcon={<NumberFieldIcon className="fieldIcon" />}
          rules={rules}
        />
      </div>
    </>
  );
};
export default MPCNField;
