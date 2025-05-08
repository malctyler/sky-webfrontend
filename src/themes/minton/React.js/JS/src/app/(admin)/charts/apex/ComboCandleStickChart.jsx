// components

// types
import { CandlestickwithLineOps } from "./data";
import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
const ComboCandleStickChart = () => {
  return <Card>
            <Card.Body>
                <h5 className="header-title mb-0">Combo Candlestick Chart</h5>
                <div className="pt-3">
                    <ReactApexChart className='apex-charts' options={CandlestickwithLineOps} height={420} series={CandlestickwithLineOps.series} type='candlestick' />
                </div>
            </Card.Body>
        </Card>;
};
export default ComboCandleStickChart;