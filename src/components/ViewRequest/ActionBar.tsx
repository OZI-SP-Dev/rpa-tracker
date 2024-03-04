import SendRequest from "./Actions/SendRequest";
import ReworkRequest from "./Actions/ReworkRequest";
import EditRequest from "./Actions/EditRequest";
import DeleteRequest from "./Actions/DeleteRequest";

const ActionBar = ({ openEditForm }: { openEditForm: () => void }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SendRequest />
      <ReworkRequest />
      <EditRequest openEditForm={openEditForm} />
      <DeleteRequest />
    </div>
  );
};

export default ActionBar;
