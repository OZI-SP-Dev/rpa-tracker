import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
import { FunctionComponent } from "react";

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
            <p>A blurb about this tool.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
              nibh quis magna viverra mollis. Donec lacinia porttitor pretium.
              Ut efficitur lectus a efficitur aliquet. Aenean quis orci vel
              justo dapibus rhoncus nec vel lacus. Nulla congue luctus
              elementum. Sed maximus augue a sapien fermentum, ac maximus tortor
              dapibus.
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
    </div>
  );
};

export default Home;
