import { IEmailProperties } from "@pnp/sp/sputilities";
import { RPARequest } from "api/requestsApi";
import { OSF } from "api/osfApi";
import { SPRole } from "api/rolesApi";

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
    OSFs: OSF[],
    allRoles: SPRole[]
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

            case "HRLReview":
              email = {
                To: [
                  requestData.hrl?.EMail ||
                    OSFs.find((osf) => osf.Title === requestData.osf)
                      ?.defaultHRLEmail ||
                    "",
                ],
                CC: [requestData.supervisor.EMail],
                Subject: `HRL/COSF Action: RPA ${requestData.positionTitle} is pending HRL/COSF review.`,
                Body: `This email has been generated to inform you that a Request for Personnel Action (RPA) for - ${requestData.positionTitle} - has been submitted and is pending the HRL/COSF review.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
              };

              if (requestData.methods.includes("lcmc")) {
                const COSF = allRoles.filter((role) => role.Title === "COSF");
                COSF?.forEach((sprole) => {
                  email?.To.push(sprole.user.EMail);
                });
              }
              break;

            default:
              break;
          }
        }
        break;

      case "PackageApproval":
        switch (request.newSubStage) {
          case "SelectionPackageOSFApproval":
            email = {
              To: [
                OSFs.find((osf) => osf.Title === requestData.osf)?.email || "",
              ],
              CC: [requestData.supervisor.EMail],
              Subject: `OSF Action: An incentive package for RPA ${requestData.positionTitle} is ready for OSF review/approval.`,
              Body: `This email is to inform you that an incentive package Request for Personnel Action (RPA) ${requestData.positionTitle} is pending OSF approval.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
            };
            break;

          case "SelectionPackageCSFApproval":
            const CSFEmails: string[] = [];
            allRoles.forEach((role) => {
              if (role.Title === "CSF") {
                CSFEmails.push(role.user.EMail);
              }
            });
            email = {
              To: CSFEmails,
              CC: [requestData.supervisor.EMail],
              Subject: `CSF Action: An incentive package for RPA ${requestData.positionTitle} is ready for CSF review/approval.`,
              Body: `This email is to inform you that an incentive package Request for Personnel Action (RPA) ${requestData.positionTitle} is pending CSF approval.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
            };
            break;

          case "SelectionPackageHQApproval":
            const HQTOEmails: string[] = [];
            allRoles.forEach((role) => {
              if (role.Title === "HQ") {
                HQTOEmails.push(role.user.EMail);
              }
            });
            email = {
              To: HQTOEmails,
              CC: [requestData.supervisor.EMail],
              Subject: `HQ Action: An incentive package for RPA ${requestData.positionTitle} is ready for HQ review/approval.`,
              Body: `This email is to inform you that an incentive package Request for Personnel Action (RPA) ${requestData.positionTitle} is pending HQ approval.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
            };
            break;

          case "SelectionPackageCAApproval":
            const CACCEmails: string[] = [requestData.supervisor.EMail];
            allRoles.forEach((role) => {
              if (role.Title === "COS HR Supervisor") {
                CACCEmails.push(role.user.EMail);
              }
            });
            email = {
              To: [
                requestData.hrl?.EMail ||
                  OSFs.find((osf) => osf.Title === requestData.osf)
                    ?.defaultHRLEmail ||
                  "",
              ],
              CC: CACCEmails,
              Subject: `CA Action: An incentive package for RPA ${requestData.positionTitle} is ready for CA review/approval.`,
              Body: `This email is to inform you that an incentive package Request for Personnel Action (RPA) ${requestData.positionTitle} is pending CA approval.

              To action this request, follow the below link:
              <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
            };
            break;
        }
        break;

      default:
        break;
    }
    return email?.To ? email : undefined;
  },
  reviewStageChangesMade: (
    requestData: RPARequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dirtyFields: any,
    OSFs: OSF[]
  ) => {
    // Fields OSF cares about:
    const importantFields = new Map<keyof RPARequest, string>()
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

    importantFields.forEach((value, key) => {
      dirtyFieldText += dirtyFields[key] ? value + "\n" : "";
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
