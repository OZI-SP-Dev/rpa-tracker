import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import ViewRequestLISearchDetails from "components/ViewRequest/Methods/LinkedInSearch";
import { LinkedInLogoIcon } from "@fluentui/react-icons-mdl2-branded";
import DetailsTemplate from "components/ViewRequest/DetailSections/DetailsTemplate";

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
    <DetailsTemplate
      sectionName="linkedInSearch"
      sectionDescription="LinkedIn Profile Search"
      setEditSection={setEditSection}
      setIsEditOpen={setIsEditOpen}
      detailSelection="linkedInSearchDate"
      icon={<LinkedInLogoIcon style={{ color: "#0077B5" }} />}
    >
      {request.data && <ViewRequestLISearchDetails data={request.data} />}
    </DetailsTemplate>
  );
};

export default LinkedInSearchDetails;
