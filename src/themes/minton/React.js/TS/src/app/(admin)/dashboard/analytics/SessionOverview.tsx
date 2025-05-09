
import {Fragment} from "react";
import {Card, CardBody, Col, ProgressBar, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
// types
import {SessionSummaryType} from "./data";
import { UsaVectorMap } from "@/components/VectorMap";


interface SessionOverviewProps {
    sessionSummary: SessionSummaryType[];
}

const SessionOverview = ({sessionSummary}: SessionOverviewProps) => {
    return (
        <Card>
            <CardBody>
                <ul className="nav float-end d-none d-lg-flex">
                    <li className="nav-item">
                        <Link className="nav-link text-muted" to="">
                            Today
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" to="">
                            7d
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="">
                            15d
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" to="">
                            1m
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" to="">
                            1y
                        </Link>
                    </li>
                </ul>

                <h4 className="header-title mb-3">Sessions Overview</h4>

                <Row className="align-items-center">
                    <Col xl={8}>
                        <UsaVectorMap
                            height="363px"
                            width="100%"
                            options={{
                                zoomOnScroll: false,
                                backgroundColor: "transparent",
                                regionStyle: {
                                    initial: {
                                        fill: "#3bafda",
                                    },
                                },
                            }}
                        />
                    </Col>
                    <Col xl={4}>
                        {sessionSummary.length > 0 &&
                            sessionSummary.map((session, index) => {
                                return (
                                    <Fragment key={index}>
                                        <h5 className="mb-1 mt-0">
                                            {session.stats}{" "}
                                            <small className="text-muted ms-2">
                                                {session.website}
                                            </small>
                                        </h5>
                                        <Row className="align-items-center g-0 mb-2 pb-1">
                                            <Col>
                                                <ProgressBar
                                                    variant={session.progressVariant}
                                                    now={session.progressValue}
                                                    className="progress-sm"
                                                />
                                            </Col>
                                            <Col>
                                                <div className="fw-medium ms-2">
                                                    {session.progressValue}%
                                                </div>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                );
                            })}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default SessionOverview;
