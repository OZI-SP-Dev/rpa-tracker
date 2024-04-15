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

export type EmailProperties = Omit<
  IEmailProperties,
  "AdditionalHeaders" | "From"
>;

const useLogEmail = () => {
  return useMutation(
    ["logEmail"],
    async (requestEmail: { email: EmailProperties; requestId: number }) => {
      const logEmail = {
        To: JSON.stringify(requestEmail.email.To),
        CC: JSON.stringify(requestEmail.email.CC),
        BCC: JSON.stringify(requestEmail.email.BCC),
        Subject: requestEmail.email.Subject,
        Body: requestEmail.email.Body,
      };

      return spWebContext.web.lists
        .getByTitle("emails")
        .items.add({ Title: requestEmail.requestId.toString(), ...logEmail });
    }
  );
};

export const useSendEmail = () => {
  const logEmail = useLogEmail();
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["sendEmail"],
    async (requestEmail: { email: EmailProperties; requestId: number }) => {
      const email: IEmailProperties = structuredClone(requestEmail.email);
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
