import { Button, Tooltip } from "@fluentui/react-components";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import { useRequest } from "api/requestsApi";
import { useMyRoles } from "api/rolesApi";
import { useNavigate, useParams } from "react-router-dom";

declare const _spPageContextInfo: {
  userId: number;
};

const EditRequest = ({ openEditForm }: { openEditForm: () => void }) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const myRoles = useMyRoles();
  const inDraft = request.data?.stage === "Draft";
  const isEditableStage =
    request.data?.stage === "Draft" || request.data?.stage === "PackageReview";
  const isEditor = myRoles.isHRL || myRoles.isOSF || myRoles.isCOSF;

  const isDraftAndAuthor =
    (request.data?.stage === "Draft" ||
      (request.data?.stage === "PackageReview" &&
        request.data?.subStage === "OSFReview")) &&
    Number(request.data?.Author?.Id) === _spPageContextInfo.userId;

  const navigate = useNavigate();

  const handleClick = () => {
    if (inDraft) {
      navigate("/New/" + params.requestId);
    } else {
      openEditForm();
    }
  };

  return (
    <Tooltip withArrow content="Edit" relationship="label">
      <Button
        style={{
          border: "none",
          background: "transparent",
          borderRadius: "50%",
        }}
        disabled={
          request.isLoading ||
          !isEditableStage ||
          (!isEditor && !isDraftAndAuthor)
        }
        icon={<EditIcon className="blue" />}
        size="large"
        onClick={() => handleClick()}
      />
    </Tooltip>
  );
};

export default EditRequest;
