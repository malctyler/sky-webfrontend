

import {ApexOptions} from "apexcharts";
import {scatterDateTimeChartData} from "@/app/(admin)/charts/apex/data";
import {Card} from "react-bootstrap";


import ReactApexChart from "react-apexcharts";

const ScatterDateTimeChart = () => {
    const options: ApexOptions = {
        chart: {
            height: 380,
            type: "scatter",
            zoom: {
                type: "xy",
            },
        },
        colors: ["#3bafda", "#1abc9c", "#f672a7", "#f672a7", "#6559cc"],
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: "#f1f3fa",
            padding: {
                bottom: 10,
            },
        },
        legend: {
            offsetY: 7,
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            max: 70,
        },
    };

    const series = [
        {
            name: "Team 1",
            data: scatterDateTimeChartData.data1,
        },
        {
            name: "Team 2",
            data: scatterDateTimeChartData.data2,
        },
        {
            name: "Team 3",
            data: scatterDateTimeChartData.data3,
        },
        {
            name: "Team 4",
            data: scatterDateTimeChartData.data4,
        },
        {
            name: "Team 5",
            data: scatterDateTimeChartData.data5,
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Scatter Chart - Datetime</h5>
                <div className="pt-3">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="scatter"
                        height={380}
                        
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ScatterDateTimeChart;
