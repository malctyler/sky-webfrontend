
import { Table } from "react-bootstrap";
import { ShippingAddress } from "./types";

const ShippingInfo = (props: { details: ShippingAddress }) => {
  const details = props.details || {};
  return (
    <Table borderless size="sm" className="mb-0">
      <tbody>
        <tr>
          <th colSpan={2}>
            <h5 className="font-15 m-0">{details.provider}</h5>
          </th>
        </tr>
        <tr>
          <th scope="row">Address:</th>
          <td>{details.address}</td>
        </tr>
        <tr>
          <th scope="row">Phone :</th>
          <td>{details.phone}</td>
        </tr>
        <tr>
          <th scope="row">Mobile :</th>
          <td>{details.mobile}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ShippingInfo