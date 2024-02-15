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
  Textarea,
  Title2,
} from "@fluentui/react-components";
import { CommentAddIcon } from "@fluentui/react-icons-mdl2";
import { DismissRegular } from "@fluentui/react-icons";
import { useAddNote, useNotes } from "api/notesApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

const parseUTF16 = (text: string) => {
  return text.replaceAll(/&#(\d{6});/g, (_a, b) => {
    return String.fromCodePoint(parseInt(b));
  });
};

const ViewRequestNotes = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const notes = useNotes(requestId);
  const [isOpen, setIsOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const addNote = useAddNote(requestId);

  if (addNote.isSuccess) {
    setIsOpen(false);
    addNote.reset();
  }

  return (
    <>
      <OverlayDrawer
        position="end"
        modalType="non-modal"
        style={{ height: "100vh", minWidth: "fit-content" }}
        open={isOpen}
      >
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
          <Textarea
            style={{ width: "100%" }}
            placeholder="new note text..."
            resize="vertical"
            rows={10}
            value={newNoteText}
            onChange={(_ev, data) => setNewNoteText(data.value)}
            maxLength={2000}
          />
          <div style={{ width: "100%", display: "flex" }}>
            <Button
              disabled={addNote.isLoading}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              style={{ marginLeft: "auto" }}
              disabled={addNote.isLoading}
              onClick={() => {
                addNote.mutate(newNoteText);
              }}
            >
              Save
            </Button>
          </div>
        </DrawerBody>
      </OverlayDrawer>

      <div style={{ display: "flex" }}>
        <Title2>Notes</Title2>
        <Button
          disabled={!notes.data?.length}
          style={{ marginLeft: "auto" }}
          icon={<CommentAddIcon />}
          onClick={() => {
            setNewNoteText("");
            setIsOpen(true);
          }}
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
                <Body2>{parseUTF16(note.text)}</Body2>
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
