import SendRequest from "./Actions/SendRequest";
import ReworkRequest from "./Actions/ReworkRequest";
import EditRequest from "./Actions/EditRequest";
import CancelRequest from "./Actions/CancelRequest";

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
