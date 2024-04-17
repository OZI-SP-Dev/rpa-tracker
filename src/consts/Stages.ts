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
    previous: undefined,
    previousEventTitle: undefined,
  },
  {
    key: "PackageReview",
    text: "Package Review/Concurrence",
    next: "Recruiting",
    nextEventTitle: "Forward Stage Change: Package Review to Recruiting",
    previous: "Draft",
    previousEventTitle: "Backward Stage Change: Package Review to RPA Request",
    subStages: [
      {
        key: "OSFReview",
        text: "OSF Review",
        next: "HRLReview",
        nextEventTitle: "Forward Stage Change: OSF Review to HRL/COSF Review",
        previous: undefined,
        previousEventTitle: undefined,
      },
      {
        key: "HRLReview",
        text: "HRL/COSF Review",
        next: undefined,
        nextEventTitle: undefined,
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
    subStages: [
      {
        key: "HRLPackageReview",
        text: "HRL Package Review",
        next: "OSFPackageReview",
        nextEventTitle:
          "Forward Stage Change: HRL Package Review to OSF Review",
        previous: undefined,
        previousEventTitle: undefined,
      },
      {
        key: "OSFPackageReview",
        text: "HRL Package Review",
        next: "CAPackageReview",
        nextEventTitle:
          "Forward Stage Change: OSF Review to Title V / CA Review",
        previous: "HRLPackageReview",
        previousEventTitle:
          "Backward Stage Change: OSF Review to HRL Package Review",
      },
      {
        key: "CAPackageReview",
        text: "Title V / CA",
        next: undefined,
        nextEventTitle: undefined,
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
    previous: undefined,
    previousEventTitle: undefined,
  },
] as const;
