// data

import ReactApexChart from "react-apexcharts";
// simple line chart
const SparkLineChart = ({
  sparkLineChartData,
  colors,
  titleText,
  subTitleText
}) => {
  // default options
  const sparkLineChartOptions = {
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      width: 2,
      curve: "straight"
    },
    fill: {
      opacity: 0.2
    },
    yaxis: {
      min: 0
    },
    colors: colors,
    title: {
      text: titleText,
      offsetX: 10,
      style: {
        fontSize: "22px"
      }
    },
    subtitle: {
      text: subTitleText,
      offsetX: 10,
      offsetY: 35,
      style: {
        fontSize: "13px"
      }
    }
  };

  // chart data
  const sparkLineChartSeries = [sparkLineChartData];
  return <>
            <ReactApexChart options={sparkLineChartOptions} series={sparkLineChartSeries} type="area" height={160} />
        </>;
};
export default SparkLineChart;