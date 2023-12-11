import SendRequest from "./Actions/SendRequest";
import ReworkRequest from "./Actions/ReworkRequest";
import EditRequest from "./Actions/EditRequest";
import DeleteRequest from "./Actions/DeleteRequest";

const ActionBar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SendRequest />
      <ReworkRequest />
      <EditRequest />
      <DeleteRequest />
    </div>
  );
};

export default ActionBar;
