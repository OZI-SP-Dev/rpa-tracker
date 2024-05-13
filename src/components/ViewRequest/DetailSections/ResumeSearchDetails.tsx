import { DocumentSearchRegular } from "@fluentui/react-icons";
import DetailsTemplate from "components/ViewRequest/DetailSections/DetailsTemplate";
import { Label } from "@fluentui/react-components";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ResumeSearchDetails = () => {
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
        <UpdatePostId detailSelection="resumeSearchId" />
      </section>
    </DetailsTemplate>
  );
};

export default ResumeSearchDetails;
