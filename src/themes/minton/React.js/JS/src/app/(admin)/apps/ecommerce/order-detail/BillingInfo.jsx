import { Table } from "react-bootstrap";
const BillingInfo = props => {
  const details = props.details || {};
  return <Table borderless size="sm" className="mb-0">
      <tbody>
        <tr>
          <th scope="row">Payment Type:</th>
          <td>{details.type}</td>
        </tr>
        <tr>
          <th scope="row">Provider :</th>
          <td>{details.provider}</td>
        </tr>
        <tr>
          <th scope="row">Valid Date :</th>
          <td>{details.valid}</td>
        </tr>
        <tr>
          <th scope="row">CVV :</th>
          <td>xxx</td>
        </tr>
      </tbody>
    </Table>;
};
export default BillingInfo;