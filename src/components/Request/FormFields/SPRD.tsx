import { RHFRequest } from "components/Request/NewRequestForm";
import "components/Request/Request.css";
import BACInput from "components/BaseFormFields/BACInput";
import { Link } from "@fluentui/react";

const SPRDField = () => {
  return (
    <div className="requestFieldContainer">
      <BACInput<RHFRequest>
        name="sprd"
        labelText="SPRD Number"
        infoElement={
          <>
            SPRDs can be found in the{" "}
            <Link
              href="https://usaf.dps.mil/teams/22541/ITCIOIPT/PD/Forms/AllItems.aspx"
              target="_blank"
            >
              PD Library
            </Link>
          </>
        }
        rules={{
          required: "SPRD is required",
          maxLength: {
            value: 15,
            message: "SPRD cannot exceed 15 characters",
          },
        }}
      />
    </div>
  );
};
export default SPRDField;
