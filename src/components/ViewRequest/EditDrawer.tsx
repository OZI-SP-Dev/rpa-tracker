import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Spinner,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as FormFields from "components/Request/FormFields/FormFields";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RPARequest, useMutateRequest, useRequest } from "api/requestsApi";
import { SaveIcon } from "@fluentui/react-icons-mdl2";

const EditDrawer = ({
  isOpen,
  setIsOpen,
  subform,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  subform: string;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const updateRequest = useMutateRequest();

  const myForm = useForm<RPARequest>({
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  useEffect(() => {
    if (request.data) {
      // Remove Author and Created properties from data object
      const { Author, Created, ...data } = request.data ?? {};
      myForm.reset(data);
    }
  }, [request.data]);

  const onSubmit: SubmitHandler<RPARequest> = (data) => {
    console.log(data);
    updateRequest.mutateAsync(data);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      size="medium"
      style={{ height: "100vh", minWidth: "fit-content" }}
      open={isOpen}
      onOpenChange={(_e, { open }) => setIsOpen(open)}
    >
      <FormProvider {...myForm}>
        <form
          onSubmit={myForm.handleSubmit(onSubmit)}
          style={{ width: "100%" }}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<DismissRegular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Edit Request
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody
            style={{
              /* Header/footer padding = 72px */
              maxHeight: "calc(100vh - 72px - 3em)",
            }}
          >
            {subform === "RoutingInfo" && request.data && (
              <>
                <FormFields.RequestType />
                <FormFields.OSF />
                <FormFields.OrgApprover />
                <FormFields.MCRRequired />
                <FormFields.PositionTitle />
                <FormFields.PaySystem />
                <FormFields.Series />
                <FormFields.Grade />
                <FormFields.OfficeSymbol />
                <FormFields.Supervisor />
                <FormFields.MPCN />
                <FormFields.CPCN />
                <FormFields.FMS />
                <FormFields.PositionSensitivity />
                <FormFields.DutyLocation />
                <FormFields.Incumbent />
                <FormFields.AdvertisementLength />
                <FormFields.Methods />
              </>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              style={{ marginLeft: "auto" }}
              appearance="primary"
              type="submit"
              value="submit"
              disabled={updateRequest.isLoading}
              icon={updateRequest.isLoading ? <Spinner /> : <SaveIcon />}
            >
              Save
            </Button>
          </DrawerFooter>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default EditDrawer;
