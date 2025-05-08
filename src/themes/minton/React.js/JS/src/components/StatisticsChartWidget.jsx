;
import { Card, CardBody, Dropdown } from "react-bootstrap";
import CountUp from "react-countup";
import classNames from "classnames";
import ReactApexChart from "react-apexcharts";
const StatisticsChartWidget = ({
  hasHeader,
  title,
  color,
  data,
  stats,
  description,
  counterOptions
}) => {
  const apexOpts = {
    chart: {
      type: "radialBar",
      width: 65,
      height: 65,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "75%"
        },
        track: {
          margin: 0
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: true,
            color: color,
            fontSize: "14px",
            offsetY: 5,
            formatter: val => {
              return String(val);
            }
          }
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: "none"
        }
      }
    },
    colors: [color]
  };
  const apexData = [data];
  return <Card>
      <CardBody>
        {hasHeader && <>
            <Dropdown className="float-end">
              <Dropdown.Toggle as="a" className="arrow-none cursor-pointer card-drop">
                <i className="mdi mdi-dots-horizontal"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else</Dropdown.Item>
                <Dropdown.Item>Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <h4 className="header-title mt-0">{title}</h4>
          </>}

        <div className={classNames({
        "mt-3": hasHeader
      })}>
          <div className="d-flex align-items-start">
            <div dir="ltr">
              <ReactApexChart options={apexOpts} series={apexData} type="radialBar" height={hasHeader ? 75 : 82} width={72} className="apex-charts" />
            </div>
            <div className="flex-1 text-end align-self-center">
              <h3 className="mt-0 mb-1">
                {hasHeader ? stats : <span>
                    <CountUp duration={1} end={stats} {...counterOptions} separator={","} />
                  </span>}
              </h3>
              <p className="text-muted mb-0">{description}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default StatisticsChartWidget;