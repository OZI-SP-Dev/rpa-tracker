import { Button, Divider, Text, Title2 } from "@fluentui/react-components";
import { validateRequest } from "api/requestsApi";
import { useFormContext } from "react-hook-form";

const Done = ({ gotoStep }: { gotoStep: (step: string) => void }) => {
  const form = useFormContext();

  const values = form.getValues();

  const { HiringInfo, JobBoard, JOA, LinkedInPost, USAJobs } =
    validateRequest(values);

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
