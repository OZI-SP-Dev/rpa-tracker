import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const JOAField = () => {
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
      <FormFields.PCS />
      <FormFields.JOAQualifications />
      <FormFields.JOAIdealCandidate />
    </>
  );
};

export default JOAField;
