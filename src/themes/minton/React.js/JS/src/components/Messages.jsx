import { Card, CardBody, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

//components
import MessageList from "./MessageList";
import MessageItem from "./MessageItem";

// images
import profileImg from "@/assets/images/users/avatar-2.jpg";
import avatar1 from "@/assets/images/users/avatar-3.jpg";
import avatar2 from "@/assets/images/users/avatar-4.jpg";
import avatar3 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
const Messages = () => {
  const messages = [{
    id: 1,
    avatar: profileImg,
    sender: "Tomaslau",
    text: "I've finished it! See you so..."
  }, {
    id: 2,
    avatar: avatar1,
    sender: "Stillnotdavid",
    text: "This theme is awesome!"
  }, {
    id: 3,
    avatar: avatar2,
    sender: "Kurafire",
    text: "Minton is awesome theme!"
  }, {
    id: 4,
    avatar: avatar3,
    sender: "Shahedk",
    text: "This theme is awesome"
  }, {
    id: 5,
    avatar: avatar6,
    sender: "Adhamdannaway",
    text: "Minton theme is awesome"
  }, {
    id: 6,
    avatar: avatar1,
    sender: "Stillnotdavid",
    text: "This theme is awesome!"
  }, {
    id: 7,
    avatar: avatar2,
    sender: "Kurafire",
    text: "Nice to meet you"
  }];
  return <Card>
      <CardBody>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h4 className="header-title mb-3">Inbox</h4>

        <MessageList>
          {(messages || []).map((message, i) => {
          return <MessageItem key={i}>
                <div className="inbox-item-img">
                  <img src={message.avatar} className="rounded-circle" alt="" height={40} width={40} />
                </div>
                <p className="inbox-item-author">{message.sender}</p>
                <p className="inbox-item-text">{message.text}</p>
                <p className="inbox-item-date">
                  <Link to="" className="btn btn-sm btn-link text-info font-13">
                    {" "}
                    Reply{" "}
                  </Link>
                </p>
              </MessageItem>;
        })}
        </MessageList>
      </CardBody>
    </Card>;
};
export default Messages;