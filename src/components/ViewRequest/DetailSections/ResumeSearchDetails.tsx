import { Card, CardHeader, Subtitle1 } from "@fluentui/react-components";

const ResumeSearchDetails = () => {
  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <CardHeader header={<Subtitle1>Resume Search</Subtitle1>} />
      <div style={{ margin: "0px var(--spacingHorizontalM)" }}>
        Possibly a button to grant permissions if you have X role?
      </div>
    </Card>
  );
};

export default ResumeSearchDetails;
