import { DocumentSearchRegular } from "@fluentui/react-icons";
import DetailsTemplate from "./DetailsTemplate";

const ResumeSearchDetails = () => {
  return (
    <DetailsTemplate
      sectionName="resume"
      sectionDescription="Resume Search"
      detailSelection="resumeSearchDate"
      icon={<DocumentSearchRegular />}
    ></DetailsTemplate>
  );
};

export default ResumeSearchDetails;
