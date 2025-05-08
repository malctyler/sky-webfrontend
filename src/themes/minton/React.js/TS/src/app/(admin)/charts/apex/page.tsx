

import {Card, Col, Row,CardBody} from "react-bootstrap";

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SparkLineChart from "@/app/(admin)/charts/apex/SparkLineChart";
import LineChart from "@/app/(admin)/charts/apex/LineChart";
import LineGradientChart from "@/app/(admin)/charts/apex/LineGradientChart";
import StackedAreaChart from "@/app/(admin)/charts/apex/StackedAreaChart";
import ColumnChart from "@/app/(admin)/charts/apex/ColumnChart";
import ColumnDataLabelsChart from "@/app/(admin)/charts/apex/ColumnDataLabelsChart";
import MixedChart from "@/app/(admin)/charts/apex/MixedChart";
import BarChart from "@/app/(admin)/charts/apex/BarChart";
import BarChartWithNegativeValues from "@/app/(admin)/charts/apex/BarChartWithNegativeValues";
import LineColumnAreaChart from "@/app/(admin)/charts/apex/LineColumnAreaChart";
import MultipleYaxisChart from "@/app/(admin)/charts/apex/MultipleYaxisChart";
import BubbleChart from "@/app/(admin)/charts/apex/BubbleChart";
import ThreeDBubbleChart from "@/app/(admin)/charts/apex/ThreeDBubbleChart";
import ScatterChart from "@/app/(admin)/charts/apex/ScatterChart";
import ScatterDateTimeChart from "@/app/(admin)/charts/apex/ScatterDateTimeChart";
import CandleStickChart from "@/app/(admin)/charts/apex/CandleStickChart";
import ComboCandleStickChart from "@/app/(admin)/charts/apex/ComboCandleStickChart";
import PieChart from "@/app/(admin)/charts/apex/PieChart";
import DonutChart from "@/app/(admin)/charts/apex/DonutChart";
import DonutPatternedChart from "@/app/(admin)/charts/apex/DonutPatternedChart";
import RadialBarChart from "@/app/(admin)/charts/apex/RadialBarChart";
import RadialBarMultipleChart from "@/app/(admin)/charts/apex/RadialBarMultipleChart";
import CircularGuageChart from "@/app/(admin)/charts/apex/CircularGuageChart";
// data
import {sparkLineData1, sparkLineData2, sparkLineData3} from "@/app/(admin)/charts/apex/data";


const ApexCharts = () => {
    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    {label: "Charts", path: "/charts/apex"},
                    {label: "Apexcharts", path: "/charts/apex", active: true},
                ]}
                title={"Apexcharts"}
            />

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5 className="header-title mb-0">Sparkline Charts</h5>
                            <div className="pt-3">
                                <Row>
                                    <Col md={4}>
                                        <SparkLineChart
                                            sparkLineChartData={sparkLineData1}
                                            colors={["#3bafda"]}
                                            titleText="$424,652"
                                            subTitleText="Total Sales"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <SparkLineChart
                                            sparkLineChartData={sparkLineData2}
                                            colors={["#DCE6EC"]}
                                            titleText="$235,312"
                                            subTitleText="Expenses"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <SparkLineChart
                                            sparkLineChartData={sparkLineData3}
                                            colors={["#1abc9c"]}
                                            titleText="$135,965"
                                            subTitleText="Profits"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <LineChart/>
                </Col>
                <Col xl={6}>
                    <LineGradientChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <StackedAreaChart/>
                </Col>
                <Col xl={6}>
                    <ColumnChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <ColumnDataLabelsChart/>
                </Col>
                <Col xl={6}>
                    <MixedChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <BarChart/>
                </Col>
                <Col xl={6}>
                    <BarChartWithNegativeValues/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <LineColumnAreaChart/>
                </Col>
                <Col xl={6}>
                    <MultipleYaxisChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <BubbleChart/>
                </Col>
                <Col xl={6}>
                    <ThreeDBubbleChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <ScatterChart/>
                </Col>
                <Col xl={6}>
                    <ScatterDateTimeChart/>
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <CandleStickChart/>
                </Col>
                <Col xl={6}>
                    <ComboCandleStickChart/>
                </Col>
            </Row>

            <Row>
                <Col xxl={4} md={6}>
                    <PieChart/>
                </Col>
                <Col xxl={4} md={6}>
                    <DonutChart/>
                </Col>
                <Col xxl={4} md={6}>
                    <DonutPatternedChart/>
                </Col>

                <Col xxl={4} md={6}>
                    <RadialBarChart/>
                </Col>
                <Col xxl={4} md={6}>
                    <RadialBarMultipleChart/>
                </Col>
                <Col xxl={4} md={6}>
                    <CircularGuageChart/>
                </Col>
            </Row>
        </>
    );
};

export default ApexCharts;
