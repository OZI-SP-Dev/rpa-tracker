import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const HiringInfo = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">Hiring Information</Title2>
      </Divider>
      <FormFields.AdvertisementLength />
      <FormFields.Methods />
    </>
  );
};

export default HiringInfo;
