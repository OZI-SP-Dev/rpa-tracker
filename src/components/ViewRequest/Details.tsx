import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Label,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";
import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import ViewRequestLCMCDetails from "./Methods/LCMC";
import ViewRequestJOADetails from "./Methods/JOA";
import ViewRequestLIJobPostDetails from "./Methods/LinkedInJobPost";
import ViewRequestLISearchDetails from "./Methods/LinkedInSearch";
import ViewRequestJobsFlyerDetails from "./Methods/JobsFlyer";
import { useState } from "react";

const ViewRequestDetails = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const [openItems, setOpenItems] = useState<string[]>([]);
  const handleToggle: AccordionToggleEventHandler<string> = (_e, data) => {
    setOpenItems(data.openItems);
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
            <Text id="requestType">{request.data.requestType}</Text>

            <Label weight="semibold" htmlFor="osf">
              OSF
            </Label>
            <Text id="osf">{request.data.osf}</Text>

            <Label weight="semibold" htmlFor="orgApprover">
              Org Approver
            </Label>
            <Text id="orgApprover">{request.data.orgApprover?.Title}</Text>

            <Label weight="semibold" htmlFor="mcrRequired">
              MCR Required
            </Label>
            <Text id="mcrRequired">{request.data.mcrRequired}</Text>

            <Label weight="semibold" htmlFor="positionTitle">
              Position Title
            </Label>
            <Text id="positionTitle">{request.data.positionTitle}</Text>

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
          <Accordion
            openItems={openItems}
            onToggle={handleToggle}
            multiple
            collapsible
          >
            {request.data.methods.includes("lcmc") && (
              <AccordionItem value="lcmc">
                <AccordionHeader>LCMC Job Board</AccordionHeader>
                <AccordionPanel>
                  <ViewRequestLCMCDetails data={request.data} />
                </AccordionPanel>
              </AccordionItem>
            )}
            {request.data.methods.includes("joa") && (
              <AccordionItem value="joa">
                <AccordionHeader>JOA</AccordionHeader>
                <AccordionPanel>
                  <ViewRequestJOADetails data={request.data} />
                </AccordionPanel>
              </AccordionItem>
            )}

            {request.data.methods.includes("linkedinPost") && (
              <AccordionItem value="linkedinPost">
                <AccordionHeader>LinkedIn Job Posting</AccordionHeader>
                <AccordionPanel>
                  <ViewRequestLIJobPostDetails data={request.data} />
                </AccordionPanel>
              </AccordionItem>
            )}

            {request.data.methods.includes("linkedinSearch") && (
              <AccordionItem value="linkedinSearch">
                <AccordionHeader>LinkedIn Profile Search</AccordionHeader>
                <AccordionPanel>
                  <ViewRequestLISearchDetails data={request.data} />
                </AccordionPanel>
              </AccordionItem>
            )}

            {request.data.methods.includes("resumeSearch") && (
              <AccordionItem value="resumeSearch">
                <AccordionHeader>Resume Search</AccordionHeader>
                <AccordionPanel>
                  <Text>Resume Search Selected</Text>
                </AccordionPanel>
              </AccordionItem>
            )}

            {request.data.methods.includes("usaJobsFlyer") && (
              <AccordionItem value="usaJobsFlyer">
                <AccordionHeader>USA Jobs Flyer</AccordionHeader>
                <AccordionPanel>
                  <ViewRequestJobsFlyerDetails data={request.data} />
                </AccordionPanel>
              </AccordionItem>
            )}
          </Accordion>
        </>
      )}
      {request.isError && (
        <div>An error has occured: {(request.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestDetails;
