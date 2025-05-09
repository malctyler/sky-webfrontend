import { Button, ButtonGroup, Card, CardBody, Col, Row } from "react-bootstrap";
import classNames from "classnames";
import ReactApexChart from "react-apexcharts";

// chart

const CampaignStatistics = ({
  title,
  stats,
  bulletVariant
}) => {
  return <>
      <h4 className="fw-normal mt-3">
        <span>{stats}</span>
      </h4>
      <p className="text-muted mb-0 mb-2">
        <i className={classNames("mdi", "mdi-checkbox-blank-circle", "text-" + bulletVariant)}></i>{" "}
        {title}
      </p>
    </>;
};
const CampaignsChart = () => {
  const options = {
    chart: {
      height: 280,
      type: "donut"
    },
    legend: {
      show: false,
      position: "bottom",
      horizontalAlign: "center"
    },
    labels: ["Total Sent", "Reached", "Opened"],
    colors: ["#f7b84b", "#1abc9c", "#3bafda"],
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 210
        },
        legend: {
          show: false
        }
      }
    }]
  };
  const series = [44, 55, 41];
  return <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <h4 className="header-title">Campaigns</h4>
          <ButtonGroup className="mb-2">
            <Button variant="light" className="btn-xs active">
              Today
            </Button>
            <Button variant="light" className="btn-xs">
              Weekly
            </Button>
            <Button variant="light" className="btn-xs">
              Monthly
            </Button>
          </ButtonGroup>
        </div>

        <div className="mt-3" dir="ltr">
          <ReactApexChart options={options} series={series} type="donut" height={280} className="apex-charts" />
        </div>

        <Row className="text-center mt-2">
          <Col sm={4}>
            <CampaignStatistics title="Total Sent" stats="6,510" bulletVariant="warning" />
          </Col>

          <Col sm={4}>
            <CampaignStatistics title="Reached" stats="3,487" bulletVariant="success" />
          </Col>

          <Col sm={4}>
            <CampaignStatistics title="Opened" stats="1,568" bulletVariant="primary" />
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
export default CampaignsChart;