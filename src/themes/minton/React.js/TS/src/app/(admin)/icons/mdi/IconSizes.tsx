
import { Row, Col } from "react-bootstrap";
import classNames from "classnames";

interface IconSizeProps {
  sizeList: number[];
}

const IconSizes = ({ sizeList }: IconSizeProps) => {
  return (
    <Row className="icons-list-demo">
      {(sizeList || []).map((size, index) => {
        return (
          <Col sm={6} lg={4} xl={3} key={index}>
            <i
              className={classNames(
                "mdi",
                "mdi-" + size + "px",
                " mdi-account"
              )}
            ></i>{" "}
            mdi-{size}px
          </Col>
        );
      })}
    </Row>
  );
};

export default IconSizes;
