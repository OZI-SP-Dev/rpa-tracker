import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const JobBoard = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">Additional LCMC Job Board Information</Title2>
      </Divider>
      <FormFields.CloseDateLCMC />
    </>
  );
};

export default JobBoard;
