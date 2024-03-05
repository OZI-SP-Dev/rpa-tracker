import { Card, CardHeader, Subtitle1 } from "@fluentui/react-components";
import { DocumentSearchRegular } from "@fluentui/react-icons";

const ResumeSearchDetails = () => {
  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <CardHeader
        image={<DocumentSearchRegular />}
        header={<Subtitle1>Resume Search</Subtitle1>}
      />
    </Card>
  );
};

export default ResumeSearchDetails;
