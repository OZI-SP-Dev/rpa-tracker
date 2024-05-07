import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";

const ViewRequestJobsFlyerDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="usaJobsPostId">
        Posting ID
      </Label>
      <Text id="usaJobsPostId">{props.data.usaJobsPostId}</Text>

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
