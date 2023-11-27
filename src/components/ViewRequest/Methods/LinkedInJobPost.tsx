import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";

const ViewRequestLIJobPostDetails = (props: { data: RPARequest }) => {
  return (
    <section>
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
      <Text id="linkedinPositionSummary">
        {props.data.linkedinPositionSummary}
      </Text>

      <Label weight="semibold" htmlFor="linkedinQualifications">
        Qualifications
      </Label>
      <Text id="linkedinQualifications">
        {props.data.linkedinQualifications}
      </Text>

      <Label weight="semibold" htmlFor="dcwf">
        Certifications/Licensure
      </Label>
      <Text id="dcwf">{props.data.dcwf}</Text>

      <Label weight="semibold" htmlFor="linkedinKSAs">
        KSA's
      </Label>
      <Text id="linkedinKSAs">{props.data.linkedinKSAs}</Text>
    </section>
  );
};

export default ViewRequestLIJobPostDetails;
