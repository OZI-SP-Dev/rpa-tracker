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
          Subject: "An RPA Request has been updated and requires your review",
          Body: `RPA Request # ${request.requestId} has been assigned to you for initial approval.
          
          Link to request: ${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/Request/${request.requestId}`,
        };
        break;

      default:
        break;
    }
    return email?.To ? email : undefined;
  },
};

export default emailTemplates;
