import { IEmailProperties } from "@pnp/sp/sputilities";
import { RPARequest } from "./requestsApi";
import { OSF } from "./osfApi";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

const emailTemplates = {
  createStageUpdateEmail: (
    request: {
      requestId: number;
      newStage: string;
      newSubStage: string;
      eventTitle: string;
    },
    requestData: RPARequest,
    OSFs: OSF[]
  ) => {
    let email: IEmailProperties | undefined;
    switch (request.newStage) {
      case "Draft":
        break;

      case "PackageReview":
        {
          switch (request.newSubStage) {
            case "OSFReview":
              email = {
                To: [
                  OSFs.find((osf) => osf.Title === requestData.osf)?.email ||
                    "",
                ],
                CC: [requestData.supervisor.EMail],
                Subject: `OSF Action: RPA ${requestData.positionTitle} is pending OSF review.`,
                Body: `This email has been generated to inform you that a Request for Personnel Action (RPA) for - ${requestData.positionTitle} - has been submitted and is pending the OSF review.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
              };
              break;

            default:
              break;
          }
        }
        break;

      default:
        break;
    }
    return email?.To ? email : undefined;
  },
  reviewStageChangesMade: (
    requestData: RPARequest,
    dirtyFields: string[],
    OSFs: OSF[]
  ) => {
    // Fields OSF cares about:
    const importantFields = new Map()
      .set("requestType", "Request Type")
      .set("supervisor", "Supervisor")
      .set("grade", "Grade")
      .set("mpcn", "MPCN")
      .set("positionSensitivity", "Position Sensitivity")
      .set("dutyLocation", "Duty Location")
      .set("salaryHigh", "Salaray (High)")
      .set("salaryLow", "Salary (Low)")
      .set("telework", "Telework")
      .set("remote", "Remote");

    let dirtyFieldText = "";
    dirtyFields.forEach((field) => {
      if (importantFields.has(field)) {
        dirtyFieldText += importantFields.get(field) + "\n";
      }
    });

    const email: IEmailProperties = {
      To: [OSFs.find((osf) => osf.Title === requestData.osf)?.email || ""],
      CC: [requestData.supervisor.EMail],
      Subject: `A change/edit has been made to the following RPA: ${requestData.positionTitle}`,
      Body: `This email has been generated to inform you that a change/edit has been made to the OSF approved RPA request: ${requestData.positionTitle}
      
      Edits have been made to the following fields:
      ${dirtyFieldText}
      To view this request, follow the below link:
      <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${requestData.Id}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${requestData.Id}</a>`,
    };

    return email?.To && dirtyFieldText ? email : undefined;
  },
};

export default emailTemplates;
