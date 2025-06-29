import {
  Button,
  Label,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import JobBoardDetails from "components/ViewRequest/DetailSections/JobBoardDetails";
import JOADetails from "components/ViewRequest/DetailSections/JOADetails";
import LinkedInPostDetails from "components/ViewRequest/DetailSections/LinkedInPostDetails";
import LinkedInSearchDetails from "components/ViewRequest/DetailSections/LinkedInSearchDetails";
import USAJobsDetails from "components/ViewRequest/DetailSections/USAJobs";
import ResumeSearchDetails from "components/ViewRequest/DetailSections/ResumeSearchDetails";
import { useMyRoles } from "api/rolesApi";
import { useClaimRequest } from "api/hrlApi";
import HiringPanel from "components/ViewRequest/HiringPanel";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import { usePostRequest } from "api/postRequestApi";
import { DCWFCodes } from "consts/DCWF";

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
  const { isHRL, isCOSF } = useMyRoles();
  const claimRequest = useClaimRequest();
  const postRequest = usePostRequest();

  const restrictedStage = [
    "Draft",
    "Complete",
    "Cancelled",
    "Undefined",
  ].includes(request.data?.stage || "Undefined");

  const areAnnounceMethodsAddable =
    (isHRL || isCOSF) &&
    (request.data?.stage == "PackageReview" ||
      request.data?.stage == "Recruiting");

  const isHRLClaimable: boolean =
    (isHRL ?? false) && // Current user has HRL role
    !restrictedStage && // Current request is not in a restricted stage
    Number(request.data?.hrl?.Id) !== _spPageContextInfo.userId; // not already assigned to me

  const addOnClick = (method: string) => {
    if (request.data?.Id) {
      postRequest.mutate({
        requestId: Number(request.data.Id),
        postRequest: {
          methods: JSON.stringify(request.data.methods.concat([method])),
        },
      });
      if (method !== "resumeSearch") {
        setEditSection("add" + method);
        setIsEditOpen(true);
      }
    }
  };

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
            <Text id="requestType">
              {request.data.requestType !== "Other"
                ? request.data.requestType
                : `Other - ${request.data.requestTypeOther}`}
            </Text>

            <HiringPanel />

            {request.data.currentEmployee && (
              <>
                <Label weight="semibold" htmlFor="currentEmployee">
                  Current Federal Employee
                </Label>
                <Text id="currentEmployee">{request.data.currentEmployee}</Text>
              </>
            )}

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

            <Label weight="semibold" htmlFor="sprd">
              SPRD Number
            </Label>
            <Text id="sprd">{request.data.sprd}</Text>

            <fieldset style={{ gridColumn: "1 / 3" }}>
              <legend>
                <strong>Defense Cyber Work Force (DCWF)</strong>
              </legend>
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
                      {request.data.dcwf?.length === 1
                        ? request.data.dcwf +
                            " " +
                            DCWFCodes.find(
                              ({ Code }) =>
                                Code === (request.data.dcwf[0] ?? "")
                            )?.Role ?? ""
                        : ""}
                    </td>
                    <td>{request.data.dcwfLevel}</td>
                  </tr>
                  <tr>
                    <td>
                      {request.data.dcwf2?.length === 1
                        ? request.data.dcwf2 +
                            " " +
                            DCWFCodes.find(
                              ({ Code }) =>
                                Code === (request.data.dcwf2[0] ?? "")
                            )?.Role ?? ""
                        : ""}
                    </td>
                    <td>{request.data.dcwf2Level}</td>
                  </tr>
                  <tr>
                    <td>
                      {request.data.dcwf3?.length === 1
                        ? request.data.dcwf3 +
                            " " +
                            DCWFCodes.find(
                              ({ Code }) =>
                                Code === (request.data.dcwf3[0] ?? "")
                            )?.Role ?? ""
                        : ""}
                    </td>
                    <td>{request.data.dcwf3Level}</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

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

            <Label weight="semibold" htmlFor="telework">
              Telework Possible
            </Label>
            <Text id="telework">{request.data.telework}</Text>

            <Label weight="semibold" htmlFor="remote">
              Remote Work Possible
            </Label>
            <Text id="remote">{request.data.remote}</Text>

            <Label weight="semibold" htmlFor="lastIncumbent">
              Last Incumbent
            </Label>
            <Text id="lastIncumbent">{request.data.lastIncumbent}</Text>
          </article>
          <br />
          <Title3>Announcement Method(s) and details</Title3>
          {areAnnounceMethodsAddable && (
            <>
              <br />
              {!request.data.methods.includes("lcmc") && (
                <Button icon={<EditIcon />} onClick={() => addOnClick("lcmc")}>
                  Add to LCMC Job Announcement Board
                </Button>
              )}
              {!request.data.methods.includes("joa") && (
                <Button icon={<EditIcon />} onClick={() => addOnClick("joa")}>
                  Add Job Opportunity Announcement (JOA)
                </Button>
              )}
              {!request.data.methods.includes("linkedinPost") && (
                <Button
                  icon={<EditIcon />}
                  onClick={() => addOnClick("linkedinPost")}
                >
                  Add LinkedIn Job Posting
                </Button>
              )}
              {!request.data.methods.includes("linkedinSearch") && (
                <Button
                  icon={<EditIcon />}
                  onClick={() => addOnClick("linkedinSearch")}
                >
                  Add LinkedIn Profile Search
                </Button>
              )}
              {!request.data.methods.includes("resumeSearch") && (
                <Button
                  icon={<EditIcon />}
                  onClick={() => addOnClick("resumeSearch")}
                >
                  Add COS Resume Repository Search
                </Button>
              )}
              {!request.data.methods.includes("usaJobsFlyer") && (
                <Button
                  icon={<EditIcon />}
                  onClick={() => addOnClick("usaJobsFlyer")}
                >
                  Add USA Jobs Flyer
                </Button>
              )}
            </>
          )}
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
