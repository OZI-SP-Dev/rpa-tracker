import ViewRequestDetails from "components/ViewRequest/Details";
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
      <section>
        <ViewRequestDetails />
      </section>
      <section id="viewRequestNotes" className="gray-gradiant">
        Notes!
      </section>
      <aside id="viewRequestDocuments" className="gray-gradiant">
        Documents
      </aside>
    </section>
  );
};

export default ViewRequest;
