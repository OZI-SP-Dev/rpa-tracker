import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const JOA = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">JOA Additional Information</Title2>
      </Divider>
      <FormFields.CloseDateJOA />
      <FormFields.OrganizationalPOC />
      <FormFields.IssueTo />
      <FormFields.FullPartTime />
      <FormFields.Salary />
      <FormFields.Telework />
      <FormFields.Remote />
      <FormFields.PCS />
      <FormFields.JOAQualifications />

      <FormFields.JOAIdealCandidate />
    </>
  );
};

export default JOA;
