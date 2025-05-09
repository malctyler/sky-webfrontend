
import { Col, Row } from "react-bootstrap";
import classNames from "classnames";

interface RotateIconProps {
  icons: number[];
}

const RotateIcons = ({ icons }: RotateIconProps) => {
  return (
    <Row className="icons-list-demo">
      {(icons || []).map((icon, index) => {
        return (
          <Col sm={6} lg={4} xl={3} key={index}>
            <i
              className={classNames(
                "mdi",
                "mdi-rotate-" + icon,
                " mdi-account"
              )}
            ></i>{" "}
            mdi-rotate-{icon}
          </Col>
        );
      })}
    </Row>
  );
};

export default RotateIcons;
