import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
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

  const { Author, Created, ...data } = request.data ?? {};
  const myForm = useForm<RPARequest>({
    defaultValues: data,
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  const linkedinQualifications = myForm.watch("linkedinQualifications") ?? [];
  const linkedinCertification =
    linkedinQualifications.includes("certification");
  const temporary = myForm.watch("temporary");

  // Reset the form if request.data changes and when form is opened/closed
  useEffect(() => {
    if (request.data) {
      // Remove Author and Created properties from data object
      const { Author, Created, ...data } = request.data ?? {};
      myForm.reset(data);
    }
  }, [request.data, isOpen, myForm]);

  useEffect(() => {
    if (updateRequest.isSuccess) {
      const timeOut = setTimeout(() => {
        setIsOpen(false);
        updateRequest.reset();
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [updateRequest.isSuccess, setIsOpen, updateRequest]);

  const onSubmit: SubmitHandler<RPARequest> = (data) => {
    updateRequest.mutateAsync(data);
  };

  return (
    <Drawer type="overlay" position="end" size="medium" open={isOpen}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              disabled={updateRequest.isLoading}
              icon={<DismissRegular />}
              onClick={() => setIsOpen(false)}
            />
          }
        >
          Edit Request
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <FormProvider {...myForm}>
          <form id="editForm" onSubmit={myForm.handleSubmit(onSubmit)}>
            {subform === "RoutingInfo" && request.data && (
              <>
                <FormFields.RequestType />
                <FormFields.OSF />
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
            {subform === "JobBoard" && request.data && (
              <FormFields.CloseDateLCMC />
            )}
            {subform === "JOA" && request.data && (
              <>
                <FormFields.CloseDateJOA />
                <FormFields.OrganizationalPOC />
                <FormFields.IssueTo />
                <FormFields.FullPartTime />
                <FormFields.Salary />
                <FormFields.Telework />
                <FormFields.Remote />
                <FormFields.PCS />
                <FormFields.JOAQualifications />
                <FormFields.JOAIdealCandidate />
              </>
            )}
            {subform === "LinkedInPost" && request.data && (
              <>
                <FormFields.Temporary />
                {(temporary === "Term" || temporary === "Temp") && (
                  <FormFields.NTE />
                )}
                <FormFields.Salary />
                <FormFields.Incentives />
                <FormFields.Telework />
                <FormFields.LinkedinPositionSummary />
                <FormFields.LinkedinQualifications />
                {linkedinCertification && <FormFields.Certifications />}
                <FormFields.LinkedinKSAs />
              </>
            )}
            {subform === "LinkedInSearch" && request.data && (
              <>
                <FormFields.LinkedinSearchTitles />
                <FormFields.LinkedinSearchSkills />
                <FormFields.LinkedinSearchEmployers />
                <FormFields.LinkedinSearchStudies />
                <FormFields.LinkedinSearchKeywords />
                <FormFields.LinkedinSearchComments />
              </>
            )}
            {subform === "usaJobsFlyer" && request.data && (
              <FormFields.CloseDateUsaJobs />
            )}
          </form>
        </FormProvider>
      </DrawerBody>
      <DrawerFooter>
        {!updateRequest.isSuccess && (
          <Button
            style={{ marginLeft: "auto" }}
            appearance="primary"
            form="editForm"
            type="submit"
            value="submit"
            disabled={updateRequest.isLoading || updateRequest.isSuccess}
            icon={updateRequest.isLoading ? <Spinner /> : <SaveIcon />}
          >
            Save
          </Button>
        )}
        {(updateRequest.isSuccess || updateRequest.isError) && (
          <MessageBar intent={updateRequest.isSuccess ? "success" : "error"}>
            <MessageBarBody>
              <MessageBarTitle>
                {updateRequest.isSuccess ? "Success!" : "Error!"}
              </MessageBarTitle>
              {updateRequest.isError &&
                updateRequest.error instanceof Error &&
                updateRequest.error.message}
            </MessageBarBody>
          </MessageBar>
        )}
      </DrawerFooter>
    </Drawer>
  );
};

export default EditDrawer;
