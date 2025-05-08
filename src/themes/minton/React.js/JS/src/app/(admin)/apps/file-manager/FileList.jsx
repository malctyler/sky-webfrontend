import { Link } from "react-router-dom";
import { files } from "./data";
import { Table } from "react-bootstrap";
const FileList = () => {
  return <Table responsive className="table-centered table-nowrap mb-0">
      <thead className="table-light">
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Date Modified</th>
          <th scope="col">Size</th>
          <th scope="col">Contributors</th>
          <th scope="col" className="text-center" style={{
          width: "125px"
        }}>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {(files || []).map((item, i) => {
        return <tr key={i}>
              <td>
                <img src={item.file_icon} height={30} width={30} alt="" className="me-2" />{" "}
                <Link to="" className="text-dark">
                  {item.file_name}
                </Link>
              </td>
              <td className="font-13">{item.modified_date}</td>
              <td>{item.size}</td>
              <td>
                {(item.contributors || []).map((user, i) => {
              return <img src={user} key={i} alt="avatar" className="avatar-sm img-thumbnail rounded-circle" height={36} width={36} />;
            })}
              </td>
              <td>
                <ul className="list-inline table-action m-0">
                  <li className="list-inline-item">
                    <Link to="" className="action-icon px-1">
                      {" "}
                      <i className="mdi mdi-pencil"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="" className="action-icon px-1">
                      {" "}
                      <i className="mdi mdi-delete"></i>
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>;
      })}
      </tbody>
    </Table>;
};
export default FileList;