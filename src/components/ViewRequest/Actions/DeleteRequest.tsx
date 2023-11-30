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
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import { useDeleteRequest } from "api/requestsApi";
import { Navigate, useParams } from "react-router-dom";

const DeleteRequest = () => {
  const params = useParams();
  const deleteRequest = useDeleteRequest();

  const deleteHandler = () => {
    deleteRequest.mutate(Number(params.requestId));
  };

  return (
    <>
      {deleteRequest.isSuccess && <Navigate to="/" />}
      {!deleteRequest.isSuccess && (
        <Dialog modalType="alert">
          <DialogTrigger disableButtonEnhancement>
            <Tooltip withArrow content="Delete" relationship="label">
              <Button
                style={{
                  border: "none",
                  background: "transparent",
                  borderRadius: "50%",
                }}
                icon={<DeleteIcon className="red" />}
                size="large"
              />
            </Tooltip>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Delete request</DialogTitle>
              <DialogContent>
                Are you sure you wish to delete this request?
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <DialogTrigger>
                  <Button appearance="primary" onClick={deleteHandler}>
                    Delete
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};

export default DeleteRequest;
