import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { AirplaneIcon } from "@fluentui/react-icons-mdl2";
import ViewRequestJobsFlyerDetails from "../Methods/JobsFlyer";

import DetailsTemplate from "./DetailsTemplate";

const USAJobsDetails = ({
  setEditSection,
  setIsEditOpen,
}: {
  setEditSection: (section: string) => void;
  setIsEditOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));

  return (
    <DetailsTemplate
      sectionName="usaJobsFlyer"
      sectionDescription="USA Jobs"
      setEditSection={setEditSection}
      setIsEditOpen={setIsEditOpen}
      detailSelection="usaJobsPostDate"
      icon={<AirplaneIcon style={{ color: "#120A8F" }} />}
    >
      {request.data && <ViewRequestJobsFlyerDetails data={request.data} />}
    </DetailsTemplate>
  );
};

export default USAJobsDetails;
