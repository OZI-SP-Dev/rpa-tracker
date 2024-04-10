import * as FormFields from "components/Request/FormFields/FormFields";
import { Divider, Label, Title2 } from "@fluentui/react-components";
import { ContactIcon } from "@fluentui/react-icons-mdl2";
import { useCurrentUser } from "api/UserApi";

const RoutingInfo = () => {
  const user = useCurrentUser();
  return (
    <>
      <Divider inset>
        <Title2 align="center">Routing Information</Title2>
      </Divider>
      <div className="requestFieldContainer">
        <Label
          id="requestorId"
          weight="semibold"
          className="fieldLabel"
          required
        >
          <ContactIcon className="fieldIcon" />
          Requestor
        </Label>
        {user.text}
      </div>
      <FormFields.RequestType />
      <FormFields.OSF />
      <FormFields.MCRRequired />

      <Divider inset>
        <Title2 align="center">Position Information</Title2>
      </Divider>
      <FormFields.PositionTitle />
      <FormFields.Supervisory />
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

export default RoutingInfo;
