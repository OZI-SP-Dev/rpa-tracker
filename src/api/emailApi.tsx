import { spWebContext } from "api/SPWebContext";
import "@pnp/sp/sputilities";
import { IEmailProperties } from "@pnp/sp/sputilities";
import { useMutation } from "@tanstack/react-query";
import {
  Link,
  Toast,
  ToastBody,
  ToastTitle,
  ToastTrigger,
  useToastController,
} from "@fluentui/react-components";

const useLogEmail = () => {
  return useMutation(
    ["logEmail"],
    async (requestEmail: { email: IEmailProperties; requestId: number }) => {
      return spWebContext.web.lists
        .getByTitle("emails")
        .items.add({ Title: requestEmail.requestId, ...requestEmail.email });
    }
  );
};

export const useSendEmail = () => {
  const logEmail = useLogEmail();
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["sendEmail"],
    async (requestEmail: { email: IEmailProperties; requestId: number }) => {
      let email = structuredClone(requestEmail.email);
      email.AdditionalHeaders = { "content-type": "text/html" };
      email.Body = email.Body.replace(/\n/g, "<BR>");
      return spWebContext.utility.sendEmail(email);
    },
    {
      onSuccess: async (_data, requestEmail) => {
        logEmail.mutate(requestEmail);
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
                Error sending email!
              </ToastTitle>
              <ToastBody>{error.message}</ToastBody>
            </Toast>,
            { intent: "error", timeout: -1 }
          );
        }
      },
    }
  );
};
