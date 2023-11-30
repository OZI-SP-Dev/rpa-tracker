import SendRequest from "./Actions/SendRequest";
import ReworkRequest from "./Actions/ReworkRequest";
import EditRequest from "./Actions/EditRequest";
import DeleteRequest from "./Actions/DeleteRequest";

const ActionBar = () => {
  return (
    <>
      <SendRequest />
      <br />

      <ReworkRequest />
      <br />

      <EditRequest />
      <br />
      <DeleteRequest />
    </>
  );
};

export default ActionBar;
