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

export const useSendEmail = () => {
  const { dispatchToast } = useToastController("toaster");
  return useMutation(
    ["logEmail"],
    async (requestEmail: { email: EmailProperties; requestId: number }) => {
      const logEmail = {
        To: requestEmail.email.To?.join(";"),
        CC: requestEmail.email.CC?.join(";"),
        BCC: requestEmail.email.BCC?.join(";"),
        Subject: requestEmail.email.Subject,
        Body: requestEmail.email.Body,
      };

      return spWebContext.web.lists
        .getByTitle("emails")
        .items.add({ Title: requestEmail.requestId.toString(), ...logEmail });
    },
    {
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
