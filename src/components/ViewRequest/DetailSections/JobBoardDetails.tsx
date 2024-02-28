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
import ViewRequestLCMCDetails from "../Methods/LCMC";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { BoardsIcon, EditIcon } from "@fluentui/react-icons-mdl2";

const JobBoardDetails = ({
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
      <Accordion collapsible defaultOpenItems="lcmc">
        <AccordionItem value="lcmc">
          <CardHeader
            header={
              <AccordionHeader icon={<BoardsIcon />}>
                <Subtitle1>LCMC Job Board</Subtitle1>
              </AccordionHeader>
            }
            action={
              <Button
                appearance="transparent"
                icon={<EditIcon />}
                aria-label="Edit"
                onClick={() => {
                  setEditSection("JobBoard");
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Button>
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
