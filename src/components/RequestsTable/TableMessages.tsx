import {
  Button,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { useState } from "react";

const TableMessages = () => {
  const [showTip, setShowTip] = useState(true);

  return (
    <MessageBarGroup>
      {showTip ? (
        <MessageBar>
          <MessageBarBody>
            <MessageBarTitle>Tip:</MessageBarTitle>
            Click a column to sort by it, right-click a column to start
            filtering
          </MessageBarBody>
          <MessageBarActions
            containerAction={
              <Button
                onClick={() => setShowTip(false)}
                aria-label="dismiss"
                appearance="transparent"
                icon={<DismissRegular />}
              />
            }
          />
        </MessageBar>
      ) : (
        <></>
      )}
    </MessageBarGroup>
  );
};

export default TableMessages;
