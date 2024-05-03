import {
  Button,
  Label,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import JobBoardDetails from "./DetailSections/JobBoardDetails";
import JOADetails from "./DetailSections/JOADetails";
import LinkedInPostDetails from "./DetailSections/LinkedInPostDetails";
import LinkedInSearchDetails from "./DetailSections/LinkedInSearchDetails";
import USAJobsDetails from "./DetailSections/USAJobs";
import ResumeSearchDetails from "./DetailSections/ResumeSearchDetails";
import { useMyRoles } from "api/rolesApi";
import { useClaimRequest } from "api/hrlApi";

declare const _spPageContextInfo: {
  userId: number;
};

const ViewRequestDetails = ({
  setEditSection,
  setIsEditOpen,
}: {
  setEditSection: (section: string) => void;
  setIsEditOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const { isHRL } = useMyRoles();
  const claimRequest = useClaimRequest();

  const restrictedStage = [
    "Draft",
    "Complete",
    "Cancelled",
    "Undefined",
  ].includes(request.data?.stage || "Undefined");

  const isHRLClaimable: boolean =
    (isHRL ?? false) && // Current user has HRL role
    !restrictedStage && // Current request is not in a restricted stage
    Number(request.data?.hrl?.Id) !== _spPageContextInfo.userId; // not already assigned to me

  return (
    <>
      <Title2>Request Details</Title2>
      <br />
      {request.isLoading && <div>Fetching data...</div>}
      <br />
      {request.data && (
        <>
          <article className="viewRequestDetails">
            <Label weight="semibold" htmlFor="requestor">
              Requestor
            </Label>
            <Text id="requestor">{request.data.Author?.Title}</Text>

            <Label weight="semibold" htmlFor="requestType">
              Request Type
            </Label>
            <Text id="requestType">{request.data.requestType}</Text>

            <Label weight="semibold" htmlFor="osf">
              OSF
            </Label>
            <Text id="osf">{request.data.osf}</Text>

            <Label weight="semibold" htmlFor="hrl">
              HRL
            </Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
              <Text id="hrl">{request.data.hrl?.Title || "Unassigned"}</Text>
              {isHRLClaimable && (
                <Button
                  onClick={() =>
                    claimRequest.mutate({ requestId: Number(request.data.Id) })
                  }
                  disabled={claimRequest.isLoading}
                  style={{ width: "fit-content" }}
                >
                  Self Assign
                </Button>
              )}
            </div>

            <Label weight="semibold" htmlFor="mcrRequired">
              MCR Required
            </Label>
            <Text id="mcrRequired">{request.data.mcrRequired}</Text>

            <Label weight="semibold" htmlFor="positionTitle">
              Position Title
            </Label>
            <Text id="positionTitle">{request.data.positionTitle}</Text>

            <Label weight="semibold" htmlFor="supervisory">
              Supervisory/Lead Position
            </Label>
            <Text id="supervisory">{request.data.supervisory}</Text>

            <Label weight="semibold" htmlFor="PSG">
              Pay System - Series - Grade
            </Label>
            <Text id="PSG">
              {request.data.paySystem}-{request.data.series}-
              {request.data.grade}
            </Text>

            <Label weight="semibold" htmlFor="officeSymbol">
              Office Symbol
            </Label>
            <Text id="officeSymbol">{request.data.officeSymbol}</Text>

            <Label weight="semibold" htmlFor="supervisor">
              Supervisor
            </Label>
            <Text id="supervisor">{request.data.supervisor?.Title}</Text>

            <Label weight="semibold" htmlFor="mpcn">
              MPCN
            </Label>
            <Text id="mpcn">{request.data.mpcn}</Text>

            <Label weight="semibold" htmlFor="cpcn">
              CPCN
            </Label>
            <Text id="cpcn">{request.data.cpcn}</Text>

            <Label weight="semibold" htmlFor="fms">
              FMS Position
            </Label>
            <Text id="fms">{request.data.fms}</Text>

            <Label weight="semibold" htmlFor="positionSensitivity">
              Position Sensitivity
            </Label>
            <Text id="positionSensitivity">
              {request.data.positionSensitivity}
            </Text>

            <Label weight="semibold" htmlFor="dutyLocation">
              Duty Location
            </Label>
            <Text id="dutyLocation">{request.data.dutyLocation}</Text>

            <Label weight="semibold" htmlFor="lastIncumbent">
              Last Incumbument
            </Label>
            <Text id="lastIncumbent">{request.data.lastIncumbent}</Text>
          </article>
          <br />
          <Title3>Announcement Method(s) and details</Title3>
          {request.data.methods.includes("lcmc") && (
            <JobBoardDetails
              setEditSection={setEditSection}
              setIsEditOpen={setIsEditOpen}
            />
          )}
          {request.data.methods.includes("joa") && (
            <JOADetails
              setEditSection={setEditSection}
              setIsEditOpen={setIsEditOpen}
            />
          )}
          {request.data.methods.includes("linkedinPost") && (
            <LinkedInPostDetails
              setEditSection={setEditSection}
              setIsEditOpen={setIsEditOpen}
            />
          )}
          {request.data.methods.includes("linkedinSearch") && (
            <LinkedInSearchDetails
              setEditSection={setEditSection}
              setIsEditOpen={setIsEditOpen}
            />
          )}
          {request.data.methods.includes("resumeSearch") && (
            <ResumeSearchDetails />
          )}
          {request.data.methods.includes("usaJobsFlyer") && (
            <USAJobsDetails
              setEditSection={setEditSection}
              setIsEditOpen={setIsEditOpen}
            />
          )}
        </>
      )}
      {request.isError && (
        <div>An error has occured: {(request.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestDetails;
