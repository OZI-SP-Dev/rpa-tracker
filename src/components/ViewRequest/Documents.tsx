import { Title2 } from "@fluentui/react-components";
import { useDocuments } from "api/documentsApi";
import { useParams } from "react-router-dom";
import { DocumentView } from "components/ViewRequest/Documents/DocumentView";
import { DocumentUploader } from "components/ViewRequest/Documents/DocumentUploader";

const ViewRequestDocuments = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const documents = useDocuments(requestId);

  return (
    <>
      <Title2>Documents</Title2>
      <DocumentUploader requestId={requestId} />
      {documents.isLoading && <div>Fetching data...</div>}
      <br />
      {documents.data && (
        <section>
          {documents.data.map((document) => {
            return (
              <DocumentView
                key={document.UniqueId}
                readonly={false}
                document={document}
              />
            );
          })}
        </section>
      )}
      {documents.isError && (
        <div>An error has occured: {(documents.error as Error).message}</div>
      )}
    </>
  );
};

export default ViewRequestDocuments;
