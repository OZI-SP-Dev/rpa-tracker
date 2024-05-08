import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@fluentui/react-components";
import { usePostRequest } from "api/postRequestApi";
import { useRequest } from "api/requestsApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const POSTTYPES = [
  "jobBoardPostId",
  "joaPostId",
  "linkedInPostId",
  "linkedInSearchId",
  "resumeSearchId",
  "usaJobsPostId",
] as const;

const UpdatePostId = ({
  detailSelection,
}: {
  detailSelection: (typeof POSTTYPES)[number];
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const postRequest = usePostRequest();

  const { control, handleSubmit, reset } = useForm<{
    ItemId: string;
  }>({
    defaultValues: { ItemId: request.data?.[detailSelection] },
  });

  const onSubmit: SubmitHandler<{ ItemId: string }> = (data) => {
    const requestData = {
      ...{ [detailSelection]: data.ItemId },
    };

    postRequest.mutate({
      requestId: Number(params.requestId),
      postRequest: requestData,
    });
  };

  return (
    <Dialog
      modalType="modal"
      onOpenChange={() =>
        reset({
          ItemId: request.data?.[detailSelection],
        })
      }
    >
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="subtle" size="small" style={{ marginLeft: "auto" }}>
          Update ID
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <DialogTitle>Update ID</DialogTitle>
            <DialogContent
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "0.5em",
                alignItems: "center",
              }}
            >
              <Label htmlFor={detailSelection}>Posting ID</Label>
              <Controller
                name="ItemId"
                control={control}
                render={({ field }) => (
                  <Input id={detailSelection} {...field} />
                )}
              />
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" type="submit">
                Update
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default UpdatePostId;
