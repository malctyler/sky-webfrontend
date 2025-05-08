import {generateDayWiseTimeSeries} from "@/utils/chart";
import {ApexOptions} from "apexcharts";

export interface Range {
    min: number;
    max: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface ApexLinearChartData {
    [key: string]: number[] | Point[] | [number, number][];
}

export interface ApexNonLinearChartData {
    [key: string]: number[];
}

export interface SparkLineChartData {
    name: string;
    data: number[];
}

export interface CandleStickChartData {
    data: {
        x: Date;
        y: number | number[];
    }[];
}

/**
 * Generates the data
 * @param {*} baseval
 * @param {*} count
 * @param {*} yrange
 */
function generateData(baseval: number, count: number, yrange: Range): any[] {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        const y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}

/**
 * Generates the alt data
 * @param {*} baseval1
 * @param {*} count
 * @param {*} yrange
 */
function generateData1(baseval1: number, count: number, yrange: Range): any[] {
    let i = 0;
    const series = [];
    while (i < count) {
        //const x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
        const y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([baseval1, y, z]);
        baseval1 += 86400000;
        i++;
    }
    return series;
}

const randomizeArray = (data: number[]) => {
    const array = data;
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// data for the sparklines that appear below header area
const sparklineData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
];

const sparkLineData1: SparkLineChartData = {
    name: "Minton Sales ",
    data: randomizeArray(sparklineData),
};

const sparkLineData2: SparkLineChartData = {
    name: "Minton Expenses ",
    data: randomizeArray(sparklineData),
};

const sparkLineData3: SparkLineChartData = {
    name: "Net Profits ",
    data: randomizeArray(sparklineData),
};

// chart options
const lineChartWithData: ApexLinearChartData = {
    data1: [28, 29, 33, 36, 32, 32, 33],
    data2: [12, 11, 14, 18, 17, 13, 13],
};

const gradientLineChartData: ApexLinearChartData = {
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
};

const stackedAreaChartData: ApexLinearChartData = {
    data1: generateDayWiseTimeSeries(new Date("11 Feb 2019 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data2: generateDayWiseTimeSeries(new Date("11 Feb 2019 GMT").getTime(), 20, {
        min: 10,
        max: 20,
    }),

    data3: generateDayWiseTimeSeries(new Date("11 Feb 2019 GMT").getTime(), 20, {
        min: 10,
        max: 15,
    }),
};

const basicColumnChartData: ApexLinearChartData = {
    data1: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    data2: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    data3: [35, 41, 36, 26, 45, 48, 52, 53, 41],
};

const columnChartData: ApexLinearChartData = {
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
};

const mixedChart1Data: ApexLinearChartData = {
    data1: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
    data2: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
};

const basicBarChartData: ApexLinearChartData = {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
};

const barWithNegativeData: ApexLinearChartData = {
    data1: [
        0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5,
        3.9, 3.5, 3,
    ],
    data2: [
        -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3,
        -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
    ],
};

const mixedChart2Data: ApexLinearChartData = {
    data1: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    data2: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    data3: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
};

const multiYaxisChartData: ApexLinearChartData = {
    data1: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    data2: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    data3: [20, 29, 37, 36, 44, 45, 50, 58],
};

const bubbleChartData: ApexLinearChartData = {
    data1: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data2: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),
    data3: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),
};

const threeDBubbleChartData: ApexLinearChartData = {
    data1: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data2: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data3: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data4: generateData1(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),
};

