import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";

const ViewRequestJobsFlyerDetails = (props: { data: RPARequest }) => {
  return (
    <section>
      <Label weight="semibold" htmlFor="closeDateUsaJobsFlyer">
        Close Date:
      </Label>
      <Text id="closeDateUsaJobsFlyer">
        {props.data.closeDateUsaJobsFlyer?.toDateString()}
      </Text>
    </section>
  );
};

export default ViewRequestJobsFlyerDetails;
