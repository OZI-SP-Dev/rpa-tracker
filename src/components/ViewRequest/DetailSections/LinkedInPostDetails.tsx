import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { LinkedInLogoIcon } from "@fluentui/react-icons-mdl2-branded";
import ViewRequestLIJobPostDetails from "../Methods/LinkedInJobPost";
import DetailsTemplate from "./DetailsTemplate";

const LinkedInPostDetails = ({
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
      sectionName="linkedinPost"
      sectionDescription="LinkedIn Job Posting"
      setEditSection={setEditSection}
      setIsEditOpen={setIsEditOpen}
      detailSelection="linkedInPostDate"
      icon={<LinkedInLogoIcon style={{ color: "#0077B5" }} />}
    >
      {request.data && <ViewRequestLIJobPostDetails data={request.data} />}
    </DetailsTemplate>
  );
};

export default LinkedInPostDetails;
