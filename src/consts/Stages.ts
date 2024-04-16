interface STARTSTAGE {
  key: string;
  text: string;
  next: string;
  nextEventTitle: string;
  previous: undefined;
  previousEventTitle: undefined;
  subStages?: ReadonlyArray<STAGE>;
}

interface MIDSTAGE {
  key: string;
  text: string;
  next: string;
  nextEventTitle: string;
  previous: string;
  previousEventTitle: string;
  subStages?: ReadonlyArray<STAGE>;
}

interface ENDSTAGE {
  key: string;
  text: string;
  next: undefined;
  nextEventTitle: undefined;
  previous: undefined;
  previousEventTitle: undefined;
  subStages?: ReadonlyArray<STAGE>;
}

type STAGE = STARTSTAGE | MIDSTAGE | ENDSTAGE;

export const STAGES: ReadonlyArray<STAGE> = [
  {
    key: "Draft",
    text: "RPA Request",
    next: "PackageReview",
    nextEventTitle: "Forward Stage Change: In Draft to Package Review",
    previous: undefined,
    previousEventTitle: undefined,
  },
  {
    key: "PackageReview",
    text: "Package Review/Concurrence",
    next: "Recruiting",
    nextEventTitle: "Forward Stage Change: Package Review to Recruiting",
    previous: "Draft",
    previousEventTitle: "Backward Stage Change: Package Review to In Draft",
    subStages: [
      {
        key: "Initial",
        text: "Initial...",
        next: undefined,
        nextEventTitle: undefined,
        previous: undefined,
        previousEventTitle: undefined,
      },
    ],
  },
  {
    key: "Recruiting",
    text: "Recruiting",
    next: "Selection",
    nextEventTitle: "Forward Stage Change: Recruiting to Candidate Selection",
    previous: "PackageReview",
    previousEventTitle: "Backward Stage Change: Recruiting to Package Review",
  },
  {
    key: "Selection",
    text: "Candidate Selection",
    next: "PackageApproval",
    nextEventTitle:
      "Forward Stage Change: Candidate Selection to Package Approval",
    previous: "Recruiting",
    previousEventTitle:
      "Backward Stage Change: Candidate Selection to Recruiting",
  },
  {
    key: "PackageApproval",
    text: "Package Prep & Approval",
    next: "Complete",
    nextEventTitle: "Forward Stage Change: Package Approval to Complete",
    previous: "Selection",
    previousEventTitle:
      "Backward Stage Change: Package Approval to Candidate Selection",
  },
  {
    key: "Complete",
    text: "Complete",
    next: undefined,
    nextEventTitle: undefined,
    previous: undefined,
    previousEventTitle: undefined,
  },
] as const;
