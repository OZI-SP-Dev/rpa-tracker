import { RPARequest } from "api/requestsApi";

interface STARTSTAGE {
  key: string;
  text: string;
  next: (request?: RPARequest) => string;
  nextEventTitle: (request?: RPARequest) => string;
  readyForNext: (request?: RPARequest) => boolean;
  previous: undefined;
  previousEventTitle: undefined;
  subStages?: ReadonlyArray<STAGE>;
  showStage: (request?: RPARequest) => boolean;
}

interface MIDSTAGE {
  key: string;
  text: string;
  next: (request?: RPARequest) => string | undefined;
  nextEventTitle: (request?: RPARequest) => string | undefined;
  readyForNext: (request?: RPARequest) => boolean;
  previous: string;
  previousEventTitle: string;
  subStages?: ReadonlyArray<STAGE>;
  showStage: (request?: RPARequest) => boolean;
}

interface ENDSTAGE {
  key: string;
  text: string;
  next: undefined;
  nextEventTitle: undefined;
  readyForNext: (request?: RPARequest) => true;
  previous: string | undefined;
  previousEventTitle: string | undefined;
  subStages?: ReadonlyArray<STAGE>;
  showStage: (request?: RPARequest) => boolean;
}

type STAGE = STARTSTAGE | MIDSTAGE | ENDSTAGE;

