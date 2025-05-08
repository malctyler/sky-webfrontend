import classNames from "classnames";
// components

import SimpleBar from "simplebar-react";
/**
 * MessageList
 */
const MessageList = props => {
  const children = props.children || null;
  return <SimpleBar style={{
    maxHeight: "407px"
  }}>
      <div className={classNames("inbox-widget", props.className)}>
        {children}
      </div>
    </SimpleBar>;
};
export default MessageList;