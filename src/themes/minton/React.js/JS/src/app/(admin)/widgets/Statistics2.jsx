import classNames from "classnames";
import CountUp from "react-countup";
import { Card, CardBody } from "react-bootstrap";
const Statistics2 = ({
  stats,
  description,
  icon,
  counterOptions,
  variant
}) => {
  return <Card className="widget-bg-color-icon">
      <CardBody>
        <div className="d-flex align-items-start">
          <div className={classNames("avatar-lg", "rounded-circle", "bg-icon-" + variant)}>
            <i className={classNames("font-24", "avatar-title", icon)}></i>
          </div>
          <div className="flex-1 text-end align-self-center">
            <h3 className="mt-0">
              <span>
                <CountUp duration={1} end={stats} {...counterOptions} separator="," />
              </span>
            </h3>
            <p className="text-muted mb-0">{description}</p>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default Statistics2;