const scatterChartData: ApexLinearChartData = {
    data1: [
        [16.4, 5.4],
        [21.7, 2],
        [25.4, 3],
        [19, 2],
        [10.9, 1],
        [13.6, 3.2],
        [10.9, 7.4],
        [10.9, 0],
        [10.9, 8.2],
        [16.4, 0],
        [16.4, 1.8],
        [13.6, 0.3],
        [13.6, 0],
        [29.9, 0],
        [27.1, 2.3],
        [16.4, 0],
        [13.6, 3.7],
        [10.9, 5.2],
        [16.4, 6.5],
        [10.9, 0],
        [24.5, 7.1],
        [10.9, 0],
        [8.1, 4.7],
        [19, 0],
        [21.7, 1.8],
        [27.1, 0],
        [24.5, 0],
        [27.1, 0],
        [29.9, 1.5],
        [27.1, 0.8],
        [22.1, 2],
    ],
    data2: [
        [6.4, 13.4],
        [1.7, 11],
        [5.4, 8],
        [9, 17],
        [1.9, 4],
        [3.6, 12.2],
        [1.9, 14.4],
        [1.9, 9],
        [1.9, 13.2],
        [1.4, 7],
        [6.4, 8.8],
        [3.6, 4.3],
        [1.6, 10],
        [9.9, 2],
        [7.1, 15],
        [1.4, 0],
        [3.6, 13.7],
        [1.9, 15.2],
        [6.4, 16.5],
        [0.9, 10],
        [4.5, 17.1],
        [10.9, 10],
        [0.1, 14.7],
        [9, 10],
        [12.7, 11.8],
        [2.1, 10],
        [2.5, 10],
        [27.1, 10],
        [2.9, 11.5],
        [7.1, 10.8],
        [2.1, 12],
    ],
    data3: [
        [21.7, 3],
        [23.6, 3.5],
        [24.6, 3],
        [29.9, 3],
        [21.7, 20],
        [23, 2],
        [10.9, 3],
        [28, 4],
        [27.1, 0.3],
        [16.4, 4],
        [13.6, 0],
        [19, 5],
        [22.4, 3],
        [24.5, 3],
        [32.6, 3],
        [27.1, 4],
        [29.6, 6],
        [31.6, 8],
        [21.6, 5],
        [20.9, 4],
        [22.4, 0],
        [32.6, 10.3],
        [29.7, 20.8],
        [24.5, 0.8],
        [21.4, 0],
        [21.7, 6.9],
        [28.6, 7.7],
        [15.4, 0],
        [18.1, 0],
        [33.4, 0],
        [16.4, 0],
    ],
};

const scatterDateTimeChartData: ApexLinearChartData = {
    data1: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),

    data2: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
    }),
    data3: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 30, {
        min: 10,
        max: 60,
    }),
    data4: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
        min: 10,
        max: 60,
    }),
    data5: generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 30, {
        min: 10,
        max: 60,
    }),
};

const candleStickChartData1: CandleStickChartData = {
    data: [
        {
            x: new Date(2016, 1, 1),
            y: [51.98, 56.29, 51.59, 53.85],
        },
        {
            x: new Date(2016, 2, 1),
            y: [53.66, 54.99, 51.35, 52.95],
        },
        {
            x: new Date(2016, 3, 1),
            y: [52.96, 53.78, 51.54, 52.48],
        },
        {
            x: new Date(2016, 4, 1),
            y: [52.54, 52.79, 47.88, 49.24],
        },
        {
            x: new Date(2016, 5, 1),
            y: [49.1, 52.86, 47.7, 52.78],
        },
        {
            x: new Date(2016, 6, 1),
            y: [52.83, 53.48, 50.32, 52.29],
        },
        {
            x: new Date(2016, 7, 1),
            y: [52.2, 54.48, 51.64, 52.58],
        },
        {
            x: new Date(2016, 8, 1),
            y: [52.76, 57.35, 52.15, 57.03],
        },
        {
            x: new Date(2016, 9, 1),
            y: [57.04, 58.15, 48.88, 56.19],
        },
        {
            x: new Date(2016, 10, 1),
            y: [56.09, 58.85, 55.48, 58.79],
        },
        {
            x: new Date(2016, 11, 1),
            y: [58.78, 59.65, 58.23, 59.05],
        },
        {
            x: new Date(2017, 0, 1),
            y: [59.37, 61.11, 59.35, 60.34],
        },
        {
            x: new Date(2017, 1, 1),
            y: [60.4, 60.52, 56.71, 56.93],
        },
        {
            x: new Date(2017, 2, 1),
            y: [57.02, 59.71, 56.04, 56.82],
        },
        {
            x: new Date(2017, 3, 1),
            y: [56.97, 59.62, 54.77, 59.3],
        },
        {
            x: new Date(2017, 4, 1),
            y: [59.11, 62.29, 59.1, 59.85],
        },
        {
            x: new Date(2017, 5, 1),
            y: [59.97, 60.11, 55.66, 58.42],
        },
        {
            x: new Date(2017, 6, 1),
            y: [58.34, 60.93, 56.75, 57.42],
        },
        {
            x: new Date(2017, 7, 1),
            y: [57.76, 58.08, 51.18, 54.71],
        },
        {
            x: new Date(2017, 8, 1),
            y: [54.8, 61.42, 53.18, 57.35],
        },
        {
            x: new Date(2017, 9, 1),
            y: [57.56, 63.09, 57.0, 62.99],
        },
        {
            x: new Date(2017, 10, 1),
            y: [62.89, 63.42, 59.72, 61.76],
        },
        {
            x: new Date(2017, 11, 1),
            y: [61.71, 64.15, 61.29, 63.04],
        },
    ],
};

