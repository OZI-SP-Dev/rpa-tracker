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
import ViewRequestLISearchDetails from "../Methods/LinkedInSearch";
import { LinkedInLogoIcon } from "@fluentui/react-icons-mdl2-branded";

const LinkedInSearchDetails = ({
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
      <Accordion collapsible>
        <AccordionItem value="LinkedInSearch">
          <CardHeader
            header={
              <AccordionHeader
                icon={<LinkedInLogoIcon style={{ color: "#0077B5" }} />}
              >
                <Subtitle1>LinkedIn Profile Search</Subtitle1>
              </AccordionHeader>
            }
            action={
              <Button
                appearance="transparent"
                icon={<EditIcon />}
                aria-label="Edit"
                onClick={() => {
                  setEditSection("LinkedInSearch");
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Button>
            }
          />
          <AccordionPanel>
            {request.data && <ViewRequestLISearchDetails data={request.data} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default LinkedInSearchDetails;