export const STAGES: ReadonlyArray<STAGE> = [
  {
    key: "Draft",
    text: "RPA Request",
    next: () => "PackageReview",
    nextEventTitle: () => "Forward Stage Change: RPA Request to Package Review",
    readyForNext: () => true,
    previous: undefined,
    previousEventTitle: undefined,
    showStage: () => true,
  },
  {
    key: "PackageReview",
    text: "Package Review/Concurrence",
    next: () => "Recruiting",
    nextEventTitle: () => "Forward Stage Change: Package Review to Recruiting",
    readyForNext: (request) => {
      //find current stage
      const currentStage = STAGES.find(({ key }) => key === request?.stage);
      //find subStage and run it's check - if subStage not found block the move
      console.log(
        currentStage?.subStages
          ?.find(({ key }) => key === request?.subStage)
          ?.readyForNext(request)
      );
      return (
        currentStage?.subStages
          ?.find(({ key }) => key === request?.subStage)
          ?.readyForNext(request) || false
      );
    },
    previous: "Draft",
    previousEventTitle: "Backward Stage Change: Package Review to RPA Request",
    subStages: [
      {
        key: "OSFReview",
        text: "OSF Review",
        next: () => "HRLReview",
        nextEventTitle: () =>
          "Forward Stage Change: OSF Review to HRL/COSF Review",
        readyForNext: () => true,
        previous: undefined,
        previousEventTitle: undefined,
        showStage: () => true,
      },
      {
        key: "HRLReview",
        text: "HRL/COSF Review",
        next: undefined,
        nextEventTitle: undefined,
        readyForNext: (request) => {
          let ready = true;
          if (request) {
            request.methods.forEach((method) => {
              switch (method) {
                case "joa": {
                  if (!request.joaPostDate) {
                    ready = false;
                  }
                  break;
                }
                case "linkedinPost": {
                  if (!request.linkedInPostDate) {
                    ready = false;
                  }
                  break;
                }
                case "linkedinSearch": {
                  if (!request.linkedInSearchDate) {
                    ready = false;
                  }
                  break;
                }
                case "resumeSearch": {
                  if (!request.resumeSearchDate) {
                    ready = false;
                  }
                  break;
                }
                case "usaJobsFlyer": {
                  if (!request.usaJobsPostDate) {
                    ready = false;
                  }
                  break;
                }
                case "lcmc": {
                  if (!request.jobBoardPostDate) {
                    ready = false;
                  }
                  break;
                }
              }
            });
          }
          return ready;
        },
        previous: "OSFReview",
        previousEventTitle:
          "Backward Stage Change: HRL/COSF Review to OSF Review",
        showStage: () => true,
      },
    ],
    showStage: () => true,
  },
  {
    key: "Recruiting",
    text: "Recruiting",
    next: () => "Selection",
    nextEventTitle: () =>
      "Forward Stage Change: Recruiting to Candidate Selection",
    readyForNext: () => true,
    previous: "PackageReview",
    previousEventTitle: "Backward Stage Change: Recruiting to Package Review",
    showStage: () => true,
  },
  {
    key: "Selection",
    text: "Candidate Selection",
    next: () => "PackageApproval",
    nextEventTitle: () =>
      "Forward Stage Change: Candidate Selection to Package Approval",
    readyForNext: () => true,
    previous: "Recruiting",
    previousEventTitle:
      "Backward Stage Change: Candidate Selection to Recruiting",
    showStage: () => true,
  },
  {
    key: "PackageApproval",
    text: "Package Prep & Approval",
    next: () => "Complete",
    nextEventTitle: () => "Forward Stage Change: Package Approval to Complete",
    readyForNext: (request) => {
      //find current stage
      const currentStage = STAGES.find(({ key }) => key === request?.stage);
      //find subStage and run it's check - if subStage not found allow to move forward
      return (
        currentStage?.subStages
          ?.find(({ key }) => key === request?.subStage)
          ?.readyForNext(request) || true
      );
    },
    previous: "Selection",
    previousEventTitle:
      "Backward Stage Change: Package Approval to Candidate Selection",
    subStages: [
      {
        key: "DraftPackageHRL",
        text: "Draft Package (HRL)",
        next: () => "SelectionPackageOSFApproval",
        nextEventTitle: () =>
          "Forward Stage Change: Draft Package (HRL) to OSF Approval",
        readyForNext: () => true,
        previous: undefined,
        previousEventTitle: undefined,
        showStage: () => true,
      },
      {
        key: "SelectionPackageOSFApproval",
        text: "OSF Approval",
        next: (request) => {
          if (request?.csfcaApproval === "Yes") {
            return "SelectionPackageCSFApproval";
          } else {
            return STAGES.find(({ key }) => key === "PackageApproval")
              ?.subStages?.find(
                ({ key }) => key === "SelectionPackageCSFApproval"
              )
              ?.next?.(request);
          }
        },
        nextEventTitle: (request) => {
          const next = STAGES.find(({ key }) => key === "PackageApproval")
            ?.subStages?.find(
              ({ key }) => key === "SelectionPackageOSFApproval"
            )
            ?.next?.(request);
          return `Forward Stage Change: OSF Approval to ${next}`;
        },
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: OSF Approval to Draft Package (HRL)",
        showStage: () => true,
      },
      {
        key: "SelectionPackageCSFApproval",
        text: "CSF Approval",
        next: (request) => {
          if (request?.hqApproval === "Yes") {
            return "SelectionPackageHQApproval";
          } else {
            return STAGES.find(({ key }) => key === "PackageApproval")
              ?.subStages?.find(
                ({ key }) => key === "SelectionPackageHQApproval"
              )
              ?.next?.(request);
          }
        },
        nextEventTitle: (request) => {
          const next = STAGES.find(({ key }) => key === "PackageApproval")
            ?.subStages?.find(
              ({ key }) => key === "SelectionPackageCSFApproval"
            )
            ?.next?.(request);
          return `Forward Stage Change: CSF Approval to ${next}`;
        },
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: CSF Approval to Draft Package (HRL)",
        showStage: (request) => request?.csfcaApproval === "Yes",
      },
      {
        key: "SelectionPackageHQApproval",
        text: "HQ Approval",
        next: (request) => {
          if (request?.csfcaApproval === "Yes") {
            return "SelectionPackageCAApproval";
          } else {
            return STAGES.find(({ key }) => key === "PackageApproval")
              ?.subStages?.find(
                ({ key }) => key === "SelectionPackageCAApproval"
              )
              ?.next?.(request);
          }
        },
        nextEventTitle: (request) => {
          const next = STAGES.find(({ key }) => key === "PackageApproval")
            ?.subStages?.find(({ key }) => key === "SelectionPackageHQApproval")
            ?.next?.(request);
          return `Forward Stage Change: HQ Approval to ${next}`;
        },
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: HQ Approval to Draft Package (HRL)",
        showStage: (request) => request?.hqApproval === "Yes",
      },
      {
        key: "SelectionPackageCAApproval",
        text: "CA Approval",
        next: (request) => {
          if (request?.titleV === "Yes") {
            return "TitleV";
          } else {
            return STAGES.find(({ key }) => key === "PackageApproval")
              ?.subStages?.find(({ key }) => key === "TitleV")
              ?.next?.(request);
          }
        },
        nextEventTitle: (request) => {
          const next = STAGES.find(({ key }) => key === "PackageApproval")
            ?.subStages?.find(({ key }) => key === "SelectionPackageCAApproval")
            ?.next?.(request);
          return `Forward Stage Change: CA Approval to ${next}`;
        },
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: CA Approval to Draft Package (HRL)",
        showStage: (request) => request?.csfcaApproval === "Yes",
      },

      {
        key: "TitleV",
        text: "Title V",
        next: undefined,
        nextEventTitle: undefined,
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: Title V to Draft Package (HRL)",
        showStage: (request) => request?.titleV === "Yes",
      },
    ],
    showStage: () => true,
  },
  {
    key: "Complete",
    text: "Complete",
    next: undefined,
    nextEventTitle: undefined,
    readyForNext: () => true,
    previous: undefined,
    previousEventTitle: undefined,
    showStage: () => true,
  },
] as const;
