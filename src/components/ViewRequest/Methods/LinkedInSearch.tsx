import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ViewRequestLISearchDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="linkedInSearchId">
        Posting ID
      </Label>
      <UpdatePostId detailSelection="linkedInSearchId" />

      <Label weight="semibold" htmlFor="linkedinSearchTitles">
        Job Titles
      </Label>
      <Text id="linkedinSearchTitles">
        {props.data.linkedinSearchTitle1} {props.data.linkedinSearchTitle2}{" "}
        {props.data.linkedinSearchTitle3} {props.data.linkedinSearchTitle4}
      </Text>

      <Label weight="semibold" htmlFor="linkedinSearchSkills">
        Skills
      </Label>
      <Text id="linkedinSearchSkills">
        {props.data.linkedinSearchSkill1} {props.data.linkedinSearchSkill2}{" "}
        {props.data.linkedinSearchSkill3} {props.data.linkedinSearchSkill4}
      </Text>

      <Label weight="semibold" htmlFor="linkedinSearchEmployers">
        Employers
      </Label>
      <Text id="linkedinSearchEmployers">
        {props.data.linkedinSearchEmployer1}{" "}
        {props.data.linkedinSearchEmployer2}{" "}
        {props.data.linkedinSearchEmployer3}{" "}
        {props.data.linkedinSearchEmployer4}
      </Text>

      <Label weight="semibold" htmlFor="linkedinSearchStudies">
        Academic Fields
      </Label>
      <Text id="linkedinSearchStudies">
        {props.data.linkedinSearchStudy1} {props.data.linkedinSearchStudy2}{" "}
        {props.data.linkedinSearchStudy3} {props.data.linkedinSearchStudy4}
      </Text>

      <Label weight="semibold" htmlFor="linkedinSearchKeywords">
        Keywords
      </Label>
      <Text id="linkedinSearchKeywords">
        {props.data.linkedinSearchKeyword1} {props.data.linkedinSearchKeyword2}{" "}
        {props.data.linkedinSearchKeyword3} {props.data.linkedinSearchKeyword4}
      </Text>

      <Label weight="semibold" htmlFor="linkedinSearchComments">
        Additional Comments/Info
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="linkedinSearchComments">
        {props.data.linkedinSearchComments}
      </Text>
    </section>
  );
};

export default ViewRequestLISearchDetails;
