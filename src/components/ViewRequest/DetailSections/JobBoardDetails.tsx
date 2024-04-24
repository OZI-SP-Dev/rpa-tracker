import ViewRequestLCMCDetails from "../Methods/LCMC";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { BoardsIcon } from "@fluentui/react-icons-mdl2";
import DetailsTemplate from "./DetailsTemplate";

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
    <DetailsTemplate
      sectionName="lcmc"
      sectionDescription="LCMC Job Board"
      setEditSection={setEditSection}
      setIsEditOpen={setIsEditOpen}
      detailSelection="jobBoardPostDate"
      icon={<BoardsIcon />}
    >
      {request.data && <ViewRequestLCMCDetails data={request.data} />}
    </DetailsTemplate>
  );
};

export default JobBoardDetails;
