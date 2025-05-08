import { useState } from "react";
import { Card, CardBody, Carousel, Col, Row } from "react-bootstrap";
import small1 from "@/assets/images/small/img-1.jpg";
import small2 from "@/assets/images/small/img-2.jpg";
import small3 from "@/assets/images/small/img-3.jpg";
const DefaultSlides = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Slides only</h4>
        <p className="sub-header">
          Here’s a carousel with slides only. Note the presence of the{" "}
          <code>.d-block</code> and <code>.img-fluid</code> on carousel images
          to prevent browser default image alignment.
        </p>

        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <img className="d-block img-fluid" src={small1} alt="First slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block img-fluid" src={small2} alt="Second slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block img-fluid" src={small3} alt="Third slide" width={900} height={600} />
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const SlidesWithControls = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">With controls</h4>
        <p className="text-muted font-14">
          Adding in the previous and next controls:
        </p>
        <Carousel indicators={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={small1} alt="First slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small2} alt="Second slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small3} alt="Third slide" width={900} height={600} />
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const SlidesWithIndicators = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };
  return <Card>
      <CardBody>
        <h4 className="header-title">With indicators</h4>
        <p className="text-muted font-14">
          You can also add the indicators to the carousel, alongside the
          controls, too.
        </p>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img className="d-block w-100" src={small1} alt="First slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small2} alt="Second slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small3} alt="Third slide" width={900} height={600} />
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const SlidesWithCaptions = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">With captions</h4>
        <p className="text-muted font-14">
          Add captions to your slides easily with the{" "}
          <code>.carousel-caption</code> element within any{" "}
          <code>.carousel-item</code>.
        </p>
        <Carousel indicators={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={small1} alt="First slide" width={900} height={600} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small2} alt="Second slide" width={900} height={600} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small3} alt="Third slide" width={900} height={600} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const CrossFade = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Crossfade</h4>
        <p className="text-muted font-14">
          Add <code>.carousel-fade</code> to your carousel to animate slides
          with a fade transition instead of a slide.
        </p>
        <Carousel fade indicators={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={small1} alt="First slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small2} alt="Second slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small3} alt="Third slide" width={900} height={600} />
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const IndividualInterval = () => {
  return <Card>
      <CardBody>
        <h4 className="header-title">Individual interval</h4>
        <p className="text-muted font-14">
          Add <code>data-bs-interval=&quot;&quot;</code> to a <code>.carousel-item</code>{" "}
          to change the amount of time to delay between automatically cycling to
          the next item.
        </p>
        <Carousel fade indicators={false}>
          <Carousel.Item interval={1000}>
            <img className="d-block w-100" src={small1} alt="First slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img className="d-block w-100" src={small2} alt="Second slide" width={900} height={600} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={small3} alt="Third slide" width={900} height={600} />
          </Carousel.Item>
        </Carousel>
      </CardBody>
    </Card>;
};
const CarouselSliders = () => {
  return <>
      <Row>
        <Col lg={6}>
          <DefaultSlides />
        </Col>

        <Col lg={6}>
          <SlidesWithControls />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <SlidesWithIndicators />
        </Col>
        <Col lg={6}>
          <SlidesWithCaptions />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <CrossFade />
        </Col>
        <Col lg={6}>
          <IndividualInterval />
        </Col>
      </Row>
    </>;
};
export default CarouselSliders;