const candleStickChartLinearData: CandleStickChartData = {
    data: [
        {
            x: new Date(2016, 1, 1),
            y: 3.85,
        },
        {
            x: new Date(2016, 2, 1),
            y: 2.95,
        },
        {
            x: new Date(2016, 3, 1),
            y: -12.48,
        },
        {
            x: new Date(2016, 4, 1),
            y: 19.24,
        },
        {
            x: new Date(2016, 5, 1),
            y: 12.78,
        },
        {
            x: new Date(2016, 6, 1),
            y: 22.29,
        },
        {
            x: new Date(2016, 7, 1),
            y: -12.58,
        },
        {
            x: new Date(2016, 8, 1),
            y: -17.03,
        },
        {
            x: new Date(2016, 9, 1),
            y: -19.19,
        },
        {
            x: new Date(2016, 10, 1),
            y: -28.79,
        },
        {
            x: new Date(2016, 11, 1),
            y: -39.05,
        },
        {
            x: new Date(2017, 0, 1),
            y: 20.34,
        },
        {
            x: new Date(2017, 1, 1),
            y: 36.93,
        },
        {
            x: new Date(2017, 2, 1),
            y: 36.82,
        },
        {
            x: new Date(2017, 3, 1),
            y: 29.3,
        },
        {
            x: new Date(2017, 4, 1),
            y: 39.85,
        },
        {
            x: new Date(2017, 5, 1),
            y: 28.42,
        },
        {
            x: new Date(2017, 6, 1),
            y: 37.42,
        },
        {
            x: new Date(2017, 7, 1),
            y: 24.71,
        },
        {
            x: new Date(2017, 8, 1),
            y: 37.35,
        },
        {
            x: new Date(2017, 9, 1),
            y: 32.99,
        },
        {
            x: new Date(2017, 10, 1),
            y: 31.76,
        },
        {
            x: new Date(2017, 11, 1),
            y: 43.04,
        },
    ],
};

const pieChartData: ApexNonLinearChartData = {
    data: [44, 55, 41, 17, 15],
};
const colors1 = ["#3e60d5", "#6c757d", "#47ad77", "#fa5c7c", "#e3eaef"];

const gradientDonutChartData: ApexOptions = {
    chart: {
        height: 320,
        type: "donut",
    },
    series: [44, 55, 41, 17, 15],
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        // verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7,
    },
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: colors1,
    fill: {
        type: "gradient",
    },
};

