import { useParams } from "react-router-dom";
import { useRequest } from "api/requestsApi";
import ViewRequestDetails from "components/ViewRequest/Details";
import "./ViewRequest.css";
import { Title2 } from "@fluentui/react-components";

const ViewRequest = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));

  return (
    <section id="viewRequestContainer">
      <aside id="viewRequestActionBar" className="gray-gradiant">
        Action Bar
      </aside>
      <section id="viewRequestHeader" className="gray-gradiant">
        Request Header
      </section>
      <section>
        <Title2>Request Details</Title2>
        <br />
        {request.isLoading && <div>Fetching data...</div>}
        <br />
        {request.data && <ViewRequestDetails />}
        {request.isError && (
          <div>An error has occured: {(request.error as Error).message}</div>
        )}
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
