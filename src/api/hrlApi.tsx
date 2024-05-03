import {
  Link,
  Toast,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "./SPWebContext";

declare const _spPageContextInfo: {
  userId: number;
};

export const useClaimRequest = () => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["claimRequest"],
    async (request: { requestId: number }) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update({ hrlId: _spPageContextInfo.userId });
    },
    {
      onSuccess: async (_data, request) => {
        queryClient.invalidateQueries(["requests", request.requestId]);
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
                Error assigning HRL
              </ToastTitle>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};
