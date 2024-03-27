import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Label,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Option,
  Spinner,
  Text,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffect } from "react";
import { ContactIcon, SaveIcon } from "@fluentui/react-icons-mdl2";
import { NewRole, useAddRole } from "api/rolesApi";
import { ROLES } from "consts/Roles";
import BACCombobox from "components/BaseFormFields/BACCombobox";
import { PeoplePicker } from "components/PeoplePicker/PeoplePicker";

const AddRoleDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const addRole = useAddRole();

  const myForm = useForm<NewRole>({
    criteriaMode:
      "all" /* Pass back multiple errors, so we can prioritize which one(s) to show */,
    mode: "onChange" /* Provide input directly as they input, so if entering bad data (eg letter in MPCN) it will let them know */,
  });

  // Reset the form when form is opened/closed
  useEffect(() => {
    myForm.reset();
  }, [isOpen, myForm.reset]);

  useEffect(() => {
    if (addRole.isSuccess) {
      const timeOut = setTimeout(() => {
        setIsOpen(false);
        addRole.reset();
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [addRole.isSuccess, setIsOpen, addRole.reset]);

  const onSubmit: SubmitHandler<NewRole> = (data) => {
    addRole.mutateAsync(data);
  };

  return (
    <Drawer position="end" size="medium" open={isOpen}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              disabled={addRole.isLoading}
              icon={<DismissRegular />}
              onClick={() => setIsOpen(false)}
            />
          }
        >
          Add Role
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <FormProvider {...myForm}>
          <form id="addRoleForm" onSubmit={myForm.handleSubmit(onSubmit)}>
            <div className="requestFieldContainer">
              <BACCombobox<NewRole>
                name="Title"
                labelText="Role"
                rules={{
                  required: "Role is required",
                }}
              >
                {ROLES.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </BACCombobox>
            </div>

            <div className="requestFieldContainer">
              <Label
                id="userId"
                weight="semibold"
                className="fieldLabel"
                required
              >
                <ContactIcon className="fieldIcon" />
                User
              </Label>
              <Controller
                name="user"
                control={myForm.control}
                rules={{
                  required: "User is required",
                }}
                render={({ field }) => (
                  <PeoplePicker
                    ariaLabel="User"
                    aria-describedby="userErr"
                    aria-labelledby="userId"
                    aria-invalid={
                      myForm.formState.errors.user ? "true" : "false"
                    }
                    selectedItems={field.value ?? []}
                    updatePeople={(items) => {
                      if (items?.[0]?.Title) {
                        field.onChange(items[0]);
                      } else {
                        field.onChange([]);
                      }
                    }}
                  />
                )}
              />
              {myForm.formState.errors.user && (
                <Text role="alert" id="userErr" className="fieldErrorText">
                  {myForm.formState.errors.user.message}
                </Text>
              )}
            </div>
          </form>
        </FormProvider>
      </DrawerBody>
      <DrawerFooter>
        {!addRole.isSuccess && (
          <Button
            style={{ marginLeft: "auto" }}
            appearance="primary"
            form="addRoleForm"
            type="submit"
            value="submit"
            disabled={addRole.isLoading}
            icon={addRole.isLoading ? <Spinner /> : <SaveIcon />}
          >
            Save
          </Button>
        )}
        {(addRole.isSuccess || addRole.isError) && (
          <MessageBar intent={addRole.isSuccess ? "success" : "error"}>
            <MessageBarBody>
              <MessageBarTitle>
                {addRole.isSuccess ? "Success!" : "Error!"}
              </MessageBarTitle>
              {addRole.isError &&
                addRole.error instanceof Error &&
                addRole.error.message}
            </MessageBarBody>
          </MessageBar>
        )}
      </DrawerFooter>
    </Drawer>
  );
};

export default AddRoleDrawer;
