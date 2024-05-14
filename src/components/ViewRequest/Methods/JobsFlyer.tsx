import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ViewRequestJobsFlyerDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="usaJobsPostId">
        Posting ID
      </Label>
      <UpdatePostId detailSelection="usaJobsPostId" />

      <Label weight="semibold" htmlFor="closeDateUsaJobsFlyer">
        Close Date
      </Label>
      <Text id="closeDateUsaJobsFlyer">
        {props.data.closeDateUsaJobsFlyer?.toDateString()}
      </Text>
    </section>
  );
};

export default ViewRequestJobsFlyerDetails;
