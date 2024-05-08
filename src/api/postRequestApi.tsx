import {
  Link,
  Toast,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { spWebContext } from "api/SPWebContext";

export const usePostRequest = () => {
  const queryClient = useQueryClient();
  const { dispatchToast } = useToastController("toaster");

  return useMutation(
    ["postRequest"],
    async (request: { requestId: number; postRequest: object }) => {
      await spWebContext.web.lists
        .getByTitle("requests")
        .items.getById(request.requestId)
        .update(request.postRequest);
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
