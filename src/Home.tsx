import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
//import RequestsTable from "components/RequestsTable/RequestsTable";
import { FunctionComponent, lazy } from "react";
import { Link } from "react-router-dom";

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
            <p>
              Select <Link to="/New">“New Request”</Link> at the top of this
              page to initiate an RPA Request. Complete the following pages and
              click “Next” to continue through the process. All fields with an
              asterisk must be completed before continuing to the next page. You
              can save your work at any time and return to it later by clicking
              “Save” at the bottom of any page.
            </p>
            <p>
              Once complete, select the RPA Tracker link at the top left of the
              page to return to the Dashboard. Here, you can view all Requests
              you've entered and the current stage of the process each one is
              in.
            </p>
          </Body1>
        </section>
        <section className={styles.section}>
          <Title3 align="center">Help Info</Title3>
          <Body1>
            <p>
              For questions or issues with this tool or assistance with
              completing your RPA Request package, please contact: <br />
              <a href="mailto:sabrina.pratte.1@us.af.mil">
                Sabrina Pratte AFLCMC/XP-OZIF
              </a>
              <br />
              <a href="mailto:chrystal.gayheart@us.af.mil">
                Chrystal Gayheart AFLCMC/XP-OZIF
              </a>
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
