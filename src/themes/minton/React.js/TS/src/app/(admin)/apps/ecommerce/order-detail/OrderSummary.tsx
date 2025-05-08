
import { Table } from "react-bootstrap";
import { OrderDetailsType } from "./types";

const OrderSummary = ({ order }: { order: OrderDetailsType }) => {
  return (
    <div>
      <Table responsive className="table table-centered border mb-0">
        <thead className="bg-light">
          <tr>
            <th colSpan={2}>Order summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Sub Total :</th>
            <td>{order.sub_total}</td>
          </tr>
          <tr>
            <th scope="row">Shipping Charge :</th>
            <td>{order.shipping_charge}</td>
          </tr>
          <tr>
            <th scope="row">Estimated Tax :</th>
            <td>{order.tax}</td>
          </tr>
          <tr>
            <th scope="row">Total :</th>
            <td>{order.net_total}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderSummary