import ActionBar from "components/ViewRequest/ActionBar";
import StatusBar from "components/ViewRequest/StatusBar";
import ViewRequestDetails from "components/ViewRequest/Details";
import ViewRequestDocuments from "components/ViewRequest/Documents";
import "./ViewRequest.css";

const ViewRequest = () => {
  return (
    <section id="viewRequestContainer">
      <aside id="viewRequestActionBar" className="gray-gradiant">
        <ActionBar />
      </aside>
      <section id="viewRequestHeader" className="gray-gradiant">
        <StatusBar />
      </section>
      <section id="viewRequestDetailsContainer">
        <ViewRequestDetails />
      </section>
      <section id="viewRequestNotes" className="gray-gradiant">
        Notes!
      </section>
      <aside id="viewRequestDocuments">
        <ViewRequestDocuments />
      </aside>
    </section>
  );
};

export default ViewRequest;
