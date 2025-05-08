
import classNames from "classnames";
import { Card, CardBody } from "react-bootstrap";

interface Statistics3Props {
  variant: string;
  title: string;
  icon: string;
  stats: string;
  trend: {
    value: string;
    variant: string;
  };
}

const Statistics3 = ({
  stats,
  icon,
  variant,
  title,
  trend,
}: Statistics3Props) => {
  return (
    <Card className="widget-icon">
      <CardBody>
        <div className="d-flex align-items-start">
          <div className="avatar-lg">
            <i
              className={classNames(
                "avatar-title",
                "display-4",
                "m-0",
                "text-" + variant,
                icon
              )}
            ></i>
          </div>
          <div className="wid-icon-info flex-1 text-end">
            <p className="text-muted mb-1 font-13 text-uppercase">{title}</p>
            <h4 className="mb-1 counter">{stats}</h4>
            <small className={classNames("text-" + trend.variant)}>
              <b>{trend.value}</b>
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Statistics3;
