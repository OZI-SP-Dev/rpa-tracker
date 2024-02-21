import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const USAJobs = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">USA Jobs Flyer Additional Information</Title2>
      </Divider>
      <FormFields.CloseDateUsaJobs />
    </>
  );
};

export default USAJobs;
