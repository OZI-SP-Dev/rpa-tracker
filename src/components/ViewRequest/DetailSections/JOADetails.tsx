import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import ViewRequestJOADetails from "components/ViewRequest/Methods/JOA";
import DetailsTemplate from "components/ViewRequest/DetailSections/DetailsTemplate";

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
    <DetailsTemplate
      sectionName="JOA"
      sectionDescription="JOA"
      setEditSection={setEditSection}
      setIsEditOpen={setIsEditOpen}
      detailSelection="joaPostDate"
    >
      {request.data && <ViewRequestJOADetails data={request.data} />}
    </DetailsTemplate>
  );
};

export default JOADetails;
