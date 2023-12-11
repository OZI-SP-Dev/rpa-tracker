import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Tooltip,
} from "@fluentui/react-components";
import { EditIcon } from "@fluentui/react-icons-mdl2";
//import { useParams } from "react-router-dom";

const EditRequest = () => {
  //const params = useParams();

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Edit" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<EditIcon className="blue" />}
            size="large"
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Edit request</DialogTitle>
          <DialogContent>
            Decide if want an edit form here, or if we should redirect to an
            edit page.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Save</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default EditRequest;
