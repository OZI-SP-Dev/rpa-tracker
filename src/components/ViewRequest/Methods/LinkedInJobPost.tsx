import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
// import { DCWFCodes } from "consts/DCWF";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";
import { DCWFCodes } from "consts/DCWF";

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

      <fieldset style={{ gridColumn: "1 / 3" }}>
        <legend>Defense Cyber Work Force (DCWF)</legend>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Proficiency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {props.data.dcwf +
                  " " +
                  DCWFCodes.find(
                    ({ Code }) => Code === (props.data.dcwf[0] ?? "")
                  )?.Role ?? ""}
              </td>
              <td>{props.data.dcwfLevel}</td>
            </tr>
            <tr>
              <td>
                {props.data.dcwf2 +
                  " " +
                  DCWFCodes.find(
                    ({ Code }) => Code === (props.data.dcwf2[0] ?? "")
                  )?.Role ?? ""}
              </td>
              <td>{props.data.dcwf2Level}</td>
            </tr>
            <tr>
              <td>
                {props.data.dcwf3 +
                  " " +
                  DCWFCodes.find(
                    ({ Code }) => Code === (props.data.dcwf3[0] ?? "")
                  )?.Role ?? ""}
              </td>
              <td>{props.data.dcwf3Level}</td>
            </tr>
          </tbody>
        </table>
      </fieldset>

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
