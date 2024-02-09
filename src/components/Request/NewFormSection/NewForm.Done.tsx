import { Button, Divider, Text, Title2 } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

const Done = ({ gotoStep }: { gotoStep: (step: string) => void }) => {
  const form = useFormContext();

  const values = form.getValues();
  console.log("Values:", values);

  const HiringInfo =
    values.advertisementLength === "" || values.methods.length === 0;

  const JobBoard: boolean =
    values.methods.includes("lcmc") && values.closeDateLCMC === undefined;

  const JOA: boolean =
    values.methods.includes("joa") &&
    (!values.closeDateJOA ||
      !values.organizationalPOC ||
      !values.issueTo ||
      !values.fullPartTime ||
      !values.salaryLow ||
      !values.salaryHigh ||
      !values.telework ||
      !values.remote ||
      !values.pcs ||
      !values.joaQualifications ||
      !values.joaIdealCandidate);

  const LinkedInPost: boolean =
    values.methods.includes("linkedinPost") &&
    (!values.temporary ||
      !values.salaryLow ||
      !values.salaryHigh ||
      !(values.temporary === "Full" ? true : values.nte) ||
      !values.incentives ||
      !values.telework ||
      !values.linkedinPositionSummary ||
      !values.dcwf ||
      !values.linkedinKSAs);

  const USAJobs: boolean =
    values.methods.includes("usaJobsFlyer") &&
    values.closeDateUsaJobsFlyer === undefined;

  return (
    <>
      <Divider inset>
        <Title2 align="center">Form complete</Title2>
      </Divider>
      <ul>
        <li>
          <Text>How/when to navigate from here to view page?</Text>
        </li>
        <li>
          <Text>Check/display if form hasn't been saved</Text>
        </li>
        <li>
          <Text>Check if any errors (below) and display as bulleted list</Text>
        </li>
      </ul>
      {HiringInfo && (
        <Button appearance="transparent" onClick={() => gotoStep("HiringInfo")}>
          Hiring Info is incomplete.
        </Button>
      )}
      {JobBoard && (
        <Button appearance="transparent" onClick={() => gotoStep("JobBoard")}>
          LCMC Job Board Information is incomplete.
        </Button>
      )}
      {JOA && (
        <Button appearance="transparent" onClick={() => gotoStep("JOA")}>
          JOA Additional Information is incomplete.
        </Button>
      )}
      {LinkedInPost && (
        <Button
          appearance="transparent"
          onClick={() => gotoStep("LinkedInPost")}
        >
          LinkedIn Job Posting Additional Information is incomplete.
        </Button>
      )}
      {USAJobs && (
        <Button appearance="transparent" onClick={() => gotoStep("USAJobs")}>
          USA Jobs Flyer Additional Information is incomplete.
        </Button>
      )}
    </>
  );
};

export default Done;
