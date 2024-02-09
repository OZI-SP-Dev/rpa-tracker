import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, InfoLabel, Title2 } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

const LinkedInPost = () => {
  const form = useFormContext();
  const linkedinQualifications = form.watch("linkedinQualifications");
  const linkedinCertification =
    linkedinQualifications.includes("certification");
  const temporary = form.watch("temporary");

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
      <FormFields.Telework />
      <FormFields.LinkedinPositionSummary />
      <FormFields.LinkedinQualifications />
      {linkedinCertification && <FormFields.Certifications />}
      <FormFields.LinkedinKSAs />
    </>
  );
};

export default LinkedInPost;
