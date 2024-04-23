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
  Subtitle1,
  Text,
} from "@fluentui/react-components";
import ViewRequestLCMCDetails from "../Methods/LCMC";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import {
  BoardsIcon,
  CheckMarkIcon,
  DeleteIcon,
  EditIcon,
} from "@fluentui/react-icons-mdl2";
import { usePostRequest } from "api/postRequestApi";
import { useMyRoles } from "api/rolesApi";

const JobBoardDetails = ({
  setEditSection,
  setIsEditOpen,
}: {
  setEditSection: (section: string) => void;
  setIsEditOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const myRoles = useMyRoles();
  const postRequest = usePostRequest();

  const isPostable =
    request.data?.stage === "PackageReview" &&
    (myRoles.isHRL || myRoles.isCOSF);

  const isEditable =
    request.data?.stage === "Draft" ||
    (request.data?.stage === "PackageReview" &&
      !request.data?.jobBoardPostDate);

  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <Accordion collapsible defaultOpenItems="lcmc">
        <AccordionItem value="lcmc">
          <CardHeader
            header={
              <AccordionHeader icon={<BoardsIcon />}>
                <Subtitle1>LCMC Job Board</Subtitle1>
              </AccordionHeader>
            }
            action={
              <div style={{ display: "flex" }}>
                {!request.data?.jobBoardPostDate && (
                  <>
                    {isPostable && (
                      <Button
                        icon={<CheckMarkIcon />}
                        aria-label="Mark as posted"
                        onClick={() => {
                          postRequest.mutate({
                            requestId: Number(params.requestId),
                            postRequest: { jobBoardPostDate: new Date() },
                          });
                        }}
                      >
                        Post
                      </Button>
                    )}
                    {isEditable && (
                      <Button
                        icon={<EditIcon />}
                        aria-label="Edit"
                        onClick={() => {
                          setEditSection("JobBoard");
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </>
                )}
                {request.data?.jobBoardPostDate && (
                  <>
                    <div>
                      <Text weight="semibold">Posted:</Text>
                      <Text>
                        {request.data.jobBoardPostDate.toLocaleDateString()}
                      </Text>
                    </div>
                    {isPostable && (
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
                                    postRequest: { jobBoardPostDate: "" },
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
          <AccordionPanel>
            {request.data && <ViewRequestLCMCDetails data={request.data} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default JobBoardDetails;
