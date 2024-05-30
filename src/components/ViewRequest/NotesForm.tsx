import { useParams } from "react-router-dom";
import {
  Button,
  DrawerBody,
  Input,
  Label,
  Textarea,
} from "@fluentui/react-components";
import { useAddNote } from "api/notesApi";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";
import { ContactIcon, TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { Person } from "api/requestsApi";
import { useSendEmail } from "api/emailApi";

const NotesForm = ({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const addNote = useAddNote(requestId);
  const sendMail = useSendEmail();

  const [toSelections, setToSelections] = useState<Person[]>([]);
  const [ccSelections, setCcSelections] = useState<Person[]>([]);
  const [subject, setSubject] = useState("");
  const [newNoteText, setNewNoteText] = useState("");

  if (
    !isOpen &&
    (toSelections.length > 0 ||
      ccSelections.length > 0 ||
      subject ||
      newNoteText)
  ) {
    setToSelections([]);
    setCcSelections([]);
    setSubject("");
    setNewNoteText("");
  }

  return (
    <DrawerBody>
      <Label id="To" weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        To
      </Label>
      <PeoplePicker
        ariaLabel="To"
        aria-labelledby="To"
        selectedItems={toSelections}
        itemLimit={10}
        updatePeople={(items) => {
          if (items?.[0]?.Title) {
            setToSelections(items);
          } else {
            setToSelections([]);
          }
        }}
      />
      <br />

      <Label id="Cc" weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        Cc
      </Label>
      <PeoplePicker
        ariaLabel="Cc"
        aria-labelledby="Cc"
        selectedItems={ccSelections}
        itemLimit={10}
        updatePeople={(items) => {
          if (items?.[0]?.Title) {
            setCcSelections(items);
          } else {
            setCcSelections([]);
          }
        }}
      />
      <br />

      <Label id="Subject" weight="semibold" className="fieldLabel">
        <TextFieldIcon className="fieldIcon" />
        Subject
      </Label>
      <div>
        <Input
          id="Subject"
          style={{ width: "100%" }}
          value={subject}
          onChange={(_ev, data) => setSubject(data.value)}
        />
      </div>
      <br />

      <Label id="Body" weight="semibold" className="fieldLabel">
        <TextFieldIcon className="fieldIcon" />
        Body
      </Label>
      <Textarea
        id="Body"
        style={{ width: "100%", display: "block" }}
        placeholder="new note text..."
        resize="vertical"
        rows={10}
        value={newNoteText}
        onChange={(_ev, data) => setNewNoteText(data.value)}
        maxLength={2000}
      />
      <br />

      <div style={{ width: "100%", display: "flex" }}>
        <Button disabled={addNote.isLoading} onClick={() => closeDrawer()}>
          Cancel
        </Button>
        <Button
          appearance="primary"
          style={{ marginLeft: "auto" }}
          disabled={addNote.isLoading}
          onClick={() => {
            addNote.mutateAsync(newNoteText).then(() => {
              closeDrawer();
              if (toSelections.length > 0) {
                const email = {
                  To: [] as string[],
                  CC: [] as string[],
                  Subject: subject,
                  Body: newNoteText,
                };
                toSelections.forEach((person) => email.To.push(person.EMail));
                ccSelections.forEach((person) => email.CC.push(person.EMail));
                sendMail.mutate({ email, requestId });
              }
              addNote.reset();
            });
          }}
        >
          Save
        </Button>
      </div>
    </DrawerBody>
  );
};

export default NotesForm;
