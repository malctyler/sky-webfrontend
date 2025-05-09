import CountUp from "react-countup";
import classNames from "classnames";
import { Card, CardBody } from "react-bootstrap";
const StatisticsWidget = ({
  icon,
  stats,
  title,
  trend,
  counterOptions
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <h5 className="text-muted fw-normal mt-0 text-truncate" title="Campaign Sent">
              {title}
            </h5>
            <h3 className="my-2 py-1">
              <span>
                <CountUp duration={1} end={stats} {...counterOptions} separator={","} />
              </span>
            </h3>
            <p className="mb-0 text-muted">
              <span className={classNames("me-2", "text-" + trend.variant)}>
                <span className={trend.icon}></span>
                {trend.value}
              </span>
              <span className="text-nowrap">{trend.title}</span>
            </p>
          </div>
          <div className="avatar-sm">
            <span className="avatar-title bg-soft-primary rounded">
              <i className={classNames("font-20", "text-primary", icon)}></i>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default StatisticsWidget;