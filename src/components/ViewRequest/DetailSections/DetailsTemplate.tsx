import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Subtitle1,
  Text,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import {
  CheckMarkIcon,
  DeleteIcon,
  EditIcon,
} from "@fluentui/react-icons-mdl2";
import { usePostRequest } from "api/postRequestApi";
import { useMyRoles } from "api/rolesApi";
import { PropsWithChildren } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

declare const _spPageContextInfo: {
  userId: number;
};

const POSTTYPES = [
  { key: "jobBoardPostDate", id: "jobBoardPostId" },
  { key: "joaPostDate", id: "joaPostId" },
  { key: "linkedInPostDate", id: "linkedInPostId" },
  { key: "linkedInSearchDate", id: "linkedInSearchId" },
  { key: "resumeSearchDate", id: "resumeSearchId" },
  { key: "usaJobsPostDate", id: "usaJobsPostId" },
] as const;

const DetailsTemplate = ({
  sectionName,
  sectionDescription,
  setEditSection,
  setIsEditOpen,
  detailSelection,
  icon,
  children,
}: PropsWithChildren<{
  sectionName: string;
  sectionDescription: string;
  setEditSection?: (section: string) => void;
  setIsEditOpen?: (open: boolean) => void;
  detailSelection?: (typeof POSTTYPES)[number]["key"];
  icon?: JSX.Element;
}>) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const myRoles = useMyRoles();
  const postRequest = usePostRequest();

  const isPostable =
    request.data?.stage === "PackageReview" &&
    (myRoles.isHRL || myRoles.isCOSF);

  let postDate: Date | undefined = undefined;
  if (request.data && detailSelection) {
    const tempPostDate = request.data[detailSelection];
    if (tempPostDate instanceof Date) {
      postDate = tempPostDate;
    }
  }

  const isEditable =
    request.data?.stage === "Draft" ||
    (request.data?.stage === "PackageReview" && !postDate);

  const isEditor =
    myRoles.isHRL ||
    myRoles.isOSF ||
    myRoles.isCOSF ||
    Number(request.data?.Author?.Id) === _spPageContextInfo.userId;

  const sectionId = POSTTYPES.find(({ key }) => key === detailSelection)?.id;

  const { control, handleSubmit, reset } = useForm<{
    ItemId: string;
  }>({
    defaultValues: { ItemId: sectionId ? request.data?.[sectionId] : "" },
  });

  const onSubmit: SubmitHandler<{ ItemId: string }> = (data) => {
    if (detailSelection) {
      const requestData = {
        [detailSelection]: new Date(),
        ...(sectionId && { [sectionId]: data.ItemId }),
      };

      postRequest.mutate({
        requestId: Number(params.requestId),
        postRequest: requestData,
      });
    }
  };

  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <Accordion collapsible>
        <AccordionItem value={sectionName}>
          <CardHeader
            header={
              <AccordionHeader icon={icon}>
                <Subtitle1>{sectionDescription}</Subtitle1>
              </AccordionHeader>
            }
            action={
              <div style={{ display: "flex", alignItems: "center" }}>
                {!postDate && (
                  <>
                    {isPostable && detailSelection && (
                      <Dialog
                        modalType="modal"
                        onOpenChange={() =>
                          reset({
                            ItemId: sectionId ? request.data?.[sectionId] : "",
                          })
                        }
                      >
                        <DialogTrigger disableButtonEnhancement>
                          <Button icon={<CheckMarkIcon />}>Post</Button>
                        </DialogTrigger>
                        <DialogSurface>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogBody>
                              <DialogTitle>Mark as posted</DialogTitle>
                              <DialogContent
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "auto 1fr",
                                  columnGap: "0.5em",
                                  alignItems: "center",
                                }}
                              >
                                <Label htmlFor="ItemId">Posting ID</Label>
                                <Controller
                                  name="ItemId"
                                  control={control}
                                  render={({ field }) => (
                                    <Input id="ItemId" {...field} />
                                  )}
                                />
                              </DialogContent>
                              <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                  <Button appearance="secondary">Cancel</Button>
                                </DialogTrigger>
                                <Button appearance="primary" type="submit">
                                  Post
                                </Button>
                              </DialogActions>
                            </DialogBody>
                          </form>
                        </DialogSurface>
                      </Dialog>
                    )}
                    {isEditable &&
                      isEditor &&
                      setEditSection &&
                      setIsEditOpen && (
                        <Button
                          icon={<EditIcon />}
                          aria-label="Edit"
                          onClick={() => {
                            setEditSection(sectionName);
                            setIsEditOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                  </>
                )}
                {postDate && (
                  <>
                    <div style={{ marginRight: "0.5em" }}>
                      <Text weight="semibold">Posted: </Text>
                      <Text>{postDate.toLocaleDateString()}</Text>
                    </div>
                    {isPostable && detailSelection && (
                      <Dialog modalType="alert">
                        <DialogTrigger disableButtonEnhancement>
                          <Button icon={<DeleteIcon />}>Unpost</Button>
                        </DialogTrigger>
                        <DialogSurface>
                          <DialogBody>
                            <DialogTitle>Clear Post Date</DialogTitle>
                            <DialogContent>
                              Are you sure you want to clear the posting date
                              for this item?
                            </DialogContent>
                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                              </DialogTrigger>
                              <Button
                                appearance="primary"
                                onClick={() => {
                                  postRequest.mutate({
                                    requestId: Number(params.requestId),
                                    postRequest: {
                                      [detailSelection]: "",
                                      ...(sectionId && { [sectionId]: "" }),
                                    },
                                  });
                                }}
                              >
                                Clear the date
                              </Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    )}
                  </>
                )}
              </div>
            }
          />
          <AccordionPanel>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default DetailsTemplate;
