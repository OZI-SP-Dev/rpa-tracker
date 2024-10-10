import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, InfoLabel, Title2 } from "@fluentui/react-components";
import { useWatch } from "react-hook-form";

const LinkedInPost = () => {
  const temporary = useWatch({ name: "temporary" });

  return (
    <>
      <Divider inset>
        <Title2 align="center">
          LinkedIn Job Posting Additional Information
          <InfoLabel
            size="large"
            info="LinkedIn anouncements are posted for 30 days"
          />
        </Title2>
      </Divider>
      <FormFields.Temporary />
      {(temporary === "Term" || temporary === "Temp") && <FormFields.NTE />}
      <FormFields.Salary />
      <FormFields.Incentives />
      <FormFields.LinkedinPositionSummary />
      <FormFields.LinkedinQualifications />
      <FormFields.LinkedinKSAs />
    </>
  );
};

export default LinkedInPost;
