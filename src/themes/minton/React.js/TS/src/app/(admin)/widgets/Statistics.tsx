

import classNames from "classnames";
import CountUp from "react-countup";
import { Card, CardBody } from "react-bootstrap";

interface StatisticsProps {
  variant: string;
  description: string;
  stats: string;
  counterOptions?: any;
}

const Statistics = ({
  stats,
  description,
  counterOptions,
  variant,
}: StatisticsProps) => {
  return (
    <Card className="widget-simple text-center">
      <CardBody>
        <h3 className={classNames("mt-0", "text-" + variant)}>
          <span>
            <CountUp duration={1} end={stats} {...counterOptions} />
          </span>
        </h3>
        <p className="text-muted mb-0">{description}</p>
      </CardBody>
    </Card>
  );
};

export default Statistics;
