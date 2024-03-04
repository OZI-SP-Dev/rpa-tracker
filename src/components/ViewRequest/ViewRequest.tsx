import ActionBar from "components/ViewRequest/ActionBar";
import StatusBar from "components/ViewRequest/StatusBar";
import ViewRequestDetails from "components/ViewRequest/Details";
import ViewRequestDocuments from "components/ViewRequest/Documents";
import ViewRequestNotes from "./Notes";
import "./ViewRequest.css";
import { useState } from "react";
import EditDrawer from "./EditDrawer";

const ViewRequest = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSection, setEditSection] = useState("RoutingInfo");

  return (
    <section id="viewRequestContainer">
      <aside id="viewRequestActionBar" className="gray-gradiant">
        <ActionBar
          openEditForm={() => {
            setEditSection("RoutingInfo");
            setIsEditOpen(true);
          }}
        />
      </aside>
      <section id="viewRequestHeader" className="gray-gradiant">
        <StatusBar />
      </section>
      <section id="viewRequestDetailsContainer">
        <ViewRequestDetails
          setEditSection={setEditSection}
          setIsEditOpen={setIsEditOpen}
        />
      </section>
      <section id="viewRequestNotes">
        <ViewRequestNotes />
      </section>
      <aside id="viewRequestDocuments">
        <ViewRequestDocuments />
      </aside>
      <EditDrawer
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        subform={editSection}
      />
    </section>
  );
};

export default ViewRequest;
