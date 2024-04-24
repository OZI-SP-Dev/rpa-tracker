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
        readyForNext: () => true,
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
    readyForNext: () => true,
    previous: "Selection",
    previousEventTitle:
      "Backward Stage Change: Package Approval to Candidate Selection",
    subStages: [
      {
        key: "HRLPackageReview",
        text: "HRL Package Review",
        next: "OSFPackageReview",
        nextEventTitle:
          "Forward Stage Change: HRL Package Review to OSF Review",
        readyForNext: () => true,
        previous: undefined,
        previousEventTitle: undefined,
      },
      {
        key: "OSFPackageReview",
        text: "OSF/CSF Package Review",
        next: "CAPackageReview",
        nextEventTitle:
          "Forward Stage Change: OSF Review to Title V / CA Review",
        readyForNext: () => true,
        previous: "HRLPackageReview",
        previousEventTitle:
          "Backward Stage Change: OSF Review to HRL Package Review",
      },
      {
        key: "CAPackageReview",
        text: "Title V / CA",
        next: undefined,
        nextEventTitle: undefined,
        readyForNext: () => true,
        previous: "OSFPackageReview",
        previousEventTitle:
          "Backward Stage Change: Title V / CA Review to OSF Review",
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
