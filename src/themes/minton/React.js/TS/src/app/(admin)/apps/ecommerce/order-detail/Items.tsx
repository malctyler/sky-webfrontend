

import { Table } from "react-bootstrap";
import { OrderDetailsType } from "./types";

const Items = ({ order }: { order: OrderDetailsType }) => {
  return (
    <div>
      <Table responsive className="table-centered border table-nowrap mb-lg-0">
        <thead className="bg-light">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {(order.items || []).map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src={item.image} alt="" height={40} width={40} />
                    </div>
                    <div className="flex-1">
                      <h5 className="m-0">{item.name}</h5>
                      <p className="mb-0">Size : {item.size}</p>
                    </div>
                  </div>
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Items