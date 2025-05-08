

import {ApexOptions} from "apexcharts";
// data
import {SparkLineChartData} from "./data";

import ReactApexChart from "react-apexcharts";

interface LineChartProps {
    sparkLineChartData: SparkLineChartData;
    colors: string[];
    titleText: string;
    subTitleText: string;
}

// simple line chart
const SparkLineChart = ({
                            sparkLineChartData,
                            colors,
                            titleText,
                            subTitleText,
                        }: LineChartProps) => {
    // default options
    const sparkLineChartOptions: ApexOptions = {
        chart: {
            type: "area",
            height: 160,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            width: 2,
            curve: "straight",
        },
        fill: {
            opacity: 0.2,
        },
        yaxis: {
            min: 0,
        },
        colors: colors,
        title: {
            text: titleText,
            offsetX: 10,
            style: {
                fontSize: "22px",
            },
        },
        subtitle: {
            text: subTitleText,
            offsetX: 10,
            offsetY: 35,
            style: {
                fontSize: "13px",
            },
        },
    };

    // chart data
    const sparkLineChartSeries: SparkLineChartData[] = [sparkLineChartData];

    return (
        <>
            <ReactApexChart
                
                options={sparkLineChartOptions}
                series={sparkLineChartSeries}
                type="area"
                height={160}
            />
        </>
    );
};

export default SparkLineChart;
