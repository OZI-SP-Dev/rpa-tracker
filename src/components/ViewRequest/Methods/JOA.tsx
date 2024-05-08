import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ViewRequestJOADetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="joaPostId">
        Posting ID
      </Label>
      <div>
        <Text id="joaPostId">{props.data.joaPostId}</Text>
        <UpdatePostId detailSelection="joaPostId" />
      </div>

      <Label weight="semibold" htmlFor="closeDateJOA">
        Close Date
      </Label>
      <Text id="closeDateJOA">{props.data.closeDateJOA?.toDateString()}</Text>

      <Label weight="semibold" htmlFor="organizationalPOC">
        Organizational POC
      </Label>
      <Text id="organizationalPOC">{props.data.organizationalPOC?.Title}</Text>

      <Label weight="semibold" htmlFor="issueTo">
        Issue Certificate To
      </Label>
      <Text id="issueTo">{props.data.issueTo?.Title}</Text>

      <Label weight="semibold" htmlFor="fullPartTime">
        Full/Part Time
      </Label>
      <Text id="fullPartTime">{props.data.fullPartTime}</Text>

      <Label weight="semibold" htmlFor="salary">
        Salary Range
      </Label>
      <Text id="salary">
        ${props.data.salaryLow} to ${props.data.salaryHigh}
      </Text>

      <Label weight="semibold" htmlFor="telework">
        Telework Possible
      </Label>
      <Text id="telework">{props.data.telework}</Text>

      <Label weight="semibold" htmlFor="remote">
        Remote Work Possible
      </Label>
      <Text id="remote">{props.data.remote}</Text>

      <Label weight="semibold" htmlFor="pcs">
        PCS Eligible
      </Label>
      <Text id="pcs">{props.data.pcs}</Text>

      <Label weight="semibold" htmlFor="joaQualifications">
        Qualifications/Requirements
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="joaQualifications">
        {props.data.joaQualifications}
      </Text>

      <Label weight="semibold" htmlFor="joaIdealCandidate">
        Ideal Candidate
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="joaIdealCandidate">
        {props.data.joaIdealCandidate}
      </Text>
    </section>
  );
};

export default ViewRequestJOADetails;
