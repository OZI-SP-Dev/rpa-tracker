import SendRequest from "components/ViewRequest/Actions/SendRequest";
import ReworkRequest from "components/ViewRequest/Actions/ReworkRequest";
import EditRequest from "components/ViewRequest/Actions/EditRequest";
import CancelRequest from "components/ViewRequest/Actions/CancelRequest";

const ActionBar = ({ openEditForm }: { openEditForm: () => void }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SendRequest />
      <ReworkRequest />
      <EditRequest openEditForm={openEditForm} />
      <CancelRequest />
    </div>
  );
};

export default ActionBar;
