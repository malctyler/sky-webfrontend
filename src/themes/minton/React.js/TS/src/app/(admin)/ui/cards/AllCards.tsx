
import { Link } from "react-router-dom";
import {
  Card,
  CardGroup,
  ListGroup,
  Nav,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Row,
  Col,
} from "react-bootstrap";
import classNames from "classnames";


// images
import cardImg from "@/assets/images/small/img-1.jpg";
import cardImg2 from "@/assets/images/small/img-4.jpg";
import cardImg3 from "@/assets/images/small/img-2.jpg";
import cardImg4 from "@/assets/images/small/img-3.jpg";
import cardImg5 from "@/assets/images/small/img-5.jpg";
import cardImg6 from "@/assets/images/small/img-6.jpg";
import cardImg7 from "@/assets/images/small/img-7.jpg";

interface CardGroupDetailsTypes {
  id: number;
  image: string;
  title: string;
  text: string;
  subtext: string;
}

const CardWithImage = () => {
  return (
    <Card>
      <Card.Img src={cardImg} variant="top" className="img-fluid" />
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content. With supporting text below as a natural
          lead-in to additional content.
        </div>
        <Link to="" className="btn btn-primary waves-effect waves-light">
          Button
        </Link>
      </CardBody>
    </Card>
  );
};

const CardWithImage2 = () => {
  return (
    <Card>
      <Card.Img src={cardImg3} variant="top" className="img-fluid" />
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <div className="card-text">
          Some quick example text to build on the card title.
        </div>
      </CardBody>

      <ListGroup variant="flush">
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      </ListGroup>

      <CardBody>
        <Card.Link href="" className="text-custom">
          Card link
        </Card.Link>
        <Card.Link href="" className="text-custom">
          Another link
        </Card.Link>
      </CardBody>
    </Card>
  );
};

const CardWithImage3 = () => {
  return (
    <Card>
      <Card.Img src={cardImg4} variant="top" className="img-fluid" />
      <CardBody>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content. With supporting text below as a natural
          lead-in to additional content.
        </div>
        <Link to="" className="btn btn-primary waves-effect waves-light">
          Button
        </Link>
      </CardBody>
    </Card>
  );
};

const CardWithTitleAndImage = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h5'}>Card title</CardTitle>
        <Card.Subtitle as="h6" className="text-muted">
          Support card subtitle
        </Card.Subtitle>
      </CardBody>
      <Card.Img src={cardImg2} variant="top" className="img-fluid" />
      <CardBody>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </div>
        <Card.Link href="" className="text-custom">
          Card link
        </Card.Link>
        <Card.Link href="" className="text-custom">
          Another link
        </Card.Link>
      </CardBody>
    </Card>
  );
};

const CardWithSpecialTitle = () => {
  return (
    <Card className="card-body">
      <CardTitle as={'h5'}>Special title treatment</CardTitle>
      <div className="card-text">
        With supporting text below as a natural lead-in to additional content.
      </div>
      <Link to="" className="btn btn-primary waves-effect waves-light">
        Go somewhere
      </Link>
    </Card>
  )
}

const CardWithHeader = () => {
  return (
    <Card>
      <h5 className="card-header">Featured</h5>
      <CardBody>
        <CardTitle as={'h5'}>Special title treatment</CardTitle>
        <div className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </div>
        <Link to="" className="btn btn-primary waves-effect waves-light">
          Go somewhere
        </Link>
      </CardBody>
    </Card>
  );
};

const CardWithHeaderAndQuote = () => {
  return (
    <Card>
      <CardHeader>Quote</CardHeader>
      <CardBody>
        <blockquote className="card-bodyquote mb-0">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </CardBody>
    </Card>
  );
};

