import classNames from "classnames";
import { ReactNode } from "react";

// components

import SimpleBar from "simplebar-react";

interface MessageListProps {
  className?: string;
  children: ReactNode;
}

/**
 * MessageList
 */
const MessageList = (props: MessageListProps) => {
  const children = props.children || null;

  return (
    <SimpleBar style={{ maxHeight: "407px" }}>
      <div className={classNames("inbox-widget", props.className)}>
        {children}
      </div>
    </SimpleBar>
  );
};

export default MessageList;
