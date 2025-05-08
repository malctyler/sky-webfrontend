import classNames from "classnames";
import { useState } from "react";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";

// dummy data
import { Table } from "@/components";
import { Link } from "react-router-dom";
import { orders } from "../data";

/* order column render */
const OrderColumn = ({
  row
}) => {
  return <>
      <Link to="/apps/ecommerce/order/detail" className="text-body fw-medium">
        #MN{"0" + row.original.order_id.slice(-3)}
      </Link>
    </>;
};

/* orderdate column render */
const OrderDateColumn = ({
  row
}) => {
  return <>
      {row.original.order_date}{" "}
      <small className="text-muted">{row.original.order_time}</small>
    </>;
};

/* payment column render */
const PaymentStatusColumn = ({
  row
}) => {
  return <div>
      <span className={classNames("badge", {
      "bg-soft-success text-success": row.original.payment_status === "Paid",
      "bg-soft-danger text-danger": row.original.payment_status === "Payment Failed",
      "bg-soft-info text-info": row.original.payment_status === "Unpaid",
      "bg-soft-warning text-warning": row.original.payment_status === "Awaiting Authorization"
    })}>
        {row.original.payment_status}
      </span>
    </div>;
};

/* status column render */
const StatusColumn = ({
  row
}) => {
  return <>
      <h5>
        <span className={classNames("badge", {
        "bg-success": row.original.order_status === "Delivered",
        "bg-danger": row.original.order_status === "Cancelled",
        "bg-info": row.original.order_status === "Shipped",
        "bg-warning": row.original.order_status === "Processing"
      })}>
          {row.original.order_status}
        </span>
      </h5>
    </>;
};

/* action column render */
const ActionColumn = () => {
  return <>
      <Link to="" className="action-icon">
        {" "}
        <i className="mdi mdi-eye"></i>
      </Link>
      <Link to="" className="action-icon">
        {" "}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link to="" className="action-icon">
        {" "}
        <i className="mdi mdi-delete"></i>
      </Link>
    </>;
};

// get all columns
const columns = [{
  Header: "Order ID",
  accessor: "order_id",
  Cell: OrderColumn
}, {
  Header: "Billing Name",
  accessor: "billing_name"
}, {
  Header: "Date",
  accessor: "order_date",
  Cell: OrderDateColumn
}, {
  Header: "Payment Status",
  accessor: "payment_status",
  Cell: PaymentStatusColumn
}, {
  Header: "Total",
  accessor: "total"
}, {
  Header: "Payment Method",
  accessor: "payment_method"
}, {
  Header: "Order Status",
  accessor: "order_status",
  Cell: StatusColumn
}, {
  Header: "Action",
  accessor: "action",
  Cell: ActionColumn
}];

// get pagelist to display
const sizePerPageList = [{
  text: "10",
  value: 10
}, {
  text: "20",
  value: 20
}, {
  text: "50",
  value: 50
}];
const OrderList = () => {
  const [orderList, setOrderList] = useState(orders);

  // change order status group
  const changeOrderStatusGroup = OrderStatusGroup => {
    let updatedData = [...orders];
    //  filter
    updatedData = OrderStatusGroup === "All" ? orders : [...orders].filter(o => o.payment_status?.includes(OrderStatusGroup));
    setOrderList(updatedData);
  };
  return <Card>
      <CardBody>
        <Row className="mb-2">
          <Col lg={8}>
            <form className="row gy-2 gx-2 align-items-center justify-content-lg-start justify-content-between">
              <Col xs={'auto'}>
                <div className="d-flex align-items-center w-auto">
                  <label htmlFor="status-select" className="me-2">
                    Status
                  </label>
                  <select className="form-select" id="status-select" onChange={e => changeOrderStatusGroup(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Paid">Paid</option>
                    <option value="Authorization">
                      Awaiting Authorization
                    </option>
                    <option value="Failed">Payment failed</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
              </Col>
            </form>
          </Col>

          <Col lg={4}>
            <div className="text-lg-end mt-xl-0 mt-2">
              <Button className="btn btn-danger mb-2 me-2">
                <i className="mdi mdi-basket me-1"></i> Add New Order
              </Button>
              <Button className="btn btn-light mb-2">Export</Button>
            </div>
          </Col>
        </Row>

        <Table columns={columns} data={orderList} isSearchable={true} pageSize={10} sizePerPageList={sizePerPageList} isSortable={true} pagination={true} isSelectable={true} theadClass="table-light" searchBoxClass="mb-2" />
      </CardBody>
    </Card>;
};
export default OrderList;