const CardWithHeaderAndFooter = () => {
  return (
    <Card className="text-xs-center">
      <CardHeader>Featured</CardHeader>
      <CardBody>
        <div className="card-text">
          With supporting text below as a natural lead-in to additional content.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </CardBody>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

const CardWithImageCaps = ({
  position,
  image,
}: {
  position: string;
  image: string;
}) => {
  return (
    <>
      <Card>
        {position === "top" && (
          <Card.Img variant={position} src={image} className="img-fluid" />
        )}
        <CardBody>
          <Card.Title as={"h5"}>Card title</Card.Title>
          <div className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </CardBody>
        {position === "bottom" && (
          <Card.Img variant={position} src={image} className="img-fluid" />
        )}
      </Card>
    </>
  );
};

const CardWithImageOverlay = () => {
  return (
    <>
      <Card className="text-white">
        <Card.Img src={cardImg7} alt="" />
        <Card.ImgOverlay>
          <Card.Title as="h5" className="text-white">
            Card title
          </Card.Title>
          <div className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </div>
          <div className="card-text">
            <small>Last updated 3 mins ago</small>
          </div>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

const ColoredCards = () => {
  const colors = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "purple",
    "pink",
    "dark",
  ];

  return (
    <>
      <Col md={4}>
        <div className="card text-white bg-secondary">
          <CardBody>
            <h5 className="card-title text-white">
              Special title treatment
            </h5>
            <div className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </div>
            <Link to="" className="btn btn-light btn-sm waves-effect">
              Button
            </Link>
          </CardBody>
        </div>
      </Col>
      {(colors || []).map((color, index) => {
        return (
          <div className="col-md-4" key={index}>
            <div
              className={classNames("card", "text-white", "text-xs-center", `bg-${color}`,)}
            >
              <CardBody>
                <blockquote className="card-bodyquote mb-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer text-white">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </CardBody>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ColoredTextCards = ({ color, name }: { color: string; name: string }) => {
  return (
    <Card>
      <div className={classNames('card-body', "text-" + color)}>
        <CardTitle as={'h5'}>{name} card title</CardTitle>
        <div className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </div>
      </div>
    </Card >
  );
};

const BorderdCards = () => {
  const colors = [
    {
      variant: "primary",
      name: "Primary",
    },
    {
      variant: "secondary",
      name: "Secondary",
    },
    {
      variant: "success",
      name: "Success",
    },
    {
      variant: "danger",
      name: "Danger",
    },
  ];

  return (
    <>
      {(colors || []).map((item, index) => {
        return (
          <div className="col-lg-3 col-md-6" key={index}>
            <div
              className={classNames(
                "card",
                "border",
                `border-${item.variant}`,
                "mb-4"
              )}
            >
              <CardHeader>Header</CardHeader>
              <div className={classNames('card-body', `text-${item.variant}`)}>
                <CardTitle as={'h5'}>{item.name} card title</CardTitle>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const BackGroundCards = () => {
  const colors = [
    {
      variant: "primary",
      name: "Primary",
    },
    {
      variant: "secondary",
      name: "Secondary",
    },
    {
      variant: "success",
      name: "Success",
    },
    {
      variant: "danger",
      name: "Danger",
    },
  ];

  return (
    <>
      {(colors || []).map((item, index) => {
        return (
          <div className="col-lg-3 col-md-6" key={index}>
            <div
              className={classNames(
                "card",
                "text-white",
                `bg-${item.variant}`,
                "mb-3"
              )}
            >
              <div className={classNames('card-header', `bg-${item.variant}`)}>
                Header
              </div>
              <CardBody>
                <Card.Title as="h5" className="text-white">
                  {item.name} card title
                </Card.Title>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </div>
              </CardBody>
            </div>
          </div>
        );
      })}
    </>
  );
};

const HorizontalCards = () => {
  return (
    <>
      <Col lg={6}>
        <div className="card mb-3">
          <Row className="g-0">
            <Col md={4}>
              <img src={cardImg2} className="card-img img-fluid" alt="" width={264} height={176} />
            </Col>

            <div className="col-md-8">
              <CardBody>
                <CardTitle as={'h5'}>Card Title</CardTitle>
                <div className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </div>
                <div className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </CardBody>
            </div>
          </Row>
        </div>
      </Col >
      <Col lg={6}>
        <div className="card mb-3">
          <Row className="g-0">
            <div className="col-md-8">
              <CardBody>
                <CardTitle as={'h5'}>Card Title</CardTitle>
                <div className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </div>
                <div className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </CardBody>
            </div>
            <Col md={4}>
              <Card.Img src={cardImg5} className="img-fluid" />
            </Col>
          </Row>
        </div>
      </Col >
    </>
  );
};

const CardWithGroup = ({ item }: { item: CardGroupDetailsTypes }) => {
  return (
    <Card>
      <Card.Img src={item.image} />
      <CardBody>
        <CardTitle as={'h5'}>{item.title}</CardTitle>
        <div className="card-text">{item.text}</div>
        <div className="card-text">
          <small className="text-muted">{item.subtext}</small>
        </div>
      </CardBody>
    </Card>
  );
};

const CardsWithNavigation = ({ variant }: { variant: "tabs" | "pills" }) => {
  return (
    <>
      <div className="card text-center">
        <CardHeader>
          <Nav
            as="ul"
            variant={variant}
            defaultActiveKey="#first"
            className={`card-header-${variant}`}
          >
            <Nav.Item as="li">
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </CardHeader>
        <CardBody>
          <CardTitle as={'h5'}>Special title treatment</CardTitle>
          <div className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </div>
          <Button variant="primary">Go somewhere</Button>
        </CardBody>
      </div>
    </>
  );
};

const GridCards = () => {
  return (
    <>
      <div className="col">
        <Card>
          <Card.Img src={cardImg2} variant="top" />
          <CardBody>
            <CardTitle as={'h5'}>Card title</CardTitle>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="col">
        <Card>
          <Card.Img src={cardImg6} variant="top" />
          <CardBody>
            <CardTitle as={'h5'}>Card title</CardTitle>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="col">
        <Card>
          <Card.Img src={cardImg5} variant="top" />
          <CardBody>
            <CardTitle as={'h5'}>Card title</CardTitle>
            <div className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content.
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
const AllCards = () => {
  const CardGroupDetails: CardGroupDetailsTypes[] = [
    {
      id: 1,
      image: cardImg,
      title: "Card title",
      text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      subtext: "Last updated 3 mins ago",
    },
    {
      id: 2,
      image: cardImg3,
      title: "Card title",
      text: "This card has supporting text below as a natural lead-in to additional content.",
      subtext: "Last updated 3 mins ago",
    },
    {
      id: 3,
      image: cardImg4,
      title: "Card title",
      text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
      subtext: "Last updated 3 mins ago",
    },
  ];
  return (
    <>
      <Row>
        <Col lg={6} xl={3}>
          <CardWithImage />
        </Col>

        <Col lg={6} xl={3}>
          <CardWithImage2 />
        </Col>

        <Col lg={6} xl={3}>
          <CardWithImage3 />
        </Col>

        <Col lg={6} xl={3}>
          <CardWithTitleAndImage />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <CardWithSpecialTitle />
        </Col>
        <Col lg={6}>
          <CardWithSpecialTitle />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <CardWithSpecialTitle />
        </Col>
        <Col lg={4}>
          <CardWithSpecialTitle />
        </Col>
        <Col lg={4}>
          <CardWithSpecialTitle />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <CardWithHeader />
        </Col>

        <Col md={4}>
          <CardWithHeaderAndQuote />
        </Col>

        <Col md={4}>
          <CardWithHeaderAndFooter />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <CardWithImageCaps position={"top"} image={cardImg5} />
        </Col>

        <Col md={4}>
          <CardWithImageCaps position={"bottom"} image={cardImg6} />
        </Col>

        <Col md={4}>
          <CardWithImageOverlay />
        </Col>
      </Row>

      <Row>
        <ColoredCards />
      </Row>

      <Row>
        <Col md={4}>
          <ColoredTextCards color={"primary"} name={"Primary"} />
        </Col>

        <Col md={4}>
          <ColoredTextCards color={"secondary"} name={"Secondary"} />
        </Col>

        <Col md={4}>
          <ColoredTextCards color={"success"} name={"Success"} />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Card Border</h4>
        </Col>
        <BorderdCards />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Background and color</h4>
        </Col>
        <BackGroundCards />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-3">Card Horizontal</h4>
        </Col>
        <HorizontalCards />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-4">Card Group</h4>

          <CardGroup>
            {(CardGroupDetails || []).map((item, index) => {
              return <CardWithGroup item={item} key={index} />;
            })}
          </CardGroup>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <h4 className="mb-3">Grid Cards</h4>
          <div className="row-cols-1 row-cols-md-3 g-3 row">
            <GridCards />
          </div>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs={12}>
          <h4 className="mb-3">Navigation</h4>
          <Row>
            <Col md={6}>
              <CardsWithNavigation variant={"tabs"} />
            </Col>
            <Col md={6}>
              <CardsWithNavigation variant={"pills"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default AllCards