const patternedDonutChartData: ApexOptions = {
    chart: {
        height: 320,
        type: "donut",
        dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
        },
    },
    stroke: {
        show: true,
        width: 2,
    },
    series: [44, 55, 41, 17, 15],
    colors: ["#39afd1", "#ffbc00", "#313a46", "#fa5c7c", "#47ad77"],
    labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
    dataLabels: {
        dropShadow: {
            blur: 3,
            opacity: 0.8,
        },
    },
    fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
            // enabled: true,
            style: [
                "verticalLines",
                "squares",
                "horizontalLines",
                "circles",
                "slantedLines",
            ],
        },
    },
    states: {
        hover: {
            // enabled: false
        },
    },
    legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        // verticalAlign: 'middle',
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: 7,
    }
};

const radarChartData: ApexOptions = {
    chart: {
        height: 320,
        type: "radialBar",
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: "70%",
            },
            track: {
                background: "rgba(170,184,197, 0.2)",
            },
        },
    },
    colors: ["#39afd1"],
    series: [70],
    labels: ["CRICKET"],
};

const multiRadarChartData: ApexOptions = {
    chart: {
        height: 320,
        type: "radialBar",
    },
    plotOptions: {
        // circle: {
        //     dataLabels: {
        //         showOn: 'hover'
        //     }
        // },
        radialBar: {
            track: {
                background: "rgba(170,184,197, 0.2)",
            },
        },
    },
    colors: ["#6c757d", "#ffbc00", "#3e60d5", "#47ad77"],
    series: [44, 55, 67, 83],
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
};

const gaugeChartData: ApexOptions = {
    chart: {
        height: 380,
        type: "radialBar",
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: "16px",
                    color: undefined,
                    offsetY: 120,
                },
                value: {
                    offsetY: 76,
                    fontSize: "22px",
                    color: undefined,
                    // formatter: function (val) {
                    //   return val + "%";
                    // },
                },
            },
            track: {
                background: "rgba(170,184,197, 0.2)",
                margin: 0,
            },
        },
    },
    fill: {
        gradient: {
            // enabled: true,
            shade: "dark",
            shadeIntensity: 0.2,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
        },
    },
    stroke: {
        dashArray: 4,
    },
    colors: ["#3e60d5"],
    series: [67],
    labels: ["Median Ratio"]
};

