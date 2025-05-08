import classNames from "classnames";
const Statistics = ({
  icon,
  textClass,
  stats,
  desc
}) => {
  return <div className="py-1">
      <i className={classNames(icon, "font-24")}></i>
      <h3 className={classNames(textClass)}>{stats}</h3>
      <p className="text-uppercase mb-1 font-13 fw-medium">{desc}</p>
    </div>;
};
export default Statistics;