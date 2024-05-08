import { DocumentSearchRegular } from "@fluentui/react-icons";
import DetailsTemplate from "components/ViewRequest/DetailSections/DetailsTemplate";
import { Label, Text } from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ResumeSearchDetails = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  return (
    <DetailsTemplate
      sectionName="resume"
      sectionDescription="Resume Search"
      detailSelection="resumeSearchDate"
      icon={<DocumentSearchRegular />}
    >
      <section className="viewRequestDetails">
        <Label weight="semibold" htmlFor="resumeSearchId">
          Posting ID
        </Label>
        <div>
          <Text id="resumeSearchId">{request.data?.resumeSearchId}</Text>
          <UpdatePostId detailSelection="resumeSearchId" />
        </div>
      </section>
    </DetailsTemplate>
  );
};

export default ResumeSearchDetails;
