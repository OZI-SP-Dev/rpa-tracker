import { useReducer } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Spinner } from "@fluentui/react-components";
import HiringInfo from "./NewFormSection/NewForm.HiringInfo";
import JOA from "./NewFormSection/NewForm.JOA";
import JobBoard from "./NewFormSection/NewForm.JobBoard";
import LinkedInPost from "./NewFormSection/NewForm.LinkedInPost";
import LinkedInSearch from "./NewFormSection/NewForm.LinkedInSearch";
import PositionInfo from "./NewFormSection/NewForm.PositionInfo";
import RoutingInfo from "./NewFormSection/NewForm.Routing";
import USAJobs from "./NewFormSection/NewForm.USAJobs";

interface INPUTSTEPFUNCTIONS {
  next: (_methods: string[]) => string;
  prev: (_methods: string[]) => string;
}

const INPUTSTEPS = new Map<string, INPUTSTEPFUNCTIONS>([
  [
    "RoutingInfo",
    {
      next: (_methods: string[]) => "PositionInfo",
      prev: (_methods: string[]) => "RoutingInfo",
    },
  ],
  [
    "PositionInfo",
    {
      next: (_methods: string[]) => "HiringInfo",
      prev: (_methods: string[]) => "RoutingInfo",
    },
  ],
]);

INPUTSTEPS.set("HiringInfo", {
  next: (methods: string[]) => {
    const lcmc = methods.includes("lcmc");
    return lcmc
      ? "JobBoard"
      : INPUTSTEPS.get("JobBoard")?.next(methods) ?? "JobBoard";
  },
  prev: (_methods: string[]) => "PositionInfo",
});

INPUTSTEPS.set("JobBoard", {
  next: (methods: string[]) => {
    const joa = methods.includes("joa");
    return joa ? "JOA" : INPUTSTEPS.get("JOA")?.next(methods) ?? "JOA";
  },
  prev: (_methods: string[]) => "HiringInfo",
});

INPUTSTEPS.set("JOA", {
  next: (methods: string[]) => {
    const linkedinPost = methods.includes("linkedinPost");
    return linkedinPost
      ? "LinkedInPost"
      : INPUTSTEPS.get("LinkedInPost")?.next(methods) ?? "LinkedInPost";
  },
  prev: (methods: string[]) => {
    const lcmc = methods.includes("lcmc");
    return lcmc
      ? "JobBoard"
      : INPUTSTEPS.get("JobBoard")?.prev(methods) ?? "JobBoard";
  },
});

INPUTSTEPS.set("LinkedInPost", {
  next: (methods: string[]) => {
    const linkedinSearch = methods.includes("linkedinSearch");
    return linkedinSearch
      ? "LinkedInSearch"
      : INPUTSTEPS.get("LinkedInSearch")?.next(methods) ?? "LinkedInSearch";
  },
  prev: (methods: string[]) => {
    const joa = methods.includes("joa");
    return joa ? "JOA" : INPUTSTEPS.get("JOA")?.prev(methods) ?? "JOA";
  },
});

INPUTSTEPS.set("LinkedInSearch", {
  next: (methods: string[]) => {
    const usaJobsFlyer = methods.includes("usaJobsFlyer");
    return usaJobsFlyer
      ? "USAJobs"
      : INPUTSTEPS.get("USAJobs")?.next(methods) ?? "USAJobs";
  },
  prev: (methods: string[]) => {
    const linkedinPost = methods.includes("linkedinPost");
    return linkedinPost
      ? "LinkedInPost"
      : INPUTSTEPS.get("LinkedInPost")?.prev(methods) ?? "LinkedInPost";
  },
});

INPUTSTEPS.set("USAJobs", {
  next: (_methods: string[]) => "DONE",
  prev: (methods: string[]) => {
    const linkedinSearch = methods.includes("linkedinSearch");
    return linkedinSearch
      ? "LinkedInSearch"
      : INPUTSTEPS.get("LinkedInSearch")?.prev(methods) ?? "LinkedInSearch";
  },
});

interface ActionType {
  type: string;
  payload?: string[];
}

function reducer(state: { page: string }, action: ActionType) {
  console.log("Action", action);
  switch (action.type) {
    case "next_page":
      const nextPage = INPUTSTEPS.get(state.page)?.next(action.payload ?? []);

      return nextPage ? { ...state, page: nextPage } : state;

    case "prev_page":
      const prevPage = INPUTSTEPS.get(state.page)?.prev(action.payload ?? []);
      return prevPage ? { ...state, page: prevPage } : state;

    case "reset":
      return { page: "RoutingInfo" };

    default:
      return state;
  }
}

const Wizard = ({ isLoading = false, isError = false }) => {
  const [state, dispatch] = useReducer(reducer, { page: "RoutingInfo" });
  const form = useFormContext();
  const methods = form.watch("methods");
  return (
    <>
      {state.page === "RoutingInfo" && <RoutingInfo />}
      {state.page === "PositionInfo" && <PositionInfo />}
      {state.page === "HiringInfo" && <HiringInfo />}
      {state.page === "JobBoard" && <JobBoard />}
      {state.page === "JOA" && <JOA />}
      {state.page === "LinkedInPost" && <LinkedInPost />}
      {state.page === "LinkedInSearch" && <LinkedInSearch />}
      {state.page === "USAJobs" && <USAJobs />}

      {!isLoading && (
        <div className="requestWizardButtons">
          <Button
            disabled={state.page === "RoutingInfo" || isLoading}
            onClick={() => dispatch({ type: "prev_page", payload: methods })}
          >
            Prev
          </Button>
          <Button
            style={{ marginLeft: "auto" }}
            disabled={state.page === "Done" || isLoading}
            onClick={() => dispatch({ type: "next_page", payload: methods })}
          >
            Next
          </Button>
          <Button appearance="primary" type="submit">
            {!isError ? "Save Request" : "Retry"}
          </Button>
        </div>
      )}

      {isLoading && (
        <Spinner
          style={{ justifyContent: "flex-start" }}
          label="Creating Request..."
        />
      )}
    </>
  );
};

export default Wizard;
