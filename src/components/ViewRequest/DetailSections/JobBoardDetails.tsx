import {
  Button,
  Card,
  CardHeader,
  Subtitle1,
} from "@fluentui/react-components";
import ViewRequestLCMCDetails from "../Methods/LCMC";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { EditIcon } from "@fluentui/react-icons-mdl2";

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
      <CardHeader
        header={<Subtitle1>LCMC Job Board</Subtitle1>}
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
      <div style={{ margin: "0px var(--spacingHorizontalM)" }}>
        {request.data && <ViewRequestLCMCDetails data={request.data} />}
      </div>
    </Card>
  );
};

export default JobBoardDetails;
