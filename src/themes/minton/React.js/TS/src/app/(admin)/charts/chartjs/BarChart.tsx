

import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import { Card, CardBody } from "react-bootstrap";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    LinearScale,
    CategoryScale
);

const BarChart = () => {

    // chart data
    const barChartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Sales Analytics",
                backgroundColor: "#1abc9c",
                borderColor: "#1abc9c",
                hoverBackgroundColor: "#1abc9c",
                hoverBorderColor: "#1abc9c",
                data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
                barPercentage: 0.7,
                categoryPercentage: 0.5,
            },
            {
                label: "Dollar Rate",
                backgroundColor: "#e3eaef",
                borderColor: "#e3eaef",
                hoverBackgroundColor: "#e3eaef",
                hoverBorderColor: "#e3eaef",
                data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
                barPercentage: 0.7,
                categoryPercentage: 0.5,
            },
        ],
    };

    // options
    const barChartOpts = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    display: false,
                    drawBorder: false,
                },
                stacked: false,
                ticks: {
                    stepSize: 20,
                },
            },
            x: {
                stacked: false,
                grid: {
                    drawBorder: false,
                    color: () => "rgba(0,0,0,0.01)",
                },
            },
        },
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title">Bar Chart</h4>

                <div style={{height: "350px"}} className="mt-4 chartjs-chart">
                    <Bar data={barChartData} options={barChartOpts}/>
                </div>
            </CardBody>
        </Card>
    );
};

export default BarChart;
