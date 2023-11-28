import { Title2, Text } from "@fluentui/react-components";
import { useDocuments } from "api/documentsApi";
import { useParams } from "react-router-dom";

const ViewRequestDocuments = () => {
  const params = useParams();
  const documents = useDocuments(Number(params.requestId));

  return (
    <>
      <Title2>Documents</Title2>
      <br />
      {documents.isLoading && <div>Fetching data...</div>}
      <br />
      {documents.data && (
        <section>
          {documents.data.map((document) => {
            return <Text>{document.Name}</Text>;
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
