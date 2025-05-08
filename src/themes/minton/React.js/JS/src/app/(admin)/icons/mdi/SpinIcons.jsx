import { Row, Col } from "react-bootstrap";
import classNames from "classnames";
const SpinIcons = ({
  icons
}) => {
  return <Row className="icons-list-demo">
      {(icons || []).map((icon, index) => {
      return <Col sm={6} lg={4} xl={3} key={index}>
            <i className={classNames("mdi", "mdi-spin", "mdi-" + icon)}></i>{" "}
            mdi-spin
          </Col>;
    })}
    </Row>;
};
export default SpinIcons;