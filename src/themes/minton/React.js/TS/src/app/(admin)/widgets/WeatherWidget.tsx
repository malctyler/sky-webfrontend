
import classNames from "classnames";

// types
import { WeatherTypes } from "./data";
import { Card, CardBody, Col, Row } from "react-bootstrap";

interface WeatherWidgetProps {
  item: WeatherTypes;
}

const WeatherWidget = ({ item }: WeatherWidgetProps) => {
  return (
    <Card className={classNames( "bg-" + item.variant, "border-" + item.variant)}>
      <CardBody>
        <Row>
          <Col md={7}>
            <Row className="align-items-center">
              <Col xs={6} className=" text-center">
                <h1 className="display-4">
                  <i className="wi wi-day-sleet text-white"></i>
                </h1>
              </Col>
              <Col xs={6}>
                <div className="text-white">
                  <h2 className="text-white">
                    <b>{item.temp}</b>
                  </h2>
                  <p>{item.clouds}</p>
                  <p className=" mb-0">
                    {item.windSpeed} - {item.humidity}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <Row>
              {(item.forecast || []).map((item, index) => {
                return (
                  <Col xs={4} className="text-center" key={index}>
                    <h4 className="text-white mt-0">{item.day}</h4>
                    <h3 className="my-3">
                      <i className={classNames("text-white", item.icon)}></i>
                    </h3>
                    <h4 className="text-white mb-0">
                      {item.temp}
                      <i className="wi wi-degrees"></i>
                    </h4>
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WeatherWidget;
