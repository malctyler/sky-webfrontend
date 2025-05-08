;
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { Card, CardBody, Col, Dropdown, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

//components
import { FormInput } from "@/components/Form";

// images
import profilePic from "@/assets/images/users/avatar-1.jpg";
import SimpleBar from "simplebar-react";

/* Chat Item Avatar */
const ChatItemAvatar = ({
  userAvatar,
  postedOn
}) => {
  return <>
      <div className="chat-avatar">
        <img src={userAvatar} alt={'avatar'} height={42} width={42} />
        <i>{postedOn}</i>
      </div>
    </>;
};

/* Chat Item Text */
const ChatItemText = ({
  userName,
  text
}) => {
  return <>
      <div className="conversation-text">
        <div className="ctext-wrap">
          <i>{userName}</i>
          <p>{text}</p>
        </div>
      </div>
    </>;
};

/* Chat Item */
const chatItemDefaultProps = {
  placement: "",
  children: PropTypes.object,
  className: ""
};
const ChatItem = ({
  children,
  placement,
  className
}) => {
  return <li className={classNames("clearfix", {
    odd: placement === "left"
  }, className)}>
      {children}
    </li>;
};
ChatItem.defaultProps = chatItemDefaultProps;

/**
 * ChatForm
 */

/**
 * Renders the ChatForm
 */
const ChatForm = ({
  onNewMessagesPosted
}) => {
  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(yup.object().shape({
    newMessage: yup.string().required("Please enter your messsage")
  }));
  const methods = useForm({
    resolver: schemaResolver
  });
  const {
    handleSubmit,
    register,
    control,
    formState: {
      errors
    },
    reset
  } = methods;

  /**
   * Handle valid form submission
   */
  const handleValidMessageSubmit = values => {
    const message = values["newMessage"];
    onNewMessagesPosted(message);
    reset();
  };
  return <>
      <form className="mt-2" name="chat-form" id="chat-form" onSubmit={handleSubmit(handleValidMessageSubmit)}>
        <Row>
          <Col>
            <FormInput type="text" name="newMessage" className="form-control chat-input" placeholder="Enter your text" register={register} key="newMessage" errors={errors} control={control} />
          </Col>
          <Col>
            <button type="submit" className="btn btn-primary chat-send width-sm waves-effect waves-light">
              Send
            </button>
          </Col>
        </Row>
      </form>
    </>;
};

/**
 * ChatList
 */

/**
 * Renders the ChatList
 */
const ChatList = props => {
  const [messages, setMessages] = useState(props.messages);

  /**
   * Handle new message posted
   */
  const handleNewMessagePosted = message => {
    // save new message
    setMessages(messages.concat({
      id: messages.length + 1,
      userPic: profilePic,
      userName: "Dominic",
      text: message,
      postedOn: new Date().getHours() + ":" + new Date().getMinutes()
    }));
  };
  return <>
      <Card>
        <CardBody>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle as="a" className="cursor-pointer arrow-none card-drop">
              <i className="mdi mdi-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Action</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h4 className="header-title mb-3">{props.title}</h4>

          <div className="chat-conversation">
            {/* chat messages */}
            <SimpleBar style={{
            maxHeight: "358px",
            width: "100%"
          }}>
              <ul className={classNames("conversation-list", props.className)}>
                {(messages || []).map((message, i) => {
                return <ChatItem key={i} placement={message.userName === "Dominic" ? "left" : "right"}>
                      {message.userPic && <ChatItemAvatar userAvatar={message.userPic} postedOn={message.postedOn} />}
                      <ChatItemText userName={message.userName} text={message.text} />
                    </ChatItem>;
              })}
              </ul>
            </SimpleBar>

            {/* chat form */}
            <ChatForm onNewMessagesPosted={handleNewMessagePosted} />
          </div>
        </CardBody>
      </Card>
    </>;
};
export default ChatList;