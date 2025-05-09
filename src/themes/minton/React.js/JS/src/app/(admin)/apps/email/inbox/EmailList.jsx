import classNames from "classnames";
import { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// dafault data
import LeftBar from "@/app/(admin)/apps/email/LeftBar";
import { emails as mails } from "../data";

// emails list
const EmailsList = props => {
  const emails = props.emails || [];
  return <ul className="message-list">
      {(emails || []).map((email, idx) => {
      return <li className={classNames({
        unread: !email.is_read
      })} key={idx}>
            <div className="col-mail col-mail-1">
              <div className="checkbox-wrapper-mail">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id={"mail" + email.id} />
                  <label className="toggle" htmlFor={"mail" + email.id}></label>
                </div>
              </div>
              <span className={classNames("star-toggle", "far", "fa-star", {
            "text-warning": email.is_important
          })}></span>
              <Link to="/apps/email/details" className="title">
                {email.from_name}
                {email.number_of_reply > 1 && <span> ({email.number_of_reply})</span>}
              </Link>
            </div>
            <div className="col-mail col-mail-2">
              <Link to="/apps/email/details" className="subject">
                {email.subject} &nbsp;&ndash;&nbsp;
                <span className="teaser">{email.teaser}</span>
              </Link>
              <div className="date">{email.time}</div>
            </div>
          </li>;
    })}
    </ul>;
};
const EmailList = () => {
  const [emails, setEmails] = useState(mails.slice(0, 20));
  const [totalEmails] = useState(mails.length);
  const [pageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(20);
  const [totalPages] = useState(mails.length / 20);
  const [totalUnreadEmails] = useState(mails.filter(e => e.is_read === false).length);

  /**
   * Gets the next page
   */
  const getNextPage = () => {
    let nextPage = page + 1;
    if (nextPage > totalEmails / pageSize) {
      nextPage = totalEmails / pageSize;
    }
    const startIdx = nextPage * pageSize - pageSize + 1;
    const endIdx = nextPage * pageSize;
    setPage(nextPage);
    setStartIndex(startIdx);
    setEndIndex(endIdx);
    setEmails(mails.slice(startIdx, endIdx));
  };

  /**
   * Gets the prev page
   */
  const getPrevPage = () => {
    let prevPage = page - 1;
    if (prevPage === 0) prevPage = 1;
    const startIdx = prevPage * pageSize - pageSize + 1;
    const endIdx = prevPage * pageSize;
    setPage(prevPage);
    setStartIndex(startIdx);
    setEndIndex(endIndex);
    setEmails(mails.slice(startIdx, endIdx));
  };

  /**
   * Shows the starred emails only
   */
  const showAllEmails = () => {
    setEmails(mails.slice(0, 20));
  };

  /**
   * Shows the starred emails only
   */
  const showStarredEmails = () => {
    setEmails(mails.filter(e => e.is_important).slice(0, 20));
  };
  return <Card>
      <CardBody>
        {/* left sidebar */}
        <LeftBar totalUnreadEmails={totalUnreadEmails} showAllEmails={showAllEmails} showStarredEmails={showStarredEmails} />

        {/* right sidebar */}
        <div className="inbox-rightbar">
          <ButtonGroup className="me-1">
            <Button variant="light" className="btn-sm waves-effect">
              <i className="mdi mdi-archive font-18"></i>
            </Button>
            <Button variant="light" className="btn-sm waves-effect">
              <i className="mdi mdi-alert-octagon font-18"></i>
            </Button>
            <Button variant="light" className="btn-sm waves-effect">
              <i className="mdi mdi-delete-variant font-18"></i>
            </Button>
          </ButtonGroup>

          <Dropdown as={ButtonGroup} className="me-1">
            <Dropdown.Toggle className="btn btn-light btn-sm waves-effect">
              <i className="mdi mdi-folder font-18"></i>{" "}
              <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header as="span">Move to:</Dropdown.Header>
              <Dropdown.Item>Social</Dropdown.Item>
              <Dropdown.Item>Promotions</Dropdown.Item>
              <Dropdown.Item>Updates</Dropdown.Item>
              <Dropdown.Item>Forums</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={ButtonGroup} className="me-1">
            <Dropdown.Toggle className="btn btn-light btn-sm waves-effect">
              <i className="mdi mdi-label font-18"></i>{" "}
              <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header as="span">Label as:</Dropdown.Header>
              <Dropdown.Item>Social</Dropdown.Item>
              <Dropdown.Item>Promotions</Dropdown.Item>
              <Dropdown.Item>Updates</Dropdown.Item>
              <Dropdown.Item>Forums</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown as={ButtonGroup} className="me-1">
            <Dropdown.Toggle className="btn btn-light btn-sm waves-effect">
              <i className="mdi mdi-dots-horizontal font-18"></i> More{" "}
              <i className="mdi mdi-chevron-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header as="span">More Options :</Dropdown.Header>
              <Dropdown.Item>Mark as Unread</Dropdown.Item>
              <Dropdown.Item>Add to Tasks</Dropdown.Item>
              <Dropdown.Item>Add Star</Dropdown.Item>
              <Dropdown.Item>Mute</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="mt-3">
            <EmailsList emails={emails} />
          </div>

          <Row>
            <Col xs={7} className="mt-1">
              Showing {startIndex} - {endIndex} of {totalEmails}
            </Col>
            <Col xs={5}>
              <ButtonGroup className="float-end">
                {page === 1 ? <Button variant="light" className="btn-sm" disabled>
                    <i className="mdi mdi-chevron-left"></i>
                  </Button> : <Button variant="info" className="btn-sm" onClick={getPrevPage}>
                    <i className="mdi mdi-chevron-left"></i>
                  </Button>}

                {page < totalPages ? <Button variant="info" className="btn-sm" onClick={getNextPage}>
                    <i className="mdi mdi-chevron-right"></i>
                  </Button> : <Button variant="light" className="btn-sm" disabled>
                    <i className="mdi mdi-chevron-right"></i>
                  </Button>}
              </ButtonGroup>
            </Col>
          </Row>
        </div>

        <div className="clearfix"></div>
      </CardBody>
    </Card>;
};
export default EmailList;