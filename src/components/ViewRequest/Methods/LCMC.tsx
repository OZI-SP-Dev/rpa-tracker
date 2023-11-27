import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";

const ViewRequestLCMCDetails = (props: { data: RPARequest }) => {
  return (
    <section>
      <Label weight="semibold" htmlFor="closeDateLCMC">
        Close Date:
      </Label>
      <Text id="closeDateLCMC">{props.data.closeDateLCMC?.toDateString()}</Text>
    </section>
  );
};

export default ViewRequestLCMCDetails;
