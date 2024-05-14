import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
import { DCWFCodes } from "consts/DCWF";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ViewRequestLIJobPostDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="linkedInPostId">
        Posting ID
      </Label>
      <UpdatePostId detailSelection="linkedInPostId" />

      <Label weight="semibold" htmlFor="temporary">
        Type of Appointment
      </Label>
      <Text id="temporary">{props.data.temporary}</Text>

      <Label weight="semibold" htmlFor="LIsalary">
        Salary Range
      </Label>
      <Text id="LIsalary">
        ${props.data.salaryLow} to ${props.data.salaryHigh}
      </Text>

      <Label weight="semibold" htmlFor="incentives">
        Incentives
      </Label>
      <Text id="incentives">{props.data.incentives}</Text>

      <Label weight="semibold" htmlFor="LItelework">
        Telework Possible
      </Label>
      <Text id="LItelework">{props.data.telework}</Text>

      <Label weight="semibold" htmlFor="linkedinPositionSummary">
        Position Summary
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="linkedinPositionSummary">
        {props.data.linkedinPositionSummary}
      </Text>

      <Label weight="semibold" htmlFor="linkedinQualifications">
        Qualifications
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="linkedinQualifications">
        {props.data.linkedinQualifications?.map((qual) => qual + "\n")}
      </Text>

      <Label weight="semibold" htmlFor="dcwf">
        Certifications/Licensure
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="dcwf">
        {props.data.dcwf?.map((cert) => {
          const found = DCWFCodes.find((element) => element.Code === cert);
          return cert + " " + found?.Role + "\n";
        })}
      </Text>

      <Label weight="semibold" htmlFor="linkedinKSAs">
        KSA's
      </Label>
      <Text style={{ whiteSpace: "pre-wrap" }} id="linkedinKSAs">
        {props.data.linkedinKSAs}
      </Text>
    </section>
  );
};

export default ViewRequestLIJobPostDetails;
