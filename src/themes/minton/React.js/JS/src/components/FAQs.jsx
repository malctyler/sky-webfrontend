import { Row, Col } from "react-bootstrap";
import classNames from "classnames";
import React from "react";
/*
 * FAQs
 */
const FAQs = ({
  rawFaqs,
  containerClass
}) => {
  return <>
      <Row className={`${containerClass}`}>
        <Col lg={6}>
          <div className="p-lg-2">
            {(rawFaqs.filter(item => item.id % 2 !== 0) || []).map((ques, index) => {
            return <React.Fragment key={index}>
                    <div className="faq-question-q-box">Q.</div>
                    <h4 className={classNames("faq-question", ques.titleClass)}>
                      {ques.question}
                    </h4>
                    <p className={classNames("faq-answer mb-4", ques.textClass)}>
                      {ques.answer}
                    </p>
                  </React.Fragment>;
          })}
          </div>
        </Col>
        <Col lg={6}>
          <div className="p-lg-2">
            {(rawFaqs.filter(item => item.id % 2 === 0) || []).map((ques, index) => {
            return <React.Fragment key={index}>
                    <div className="faq-question-q-box">Q.</div>
                    <h4 className={classNames("faq-question", ques.titleClass)}>
                      {ques.question}
                    </h4>
                    <p className={classNames("faq-answer mb-4", ques.textClass)}>
                      {ques.answer}
                    </p>
                  </React.Fragment>;
          })}
          </div>
        </Col>
      </Row>
    </>;
};
export default FAQs;