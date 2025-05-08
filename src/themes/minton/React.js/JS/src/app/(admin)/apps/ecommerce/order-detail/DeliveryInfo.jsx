import { Fragment } from "react";
const DeliveryInfo = props => {
  const details = props.details || {};
  return <Fragment>
      <div className="text-center">
        <div className="my-2">
          <i className="mdi mdi-truck-fast h1 text-muted"></i>
        </div>
        <h5>
          <b>{details.provider}</b>
        </h5>
        <div className="mt-2 pt-1">
          <p className="mb-1">
            <span className="fw-semibold">Order ID :</span> {details.order_id}
          </p>
          <p className="mb-0">
            <span className="fw-semibold">Payment Mode :</span>{" "}
            {details.payment_mode}
          </p>
        </div>
      </div>
    </Fragment>;
};
export default DeliveryInfo;