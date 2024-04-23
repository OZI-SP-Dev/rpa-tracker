import {
  Accordion,
  AccordionHeader,
  AccordionItem,
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
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { DocumentSearchRegular } from "@fluentui/react-icons";
import { CheckMarkIcon, DeleteIcon } from "@fluentui/react-icons-mdl2";
import { usePostRequest } from "api/postRequestApi";
import { useMyRoles } from "api/rolesApi";

const ResumeSearchDetails = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const myRoles = useMyRoles();
  const postRequest = usePostRequest();

  const isPostable =
    request.data?.stage === "PackageReview" &&
    (myRoles.isHRL || myRoles.isCOSF);

  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <Accordion collapsible defaultOpenItems="lcmc">
        <AccordionItem value="lcmc">
          <CardHeader
            header={
              <AccordionHeader icon={<DocumentSearchRegular />}>
                <Subtitle1>Resume Search</Subtitle1>
              </AccordionHeader>
            }
            action={
              <div style={{ display: "flex" }}>
                {!request.data?.resumeSearchDate && (
                  <>
                    {isPostable && (
                      <Button
                        icon={<CheckMarkIcon />}
                        aria-label="Mark as posted"
                        onClick={() => {
                          postRequest.mutate({
                            requestId: Number(params.requestId),
                            postRequest: { resumeSearchDate: new Date() },
                          });
                        }}
                      >
                        Post
                      </Button>
                    )}
                  </>
                )}
                {request.data?.resumeSearchDate && (
                  <>
                    <div>
                      <Text weight="semibold">Posted:</Text>
                      <Text>
                        {request.data.resumeSearchDate.toLocaleDateString()}
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
                                    postRequest: { resumeSearchDate: "" },
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
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ResumeSearchDetails;
