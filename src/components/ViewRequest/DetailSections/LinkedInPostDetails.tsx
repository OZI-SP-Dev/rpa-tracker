import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardHeader,
  Subtitle1,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import { LinkedInLogoIcon } from "@fluentui/react-icons-mdl2-branded";
import ViewRequestLIJobPostDetails from "../Methods/LinkedInJobPost";

const LinkedInPostDetails = ({
  setEditSection,
  setIsEditOpen,
}: {
  setEditSection: (section: string) => void;
  setIsEditOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));

  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <CardHeader
        header={
          <Accordion collapsible>
            <AccordionItem value="linkedinPost">
              <AccordionHeader
                icon={<LinkedInLogoIcon style={{ color: "#0077B5" }} />}
              >
                <Subtitle1>LinkedIn Job Posting</Subtitle1>
              </AccordionHeader>
              <AccordionPanel>
                {request.data && (
                  <ViewRequestLIJobPostDetails data={request.data} />
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        }
        action={
          <Button
            appearance="transparent"
            icon={<EditIcon />}
            aria-label="Edit"
            onClick={() => {
              setEditSection("LinkedInPost");
              setIsEditOpen(true);
            }}
          >
            Edit
          </Button>
        }
      />
    </Card>
  );
};

export default LinkedInPostDetails;
