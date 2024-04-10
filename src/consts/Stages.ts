interface STARTSTAGE {
  key: string;
  text: string;
  next: string;
  nextEventTitle: string;
  previous: undefined;
  previousEventTitle: undefined;
  subStages?: STAGE[];
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
  subStages?: STAGE[];
}

type STAGE = STARTSTAGE | MIDSTAGE | ENDSTAGE;

export const STAGES: ReadonlyArray<STAGE> = [
  {
    key: "Draft",
    text: "In Draft",
    next: "PackageReview",
    nextEventTitle: "Forward Stage Change: In Draft to Package Review",
    previous: undefined,
    previousEventTitle: undefined,
  },
  {
    key: "PackageReview",
    text: "Package Review/Approval",
    next: "Post",
    nextEventTitle: "Forward Stage Change: Package Review to Posting",
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
    key: "Post",
    text: "Post Announcement(s)",
    next: "Selection",
    nextEventTitle: "Forward Stage Change: Posting to Candidate Selection",
    previous: "PackageReview",
    previousEventTitle: "Backward Stage Change: Posting to Package Review",
  },
  {
    key: "Selection",
    text: "Candidate Selection",
    next: "OfferReview",
    nextEventTitle: "Forward Stage Change: Candidate Selection to Offer Review",
    previous: "Post",
    previousEventTitle: "Backward Stage Change: Candidate Selection to Posting",
  },
  {
    key: "OfferReview",
    text: "Offer Package Approval",
    next: "Offer",
    nextEventTitle: "Forward Stage Change: Offer Review to Offer",
    previous: "Selection",
    previousEventTitle:
      "Backward Stage Change: Offer Review to Candidate Selection",
  },
  {
    key: "Offer",
    text: "Offer",
    next: "RPA",
    nextEventTitle: "Forward Stage Change: Offer to Generate RPA",
    previous: "OfferReview",
    previousEventTitle: "Backward Stage Change: Offer to Offer Review",
  },
  {
    key: "RPA",
    text: "Generate RPA",
    next: "Complete",
    nextEventTitle: "Forward Stage Change: Generate RPA to Complete",
    previous: "Offer",
    previousEventTitle: "Backward Stage Change: Generate RPA to Offer Review",
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
