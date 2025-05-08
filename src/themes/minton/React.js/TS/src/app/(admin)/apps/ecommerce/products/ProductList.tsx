
import { products } from "../data";
import { Link } from "react-router-dom";

import classNames from "classnames";
import { Table } from "@/components";

/* product column render */
const ProductColumn = ({ row }: { row: any }) => {
  return (
    <>
      <img
        src={row.original.image}
        alt=""
        title="contact-img"
        className="rounded me-3"
        height={48}
        width={48}
      />

      <h5 className="m-0 d-inline-block align-middle">
        <Link to="/" className="text-dark">
          {row.original.product}
        </Link>
      </h5>
    </>
  );
};

/* rating column render */
const RatingColumn = ({ row }: { row: any }) => {
  return (
    <span
      className={classNames("badge", {
        "bg-success": row.original.rating >= 4,
        "bg-warning": row.original.rating >= 3 && row.original.rating < 4,
        "bg-danger": row.original.rating < 3,
      })}
    >
      <i className="mdi mdi-star"></i> {row.original.rating}
    </span>
  );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
  return (
    <span
      className={classNames("badge", {
        "badge-soft-success": row.original.status === "Active",
        "badge-soft-danger": row.original.status === "Deactive",
      })}
    >
      {row.original.status}
    </span>
  );
};

/* action column render */
const ActionColumn = () => {
  return (
    <ul className="list-inline table-action m-0">
      <li className="list-inline-item">
        <Link to="" className="action-icon">
          <i className="mdi mdi-eye"></i>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link to="" className="action-icon">
          <i className="mdi mdi-square-edit-outline"></i>
        </Link>
      </li>
      <li className="list-inline-item">
        <Link to="" className="action-icon">
          <i className="mdi mdi-delete"></i>
        </Link>
      </li>
    </ul>
  );
};

// get all columns
const columns = [
  {
    Header: "Product",
    accessor: "name",
    sort: true,
    Cell: ProductColumn,
  },
  {
    Header: "Rating",
    accessor: "rating",
    sort: true,
    Cell: RatingColumn,
  },
  {
    Header: "Category",
    accessor: "category",
    sort: true,
  },
  {
    Header: "Added Date",
    accessor: "added_date",
    sort: true,
  },
  {
    Header: "Price",
    accessor: "price",
    sort: true,
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    sort: true,
  },
  {
    Header: "Status",
    accessor: "status",
    sort: true,
    Cell: StatusColumn,
  },
  {
    Header: "Action",
    accessor: "action",
    sort: false,
    Cell: ActionColumn,
  },
];

// get pagelist to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "All",
    value: products.length,
  },
];
const ProductList = () => {
  return (
    <Table
    columns={columns}
    data={products}
    pageSize={10}
    sizePerPageList={sizePerPageList}
    isSortable={true}
    pagination={true}
    isSelectable={true}
    isSearchable={true}
    theadClass="table-light"
    searchBoxClass="mb-2"
  />
  )
}

export default ProductList