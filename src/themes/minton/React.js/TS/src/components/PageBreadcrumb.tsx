;
import { useLayoutContext } from "@/context/useLayoutContext";
import classNames from "classnames";
import { Breadcrumb, Col, Row } from "react-bootstrap";
interface BreadcrumbItems {
    label: string;
    path: string;
    active?: boolean;
}

interface PageTitleProps {
    breadCrumbItems?: Array<BreadcrumbItems>;
    title: string;
}


/**
 * PageTitle
 */
const PageBreadcrumb = ({ title, breadCrumbItems }: PageTitleProps) => {

    const { orientation } = useLayoutContext()

    return (
        <>
            <title>{`${title} | Minton React - Admin & Dashboard Template`}</title>
            <Row>
                <Col xs={12}>
                    <div suppressHydrationWarning
                        className={classNames("page-title-box", {
                            "page-title-box-alt":
                                orientation === 'horizontal' ||
                                orientation === 'detached',
                        })}
                    >
                        <h4 className="page-title">{title}</h4>
                        <div className="page-title-right">
                            <Breadcrumb listProps={{ className: "m-0" }}>
                                <Breadcrumb.Item href="/">Minton</Breadcrumb.Item>

                                {(breadCrumbItems || []).map((item, index) => {
                                    return item.active ? (
                                        <Breadcrumb.Item active key={index}>
                                            {item.label}
                                        </Breadcrumb.Item>
                                    ) : (
                                        <Breadcrumb.Item key={index} href={item.path}>
                                            {item.label}
                                        </Breadcrumb.Item>
                                    );
                                })}

                            </Breadcrumb>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default PageBreadcrumb;
