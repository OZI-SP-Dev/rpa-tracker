import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Button,
  Card,
  CardHeader,
  Subtitle1,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import ViewRequestJOADetails from "../Methods/JOA";
import { useState } from "react";

const JOADetails = ({
  setEditSection,
  setIsEditOpen,
}: {
  setEditSection: (section: string) => void;
  setIsEditOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle: AccordionToggleEventHandler<string> = (_e, data) => {
    setOpenItems(data.openItems);
  };

  return (
    <Card style={{ margin: "0.25em 0px" }}>
      <CardHeader
        header={<Subtitle1>JOA</Subtitle1>}
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
      <Accordion openItems={openItems} onToggle={handleToggle} collapsible>
        <AccordionItem value="joa">
          <AccordionHeader>
            {openItems.length === 0 && "Show details..."}
            {openItems.length > 0 && "Hide details..."}
          </AccordionHeader>
          <AccordionPanel>
            {request.data && <ViewRequestJOADetails data={request.data} />}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default JOADetails;
