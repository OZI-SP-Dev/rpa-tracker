import { useReducer } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Spinner } from "@fluentui/react-components";
import HiringInfo from "./NewFormSection/NewForm.HiringInfo";
import JOA from "./NewFormSection/NewForm.JOA";
import JobBoard from "./NewFormSection/NewForm.JobBoard";
import LinkedInPost from "./NewFormSection/NewForm.LinkedInPost";
import LinkedInSearch from "./NewFormSection/NewForm.LinkedInSearch";
import RoutingInfo from "./NewFormSection/NewForm.Routing";
import USAJobs from "./NewFormSection/NewForm.USAJobs";
import Done from "./NewFormSection/NewForm.Done";

interface INPUTSTEPFUNCTIONS {
  next: (methods: string[]) => string;
  prev: (methods: string[]) => string;
}

const INPUTSTEPS = new Map<string, INPUTSTEPFUNCTIONS>([
  [
    "RoutingInfo",
    {
      next: () => "HiringInfo",
      prev: () => "RoutingInfo",
    },
  ],
]);

INPUTSTEPS.set("HiringInfo", {
  next: (methods) => {
    const lcmc = methods.includes("lcmc");
    return lcmc
      ? "JobBoard"
      : INPUTSTEPS.get("JobBoard")?.next(methods) ?? "JobBoard";
  },
  prev: () => "RoutingInfo",
});

INPUTSTEPS.set("JobBoard", {
  next: (methods) => {
    const joa = methods.includes("joa");
    return joa ? "JOA" : INPUTSTEPS.get("JOA")?.next(methods) ?? "JOA";
  },
  prev: () => "HiringInfo",
});

INPUTSTEPS.set("JOA", {
  next: (methods) => {
    const linkedinPost = methods.includes("linkedinPost");
    return linkedinPost
      ? "LinkedInPost"
      : INPUTSTEPS.get("LinkedInPost")?.next(methods) ?? "LinkedInPost";
  },
  prev: (methods) => {
    const lcmc = methods.includes("lcmc");
    return lcmc
      ? "JobBoard"
      : INPUTSTEPS.get("JobBoard")?.prev(methods) ?? "JobBoard";
  },
});

INPUTSTEPS.set("LinkedInPost", {
  next: (methods) => {
    const linkedinSearch = methods.includes("linkedinSearch");
    return linkedinSearch
      ? "LinkedInSearch"
      : INPUTSTEPS.get("LinkedInSearch")?.next(methods) ?? "LinkedInSearch";
  },
  prev: (methods) => {
    const joa = methods.includes("joa");
    return joa ? "JOA" : INPUTSTEPS.get("JOA")?.prev(methods) ?? "JOA";
  },
});

INPUTSTEPS.set("LinkedInSearch", {
  next: (methods) => {
    const usaJobsFlyer = methods.includes("usaJobsFlyer");
    return usaJobsFlyer
      ? "USAJobs"
      : INPUTSTEPS.get("USAJobs")?.next(methods) ?? "USAJobs";
  },
  prev: (methods) => {
    const linkedinPost = methods.includes("linkedinPost");
    return linkedinPost
      ? "LinkedInPost"
      : INPUTSTEPS.get("LinkedInPost")?.prev(methods) ?? "LinkedInPost";
  },
});

INPUTSTEPS.set("USAJobs", {
  next: () => "DONE",
  prev: (methods) => {
    const linkedinSearch = methods.includes("linkedinSearch");
    return linkedinSearch
      ? "LinkedInSearch"
      : INPUTSTEPS.get("LinkedInSearch")?.prev(methods) ?? "LinkedInSearch";
  },
});

INPUTSTEPS.set("DONE", {
  next: () => "DONE",
  prev: (methods) => {
    const linkedinSearch = methods.includes("usaJobsFlyer");
    return linkedinSearch
      ? "USAJobs"
      : INPUTSTEPS.get("USAJobs")?.prev(methods) ?? "USAJobs";
  },
});

interface ActionType {
  type: string;
  payload?: string[];
}

function reducer(
  state: { page: string } = { page: "RoutingInfo" },
  action: ActionType
) {
  switch (action.type) {
    case "next_page":
      const nextPage = INPUTSTEPS.get(state.page)?.next(action.payload ?? []);

      return nextPage ? { ...state, page: nextPage } : state;

    case "prev_page":
      const prevPage = INPUTSTEPS.get(state.page)?.prev(action.payload ?? []);
      return prevPage ? { ...state, page: prevPage } : state;

    case "reset":
      return { page: "RoutingInfo" };

    case "goto":
      const step = action.payload?.[0];
      return step ? { ...state, page: step } : state;

    default:
      return state;
  }
}

const Wizard = ({ isLoading = false, isError = false }) => {
  const [state, dispatch] = useReducer(reducer, { page: "RoutingInfo" });
  const form = useFormContext();
  const methods = form.watch("methods");
  const gotoStep = (step: string) => {
    const steps: string[] = [];
    steps.push(step);
    dispatch({ type: "goto", payload: steps });
  };
  return (
    <>
      {state.page === "RoutingInfo" && <RoutingInfo />}
      {state.page === "HiringInfo" && <HiringInfo />}
      {state.page === "JobBoard" && <JobBoard />}
      {state.page === "JOA" && <JOA />}
      {state.page === "LinkedInPost" && <LinkedInPost />}
      {state.page === "LinkedInSearch" && <LinkedInSearch />}
      {state.page === "USAJobs" && <USAJobs />}
      {state.page === "DONE" && <Done gotoStep={gotoStep} />}

      {!isLoading && (
        <div className="requestWizardButtons">
          <Button
            disabled={state.page === "RoutingInfo" || isLoading}
            onClick={() => {
              if (form.formState.isValid) {
                dispatch({ type: "prev_page", payload: methods });
              } else {
                form.trigger(undefined, { shouldFocus: true });
              }
            }}
          >
            Prev
          </Button>
          <Button
            style={{ marginLeft: "auto" }}
            disabled={state.page === "DONE" || isLoading}
            onClick={() => {
              if (form.formState.isValid) {
                dispatch({ type: "next_page", payload: methods });
              } else {
                form.trigger(undefined, { shouldFocus: true });
              }
            }}
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
          label="Saving Request..."
        />
      )}
    </>
  );
};

export default Wizard;
