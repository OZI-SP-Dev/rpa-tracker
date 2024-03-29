import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
//import RequestsTable from "components/RequestsTable/RequestsTable";
import { FunctionComponent, lazy } from "react";

// Begin module downloads immediately, but still utilize lazy() for code splitting
const RequestsTablePromise = import("components/RequestsTable/RequestsTable");
const RequestsTable = lazy(() => RequestsTablePromise);

const useStyles = makeStyles({
  section: {
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "12px",
    marginRight: "12px",
    maxWidth: "50em",
    minWidth: "600px",
    width: "100%",
  },
});

const Home: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Title1 align="center" style={{ whiteSpace: "nowrap" }}>
        <b>Welcome to the AFLCMC COS RPA Tracker</b>
      </Title1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          flexWrap: "wrap",
          flexGrow: 1,
          flexBasis: "auto",
        }}
      >
        <section className={styles.section}>
          <Title3 align="center">RPA Tool Overview</Title3>
          <Body1>
            <p>
              This is the Cyber Operations Support (COS) Request for Personnel
              Action (RPA) Tool. It is your single source for initiating a COS
              request for an RPA. Within this tool, you will find links for
              applicable AFMC, AFLCMC, and COS policies and guidance to assist
              you in completing the RPA request. All activities for initiating a
              recruit/fill to include job announcement options, candidate
              selection, and approvals are managed within this tool.
            </p>
          </Body1>
        </section>
        <section className={styles.section}>
          <Title3 align="center">RPA Tool Instructions</Title3>
          <Body1>
            <p>A blurb with some instructions</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
              nibh quis magna viverra mollis. Donec lacinia porttitor pretium.
              Ut efficitur lectus a efficitur aliquet. Aenean quis orci vel
              justo dapibus rhoncus nec vel lacus. Nulla congue luctus
              elementum. Sed maximus augue a sapien fermentum, ac maximus tortor
              dapibus. Proin id tincidunt massa, eget suscipit ligula
            </p>
          </Body1>
        </section>
        <section className={styles.section}>
          <Title3 align="center">Help Info</Title3>
          <Body1>
            <p>A blurb about who to contact for assistance</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
              nibh quis magna viverra mollis. Donec lacinia porttitor pretium.
              Ut efficitur lectus a efficitur aliquet. Aenean quis orci vel
              justo dapibus rhoncus nec vel lacus. Nulla congue luctus
              elementum. Sed maximus augue a sapien fermentum, ac maximus tortor
              dapibus. Proin id tincidunt massa, eget suscipit ligula
            </p>
          </Body1>
        </section>
        <section className={styles.section}>
          <Title3 align="center">Commonly Requested Documents</Title3>
          <Body1>
            <p>
              placeholder for a datagrid or something similar with documents in
              a doc library
            </p>
          </Body1>
        </section>
      </div>
      <RequestsTable />
    </div>
  );
};

export default Home;
