import { Row, Col } from "react-bootstrap";
import classNames from "classnames";
const IconSizes = ({
  sizeList
}) => {
  return <Row className="icons-list-demo">
      {(sizeList || []).map((size, index) => {
      return <Col sm={6} lg={4} xl={3} key={index}>
            <i className={classNames("mdi", "mdi-" + size + "px", " mdi-account")}></i>{" "}
            mdi-{size}px
          </Col>;
    })}
    </Row>;
};
export default IconSizes;