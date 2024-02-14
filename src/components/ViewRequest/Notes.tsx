import {
  Body2,
  Button,
  Card,
  CardHeader,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Persona,
  Text,
  Title2,
} from "@fluentui/react-components";
import { CommentAddIcon } from "@fluentui/react-icons-mdl2";
import { DismissRegular } from "@fluentui/react-icons";
import { useNotes } from "api/notesApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ViewRequestNotes = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const notes = useNotes(requestId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OverlayDrawer position="end" modalType="non-modal" open={isOpen}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            New Note
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>Note form component goes here</p>
        </DrawerBody>
      </OverlayDrawer>

      <div style={{ display: "flex" }}>
        <Title2>Notes</Title2>
        <Button
          style={{ marginLeft: "auto" }}
          icon={<CommentAddIcon />}
          onClick={() => setIsOpen(true)}
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
                appearance="filled-alternative"
                style={{ margin: "0.25em 0" }}
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
                />
                <Body2>{note.text}</Body2>
              </Card>
            );
          })}
        </section>
      )}
      {!notes.isLoading && !notes.data && <div>There's nothing here...</div>}
      {notes.isError && (
        <div>An error has occured: {(notes.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestNotes;
