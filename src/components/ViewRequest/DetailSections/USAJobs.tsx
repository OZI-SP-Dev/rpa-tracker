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
      <Accordion collapsible defaultOpenItems="usaJobsFlyer">
        <AccordionItem value="usaJobsFlyer">
          <CardHeader
            header={
              <AccordionHeader
                icon={<AirplaneIcon style={{ color: "#120A8F" }} />}
              >
                <Subtitle1>USA Jobs</Subtitle1>
              </AccordionHeader>
            }
            action={
              <Button
                appearance="transparent"
                icon={<EditIcon />}
                aria-label="Edit"
                onClick={() => {
                  setEditSection("usaJobsFlyer");
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Button>
            }
          />
          <AccordionPanel>
            {request.data && (
              <ViewRequestJobsFlyerDetails data={request.data} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default USAJobsDetails;
