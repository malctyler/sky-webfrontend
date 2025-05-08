
import { Row, Col } from "react-bootstrap";
import classNames from "classnames";

// icon data type
import { MdiIconType } from "./data";

interface AllIconsProps {
  icons: MdiIconType[];
}

const AllIcons = ({ icons }: AllIconsProps) => {
  return (
    <Row className="icon-list-demo">
      {(icons || []).map((icon, index) => {
        return (
          <Col sm={6} md={4} lg={3} key={index}>
            <i className={classNames("mdi", "mdi-" + icon.name)}></i>
            <span>mdi-{icon.name}</span>
          </Col>
        );
      })}
    </Row>
  );
};

export default AllIcons;
