import classNames from "classnames";
import { useEffect, useState } from "react";
import { Card, CardBody, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
/**
 * Portlet
 */
const BasicPortlet = props => {
  const children = props["children"] || null;
  const cardTitle = props["cardTitle"] || "Card Title";
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  /**
   * Toggle the body
   */
  const toggleContent = () => {
    setCollapse(!collapse);
  };

  /**
   * Reload the content
   */
  const reloadContent = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500 + 300 * (Math.random() * 5));
  };

  /**
   * remove the portlet
   */
  const remove = () => {
    setHidden(true);
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <>
            {!hidden ? <Card className={classNames(props["className"])}>
                    {loading && <div className="card-disabled">
                            <div className="card-portlets-loader">
                                <div className="spinner-border text-primary m-2" role="status"></div>
                            </div>
                        </div>}

                    <CardBody>
                        <div className="card-widgets">
                            <Link to="" onClick={reloadContent}>
                                <i className="mdi mdi-refresh"></i>
                            </Link>
                            <Link to="" onClick={toggleContent}>
                                <i className={classNames("mdi", {
              "mdi-minus": collapse,
              "mdi-plus": !collapse
            })}></i>
                            </Link>
                            <Link to="" onClick={remove}>
                                <i className="mdi mdi-close"></i>
                            </Link>
                        </div>

                        <h5 className={classNames("mb-0", props["titleClass"])}>
                            {cardTitle}
                        </h5>

                        {mounted && <Collapse in={collapse} className="pt-3">
                                {children}
                            </Collapse>}
                    </CardBody>
                </Card> : null}
        </>;
};
export default BasicPortlet;