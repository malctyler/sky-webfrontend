
import { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import ChatArea from './ChatArea';
import ChatUsers from './ChatUsers';
import { ChatUser, users } from './data';

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState<ChatUser>(users[1]);

    /**
     * On user change
     */
    const onUserChange = (user: ChatUser) => {
        setSelectedUser(user);
    };
    return (
        <Row>
            <Col lg={4} xl={3}>
                <ChatUsers onUserSelect={onUserChange}/>
            </Col>
            <Col lg={8} xl={9}>
                <ChatArea selectedUser={selectedUser}/>
            </Col>
        </Row>
    )
}

export default Chat