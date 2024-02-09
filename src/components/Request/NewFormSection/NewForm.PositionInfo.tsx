import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Title2 } from "@fluentui/react-components";

const PositionInfo = () => {
  return (
    <>
      <Divider inset>
        <Title2 align="center">Position Information</Title2>
      </Divider>
      <FormFields.PositionTitle />
      <FormFields.PaySystem />
      <FormFields.Series />
      <FormFields.Grade />
      <FormFields.OfficeSymbol />
      <FormFields.Supervisor />
      <FormFields.MPCN />
      <FormFields.CPCN />
      <FormFields.FMS />
      <FormFields.PositionSensitivity />
      <FormFields.DutyLocation />
      <FormFields.Incumbent />
    </>
  );
};

export default PositionInfo;
