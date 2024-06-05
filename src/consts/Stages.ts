import { RPARequest } from "api/requestsApi";

interface STARTSTAGE {
  key: string;
  text: string;
  next: string;
  nextEventTitle: string;
  readyForNext: (request: RPARequest | undefined) => boolean;
  previous: undefined;
  previousEventTitle: undefined;
  subStages?: ReadonlyArray<STAGE>;
}

interface MIDSTAGE {
  key: string;
  text: string;
  next: string;
  nextEventTitle: string;
  readyForNext: (request: RPARequest | undefined) => boolean;
  previous: string;
  previousEventTitle: string;
  subStages?: ReadonlyArray<STAGE>;
}

interface ENDSTAGE {
  key: string;
  text: string;
  next: undefined;
  nextEventTitle: undefined;
  readyForNext: (request: RPARequest | undefined) => true;
  previous: string | undefined;
  previousEventTitle: string | undefined;
  subStages?: ReadonlyArray<STAGE>;
}

type STAGE = STARTSTAGE | MIDSTAGE | ENDSTAGE;

export const STAGES: ReadonlyArray<STAGE> = [
  {
    key: "Draft",
    text: "RPA Request",
    next: "PackageReview",
    nextEventTitle: "Forward Stage Change: RPA Request to Package Review",
    readyForNext: () => true,
    previous: undefined,
    previousEventTitle: undefined,
  },
  {
    key: "PackageReview",
    text: "Package Review/Concurrence",
    next: "Recruiting",
    nextEventTitle: "Forward Stage Change: Package Review to Recruiting",
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
        next: "HRLReview",
        nextEventTitle: "Forward Stage Change: OSF Review to HRL/COSF Review",
        readyForNext: () => true,
        previous: undefined,
        previousEventTitle: undefined,
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
      },
    ],
  },
  {
    key: "Recruiting",
    text: "Recruiting",
    next: "Selection",
    nextEventTitle: "Forward Stage Change: Recruiting to Candidate Selection",
    readyForNext: () => true,
    previous: "PackageReview",
    previousEventTitle: "Backward Stage Change: Recruiting to Package Review",
  },
  {
    key: "Selection",
    text: "Candidate Selection",
    next: "PackageApproval",
    nextEventTitle:
      "Forward Stage Change: Candidate Selection to Package Approval",
    readyForNext: () => true,
    previous: "Recruiting",
    previousEventTitle:
      "Backward Stage Change: Candidate Selection to Recruiting",
  },
  {
    key: "PackageApproval",
    text: "Package Prep & Approval",
    next: "Complete",
    nextEventTitle: "Forward Stage Change: Package Approval to Complete",
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
        next: "SelectionPackageOSFApproval",
        nextEventTitle:
          "Forward Stage Change: Draft Package (HRL) to OSF Approval",
        readyForNext: () => true,
        previous: undefined,
        previousEventTitle: undefined,
      },
      {
        key: "SelectionPackageOSFApproval",
        text: "OSF Approval",
        next: "PackageApproval",
        nextEventTitle:
          "Forward Stage Change: OSF Approval to Package Approval",
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: OSF Approval to Draft Package (HRL)",
      },
      {
        key: "PackageApproval",
        text: "Package Approval",
        next: "TitleV",
        nextEventTitle: "Forward Stage Change: Package Approval to Title V",
        readyForNext: () => true,
        previous: "DraftPackageHRL",
        previousEventTitle:
          "Backward Stage Change: Package Approval to OSF Approval",
      },
      {
        key: "TitleV",
        text: "Title V",
        next: undefined,
        nextEventTitle: undefined,
        readyForNext: () => true,
        previous: "PackageApproval",
        previousEventTitle:
          "Backward Stage Change: Title V to Package Approval",
      },
    ],
  },
  {
    key: "Complete",
    text: "Complete",
    next: undefined,
    nextEventTitle: undefined,
    readyForNext: () => true,
    previous: undefined,
    previousEventTitle: undefined,
  },
] as const;
