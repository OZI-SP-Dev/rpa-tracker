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
import ViewRequestJOADetails from "../Methods/JOA";

const JOADetails = ({
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
            <AccordionItem value="joa">
              <AccordionHeader>
                <Subtitle1>JOA</Subtitle1>
              </AccordionHeader>
              <AccordionPanel>
                {request.data && <ViewRequestJOADetails data={request.data} />}
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
              setEditSection("JOA");
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

export default JOADetails;
