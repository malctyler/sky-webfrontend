
// components
import PageBreadcrumb from "@/components/PageBreadcrumb";

// dummy data
import { Col, Row } from "react-bootstrap";
import { skills } from "./data";
import Skills from "./Skills";
import UserBox from "./UserBox";
import UserProfile from "./UserProfile";


const Profile = () => {
    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Contacts", path: "/apps/contacts/profile"},
                    {label: "Profile", path: "/apps/contacts/profile", active: true},
                ]}
                title={"Profile"}
            />
            <Row>
                <Col xl={4} lg={4}>
                    {/* User information */}
                    <UserBox/>

                    {/* User's skills */}
                    <Skills skills={skills}/>
                </Col>

                <Col xl={8} lg={8}>
                    <UserProfile/>
                </Col>
            </Row>
        </>
    );
};

export default Profile;
