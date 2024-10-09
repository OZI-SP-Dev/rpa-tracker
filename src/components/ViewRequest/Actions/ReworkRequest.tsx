import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  DropdownProps,
  Field,
  Option,
  Textarea,
  TextareaProps,
  Tooltip,
} from "@fluentui/react-components";
import { NavigateBackIcon } from "@fluentui/react-icons-mdl2";
import { useAddNote } from "api/notesApi";
import {
  UpdateRequestStage,
  useRequest,
  useUpdateStage,
} from "api/requestsApi";
import { useMyRoles } from "api/rolesApi";
import { STAGES } from "consts/Stages";
import { useState } from "react";
import { useParams } from "react-router-dom";

declare const _spPageContextInfo: {
  userDisplayName: string;
};

const standardReasons = [
  "Salary/Incentive Over Cap",
  "Missing Information",
  "Candidate Declined",
  "Candidate Unqualified",
  "No Qualified Candidates",
];

const ReworkRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();
  const addNote = useAddNote(requestId);
  const [reason, setReason] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const myRoles = useMyRoles();

  const currentStage = STAGES.find(({ key }) => key === request.data?.stage);

  let disableReworkButton = true;
  if (currentStage?.next) {
    if (currentStage?.key === "Draft") {
      disableReworkButton = false;
    } else if (myRoles.isHRL || myRoles.isCOSF) {
      disableReworkButton = false;
    } else if (
      (request.data?.subStage === "OSFReview" ||
        request.data?.subStage === "SelectionPackageOSFApproval") &&
      myRoles.isOSF
    ) {
      disableReworkButton = false;
    } else if (
      request.data?.subStage === "SelectionPackageCAApproval" &&
      myRoles.isCA
    ) {
      disableReworkButton = false;
    } else if (currentStage?.key === "Recruiting" && myRoles.isCSF) {
      disableReworkButton = false;
    } else if (currentStage?.key === "Selection" && myRoles.isCSF) {
      disableReworkButton = false;
    } else if (
      currentStage?.key === "SelectionPackageCSFApproval" &&
      myRoles.isCSF
    ) {
      disableReworkButton = false;
    }
  }

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const onOptionSelect: DropdownProps["onOptionSelect"] = (_e, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? "");
  };

  const updateHandler = () => {
    if (request.data && currentStage?.previous) {
      const newData: UpdateRequestStage = {
        requestId,
        newStage: "",
        newSubStage: "",
        eventTitle: "",
        rework: true,
        reworkText: (value === "" ? "" : value + "\n") + reason,
        reworkAuthor: _spPageContextInfo.userDisplayName,
      };

      const subStage = currentStage.subStages?.find(
        ({ key }) => key === request.data.subStage
      );

      if (subStage && subStage.previous) {
        newData.newStage = currentStage.key;
        newData.newSubStage = subStage.previous;
        newData.eventTitle = subStage.previousEventTitle || "";
      } else {
        const previousStage = STAGES.find(
          ({ key }) => key === currentStage.previous
        );
        newData.newStage = currentStage.previous;
        newData.newSubStage = previousStage?.subStages?.[0].key || ""; // first substage or empty string
        newData.eventTitle = currentStage.previousEventTitle || "";
      }

      if (newData.rework && newData.newStage === "PackageApproval") {
        newData.csfcaApproval = null;
        newData.hqApproval = null;
        newData.titleV = null;
      }

      if (newData.rework && newData.newStage === "Selection") {
        newData.currentEmployee = null;
      }

      updateStage.mutate(newData);
      addNote.mutate(
        newData.eventTitle + "\n" + (value === "" ? "" : value + "\n") + reason
      );
    }
  };

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Rework" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<NavigateBackIcon className="orange" />}
            size="large"
            disabled={disableReworkButton || !currentStage?.previous}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Rework request</DialogTitle>
          <DialogContent>
            <Field label="Standard reasons">
              <Dropdown
                clearable
                onOptionSelect={onOptionSelect}
                selectedOptions={selectedOptions}
                placeholder="Standard Reasons"
              >
                {standardReasons.map((reason) => (
                  <Option key={reason}>{reason}</Option>
                ))}
              </Dropdown>
            </Field>
            <Field label="Rework reason" required={value === ""}>
              <Textarea value={reason} onChange={updateReason} required />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                disabled={reason === "" && value === ""}
                appearance="primary"
                onClick={updateHandler}
              >
                Submit
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ReworkRequest;
