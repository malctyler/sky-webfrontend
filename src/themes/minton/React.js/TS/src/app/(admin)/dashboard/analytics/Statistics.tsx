
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Card, CardBody, OverlayTrigger, Tooltip } from "react-bootstrap";

interface StatisticsCardProps {
  title: string;
  stats: number;
  trend: {
    title: string;
    stats: string;
    direction: string;
    rate: string;
  };
}




const Statistics = ({ title, stats, trend }: StatisticsCardProps) => {
  const [updatedStats, setUpdatedStats] = useState<number>(stats);

  useEffect(() => {
    const interval = setInterval(function () {
      const ac = Math.floor(Math.random() * 352 + 142);
      setUpdatedStats(ac);

      // var ac2 = Math.floor(Math.random() * ac + 86);
      // setStats2(ac2);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card>
      <CardBody>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 100 }}
          overlay={(props: any) => (
            <Tooltip id="overlay-example" {...props}>
              More Info
            </Tooltip>
          )}
        >
          <i className="fa fa-info-circle text-muted float-end"></i>
        </OverlayTrigger>
        <h4 className="m-0 font-16">{title}</h4>
        <h2 className="my-3 text-center">{updatedStats}</h2>
        <p className="text-muted m-0">
          {trend.title}: {trend.stats}
          <span className="float-end">
            <i
              className={classNames(
                "mdi",
                {
                  "mdi-arrow-down-bold text-danger": trend.direction === "down",
                },
                { "mdi-arrow-up-bold text-success": trend.direction === "up" },
                "me-1"
              )}
            ></i>
            {trend.rate}
          </span>
        </p>
      </CardBody>
    </Card>
  );
};

export default Statistics;
