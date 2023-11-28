import ViewRequestDetails from "components/ViewRequest/Details";
import ViewRequestDocuments from "components/ViewRequest/Documents";
import "./ViewRequest.css";

const ViewRequest = () => {
  return (
    <section id="viewRequestContainer">
      <aside id="viewRequestActionBar" className="gray-gradiant">
        Action Bar
      </aside>
      <section id="viewRequestHeader" className="gray-gradiant">
        Request Header
      </section>
      <section id="viewRequestDetailsContainer">
        <ViewRequestDetails />
      </section>
      <section id="viewRequestNotes" className="gray-gradiant">
        Notes!
      </section>
      <aside id="viewRequestDocuments" className="gray-gradiant">
        <ViewRequestDocuments />
      </aside>
    </section>
  );
};

export default ViewRequest;
