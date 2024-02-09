import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const LinkedInSearch = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">
          LinkedIn Profile Search Additional Information
        </Title2>
      </Divider>
      <FormFields.LinkedinSearchTitles />
      <FormFields.LinkedinSearchSkills />
      <FormFields.LinkedinSearchEmployers />
      <FormFields.LinkedinSearchStudies />
      <FormFields.LinkedinSearchKeywords />
      <FormFields.LinkedinSearchComments />
    </>
  );
};

export default LinkedInSearch;
