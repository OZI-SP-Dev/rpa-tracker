import { IEmailProperties } from "@pnp/sp/sputilities";
import { RPARequest } from "./requestsApi";
import { OSF } from "./osfApi";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

const emailTemplates = {
  createStageUpdateEmail: (
    request: {
      requestId: number;
      newStage: string;
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
        email = {
          To: [OSFs.find((osf) => osf.Title === requestData.osf)?.email || ""],
          Subject: `OSF Action: RPA ${requestData.positionTitle} is pending OSF review.`,
          Body: `This email has been generated to inform you that a Request for Personnel Action (RPA) for - ${requestData.positionTitle} - has been submitted and is pending the OSF review.

          To action this request, follow the below link:
          <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}">${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}</a>`,
        };
        break;

      default:
        break;
    }
    return email?.To ? email : undefined;
  },
};

export default emailTemplates;
