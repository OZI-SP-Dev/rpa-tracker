import {
  Link,
  Toast,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "./SPWebContext";

type postRequests =
  | {
      jobBoardPostDate: Date | "";
    }
  | {
      jobBoardPostDate: Date | "";
    }
  | {
      joaPostDate: Date | "";
    }
  | {
      linkedInPostDate: Date | "";
    }
  | {
      linkedInSearchDate: Date | "";
    }
  | {
      resumeSearchDate: Date | "";
    }
  | {
      usaJobsPostDate: Date | "";
    };

export const usePostRequest = () => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["postRequest"],
    async (request: { requestId: number; postRequest: postRequests }) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update(request.postRequest);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["requests"]);
      },
      onError: async (error) => {
        console.log(error);
        if (error instanceof Error) {
          dispatchToast(
            <Toast>
              <ToastTitle
                action={
                  <ToastTrigger>
                    <Link>Dismiss</Link>
                  </ToastTrigger>
                }
              >
                Error posting item
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};
