export const STAGES = [
  {
    key: "Draft",
    text: "In Draft",
    next: "PackageReview",
    previous: "",
  },
  {
    key: "PackageReview",
    text: "Package Review/Approval",
    next: "Post",
    previous: "Draft",
  },
  {
    key: "Post",
    text: "Post Announcement(s)",
    next: "Selection",
    previous: "PackageReview",
  },
  {
    key: "Selection",
    text: "Candidate Selection",
    next: "OfferReview",
    previous: "Post",
  },
  {
    key: "OfferReview",
    text: "Offer Package Approval",
    next: "Offer",
    previous: "Selection",
  },
  {
    key: "Offer",
    text: "Offer",
    next: "RPA",
    previous: "OfferReview",
  },
  {
    key: "RPA",
    text: "Generate RPA",
    next: "",
    previous: "Offer",
  },
] as const;
