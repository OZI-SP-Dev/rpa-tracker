import { Button, Tooltip } from "@fluentui/react-components";
import { EditIcon } from "@fluentui/react-icons-mdl2";
import { useRequest } from "api/requestsApi";
import { useNavigate, useParams } from "react-router-dom";

const EditRequest = ({ openEditForm }: { openEditForm: () => void }) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const inDraft = request.data?.stage === "Draft";
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
        disabled={request.isLoading}
        icon={<EditIcon className="blue" />}
        size="large"
        onClick={() => handleClick()}
      />
    </Tooltip>
  );
};

export default EditRequest;
