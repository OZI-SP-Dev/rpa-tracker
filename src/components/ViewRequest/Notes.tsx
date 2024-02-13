import {
  Body2,
  Button,
  Card,
  CardHeader,
  Persona,
  Text,
  Title2,
} from "@fluentui/react-components";
import { BoxAdditionSolidIcon } from "@fluentui/react-icons-mdl2";
import { useNotes } from "api/notesApi";
import { useParams } from "react-router-dom";

const ViewRequestNotes = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const notes = useNotes(requestId);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Title2>Notes</Title2>
        <Button
          style={{ marginLeft: "auto" }}
          appearance="transparent"
          icon={<BoxAdditionSolidIcon />}
          iconPosition="after"
        >
          Add a Note
        </Button>
      </div>
      {notes.data && (
        <section>
          {notes.data.map((note) => {
            return (
              <Card
                key={"note" + note.id}
                orientation="horizontal"
                appearance="filled-alternative"
                style={{ margin: "0.25em" }}
              >
                <CardHeader
                  header={
                    <>
                      <Persona
                        name={note.author.name}
                        secondaryText={note.author.email}
                        avatar={{
                          image: {
                            src: `/_layouts/15/userphoto.aspx?accountname=${note.author.email}&size=S`,
                          },
                        }}
                      />
                      <Text style={{ marginLeft: "auto" }}>
                        {new Date(note.createdDate).toLocaleString()}
                      </Text>
                    </>
                  }
                  description={<Body2>{note.text}</Body2>}
                />
              </Card>
            );
          })}
        </section>
      )}
      {!notes.data && <div>There's nothing here...</div>}
      {notes.isError && (
        <div>An error has occured: {(notes.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestNotes;
