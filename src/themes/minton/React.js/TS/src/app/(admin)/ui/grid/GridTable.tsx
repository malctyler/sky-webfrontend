
import { Table } from "react-bootstrap"

const GridTable = () => {
  return (
    <Table responsive bordered striped className="mb-0">
      <thead>
        <tr>
          <th></th>
          <th className="text-center">
            Extra small
            <br />
            <small>&lt;576px</small>
          </th>
          <th className="text-center">
            Small
            <br />
            <small>≥576px</small>
          </th>
          <th className="text-center">
            Medium
            <br />
            <small>≥768px</small>
          </th>
          <th className="text-center">
            Large
            <br />
            <small>≥992px</small>
          </th>
          <th className="text-center">
            Extra large
            <br />
            <small>≥1200px</small>
          </th>
          <th className="text-center">
            Extra Extra large
            <br />
            <small>≥1400px</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="text-nowrap" scope="row">
            Max container width
          </th>
          <td>None (auto)</td>
          <td>540px</td>
          <td>720px</td>
          <td>960px</td>
          <td>1140px</td>
          <td>1320px</td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            Class prefix
          </th>
          <td>
            <code>.col-</code>
          </td>
          <td>
            <code>.col-sm-</code>
          </td>
          <td>
            <code>.col-md-</code>
          </td>
          <td>
            <code>.col-lg-</code>
          </td>
          <td>
            <code>.col-xl-</code>
          </td>
          <td>
            <code>.col-xxl-</code>
          </td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            # of columns
          </th>
          <td colSpan={6}>12</td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            Gutter width
          </th>
          <td colSpan={6}>24px (12px on each side of a column)</td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            Custom gutters
          </th>
          <td colSpan={6}>Yes</td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            Nestable
          </th>
          <td colSpan={6}>Yes</td>
        </tr>
        <tr>
          <th className="text-nowrap" scope="row">
            Column ordering
          </th>
          <td colSpan={6}>Yes</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default GridTable