const CandlestickwithLineOps: ApexOptions = {
    series: [
        {
            name: "Line",
            type: "line",
            data: [
                {
                    x: new Date(1538778600000),
                    y: 6604,
                },
                {
                    x: new Date(1538782200000),
                    y: 6602,
                },
                {
                    x: new Date(1538814600000),
                    y: 6607,
                },
                {
                    x: new Date(1538884800000),
                    y: 6620,
                },
            ],
        },
        {
            name: "Candle",
            type: "candlestick",
            data: [
                {
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33],
                },
                {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11],
                },
                {
                    x: new Date(1538782200000),
                    y: [6630.71, 6648.95, 6623.34, 6635.65],
                },
                {
                    x: new Date(1538784000000),
                    y: [6635.65, 6651, 6629.67, 6638.24],
                },
                {
                    x: new Date(1538785800000),
                    y: [6638.24, 6640, 6620, 6624.47],
                },
                {
                    x: new Date(1538787600000),
                    y: [6624.53, 6636.03, 6621.68, 6624.31],
                },
                {
                    x: new Date(1538789400000),
                    y: [6624.61, 6632.2, 6617, 6626.02],
                },
                {
                    x: new Date(1538791200000),
                    y: [6627, 6627.62, 6584.22, 6603.02],
                },
                {
                    x: new Date(1538793000000),
                    y: [6605, 6608.03, 6598.95, 6604.01],
                },
                {
                    x: new Date(1538794800000),
                    y: [6604.5, 6614.4, 6602.26, 6608.02],
                },
                {
                    x: new Date(1538796600000),
                    y: [6608.02, 6610.68, 6601.99, 6608.91],
                },
                {
                    x: new Date(1538798400000),
                    y: [6608.91, 6618.99, 6608.01, 6612],
                },
                {
                    x: new Date(1538800200000),
                    y: [6612, 6615.13, 6605.09, 6612],
                },
                {
                    x: new Date(1538802000000),
                    y: [6612, 6624.12, 6608.43, 6622.95],
                },
                {
                    x: new Date(1538803800000),
                    y: [6623.91, 6623.91, 6615, 6615.67],
                },
                {
                    x: new Date(1538805600000),
                    y: [6618.69, 6618.74, 6610, 6610.4],
                },
                {
                    x: new Date(1538807400000),
                    y: [6611, 6622.78, 6610.4, 6614.9],
                },
                {
                    x: new Date(1538809200000),
                    y: [6614.9, 6626.2, 6613.33, 6623.45],
                },
                {
                    x: new Date(1538811000000),
                    y: [6623.48, 6627, 6618.38, 6620.35],
                },
                {
                    x: new Date(1538812800000),
                    y: [6619.43, 6620.35, 6610.05, 6615.53],
                },
                {
                    x: new Date(1538814600000),
                    y: [6615.53, 6617.93, 6610, 6615.19],
                },
                {
                    x: new Date(1538816400000),
                    y: [6615.19, 6621.6, 6608.2, 6620],
                },
                {
                    x: new Date(1538818200000),
                    y: [6619.54, 6625.17, 6614.15, 6620],
                },
                {
                    x: new Date(1538820000000),
                    y: [6620.33, 6634.15, 6617.24, 6624.61],
                },
                {
                    x: new Date(1538821800000),
                    y: [6625.95, 6626, 6611.66, 6617.58],
                },
                {
                    x: new Date(1538823600000),
                    y: [6619, 6625.97, 6595.27, 6598.86],
                },
                {
                    x: new Date(1538825400000),
                    y: [6598.86, 6598.88, 6570, 6587.16],
                },
                {
                    x: new Date(1538827200000),
                    y: [6588.86, 6600, 6580, 6593.4],
                },
                {
                    x: new Date(1538829000000),
                    y: [6593.99, 6598.89, 6585, 6587.81],
                },
                {
                    x: new Date(1538830800000),
                    y: [6587.81, 6592.73, 6567.14, 6578],
                },
                {
                    x: new Date(1538832600000),
                    y: [6578.35, 6581.72, 6567.39, 6579],
                },
                {
                    x: new Date(1538834400000),
                    y: [6579.38, 6580.92, 6566.77, 6575.96],
                },
                {
                    x: new Date(1538836200000),
                    y: [6575.96, 6589, 6571.77, 6588.92],
                },
                {
                    x: new Date(1538838000000),
                    y: [6588.92, 6594, 6577.55, 6589.22],
                },
                {
                    x: new Date(1538839800000),
                    y: [6589.3, 6598.89, 6589.1, 6596.08],
                },
                {
                    x: new Date(1538841600000),
                    y: [6597.5, 6600, 6588.39, 6596.25],
                },
                {
                    x: new Date(1538843400000),
                    y: [6598.03, 6600, 6588.73, 6595.97],
                },
                {
                    x: new Date(1538845200000),
                    y: [6595.97, 6602.01, 6588.17, 6602],
                },
                {
                    x: new Date(1538847000000),
                    y: [6602, 6607, 6596.51, 6599.95],
                },
                {
                    x: new Date(1538848800000),
                    y: [6600.63, 6601.21, 6590.39, 6591.02],
                },
                {
                    x: new Date(1538850600000),
                    y: [6591.02, 6603.08, 6591, 6591],
                },
                {
                    x: new Date(1538852400000),
                    y: [6591, 6601.32, 6585, 6592],
                },
                {
                    x: new Date(1538854200000),
                    y: [6593.13, 6596.01, 6590, 6593.34],
                },
                {
                    x: new Date(1538856000000),
                    y: [6593.34, 6604.76, 6582.63, 6593.86],
                },
                {
                    x: new Date(1538857800000),
                    y: [6593.86, 6604.28, 6586.57, 6600.01],
                },
                {
                    x: new Date(1538859600000),
                    y: [6601.81, 6603.21, 6592.78, 6596.25],
                },
                {
                    x: new Date(1538861400000),
                    y: [6596.25, 6604.2, 6590, 6602.99],
                },
                {
                    x: new Date(1538863200000),
                    y: [6602.99, 6606, 6584.99, 6587.81],
                },
                {
                    x: new Date(1538865000000),
                    y: [6587.81, 6595, 6583.27, 6591.96],
                },
                {
                    x: new Date(1538866800000),
                    y: [6591.97, 6596.07, 6585, 6588.39],
                },
                {
                    x: new Date(1538868600000),
                    y: [6587.6, 6598.21, 6587.6, 6594.27],
                },
                {
                    x: new Date(1538870400000),
                    y: [6596.44, 6601, 6590, 6596.55],
                },
                {
                    x: new Date(1538872200000),
                    y: [6598.91, 6605, 6596.61, 6600.02],
                },
                {
                    x: new Date(1538874000000),
                    y: [6600.55, 6605, 6589.14, 6593.01],
                },
                {
                    x: new Date(1538875800000),
                    y: [6593.15, 6605, 6592, 6603.06],
                },
                {
                    x: new Date(1538877600000),
                    y: [6603.07, 6604.5, 6599.09, 6603.89],
                },
                {
                    x: new Date(1538879400000),
                    y: [6604.44, 6604.44, 6600, 6603.5],
                },
                {
                    x: new Date(1538881200000),
                    y: [6603.5, 6603.99, 6597.5, 6603.86],
                },
                {
                    x: new Date(1538883000000),
                    y: [6603.85, 6605, 6600, 6604.07],
                },
                {
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606],
                },
            ],
        },
    ],
    chart: {
        height: 380,
        type: "line",
    },
    title: {
        text: "CandleStick Chart",
        align: "left",
    },
    stroke: {
        width: [3, 1],
        colors: ["rgba(62,96,213,0.85)"],
    },
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 5,
    },
    grid: {
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
        },
    },
    colors: ["#3e60d5", "#47ad77", "#fa5c7c"],
    plotOptions: {
        candlestick: {
            colors: {
                upward: "#47ad77",
                downward: "#fa5c7c",
            },
        },
    },
    // tooltip: {
    //     shared: true,
    //     custom: [function (_ref) {
    //         let seriesIndex = _ref.seriesIndex;
    //         let dataPointIndex = _ref.dataPointIndex;
    //         let w = _ref.w;

    //         return w.globals.series[seriesIndex][dataPointIndex];
    //     }, function (_ref2) {
    //         let seriesIndex = _ref2.seriesIndex;
    //         let dataPointIndex = _ref2.dataPointIndex;
    //         let w = _ref2.w;

    //         let o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
    //         let h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
    //         let l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
    //         let c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
    //         return '<div class="apexcharts-tooltip-candlestick">' + '<div>Open: <span class="value">' + o + '</span></div>' + '<div>High: <span class="value">' + h + '</span></div>' + '<div>Low: <span class="value">' + l + '</span></div>' + '<div>Close: <span class="value">' + c + '</span></div>' + '</div>';
    //     }]
    // },
    xaxis: {
        type: "datetime",
    },
};
export {
    sparkLineData1,
    sparkLineData2,
    sparkLineData3,
    lineChartWithData,
    gradientLineChartData,
    stackedAreaChartData,
    barWithNegativeData,
    basicBarChartData,
    bubbleChartData,
    basicColumnChartData,
    columnChartData,
    mixedChart1Data,
    mixedChart2Data,
    multiYaxisChartData,
    threeDBubbleChartData,
    scatterChartData,
    scatterDateTimeChartData,
    candleStickChartData1,
    candleStickChartLinearData,
    pieChartData,
    patternedDonutChartData,
    gaugeChartData,
    gradientDonutChartData,
    radarChartData,
    multiRadarChartData,
    CandlestickwithLineOps
};
