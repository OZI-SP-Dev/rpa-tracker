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
import { AirplaneIcon, EditIcon } from "@fluentui/react-icons-mdl2";
import ViewRequestJobsFlyerDetails from "../Methods/JobsFlyer";

const USAJobsDetails = ({
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
          <Accordion collapsible defaultOpenItems="usaJobsFlyer">
            <AccordionItem value="usaJobsFlyer">
              <AccordionHeader
                icon={<AirplaneIcon style={{ color: "#120A8F" }} />}
              >
                <Subtitle1>USA Jobs</Subtitle1>
              </AccordionHeader>
              <AccordionPanel>
                {request.data && (
                  <ViewRequestJobsFlyerDetails data={request.data} />
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

export default USAJobsDetails;
