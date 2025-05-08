


import { useState } from "react";
import { Carousel, Col } from "react-bootstrap";
import classNames from "classnames";

import productImg1 from "@/assets/images/products/product-6.png";
import productImg2 from "@/assets/images/products/product-8.png";
import productImg3 from "@/assets/images/products/product-1.png";

const ProductSwiper = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <Col lg={8}>
    <Carousel
      id="product-carousel"
      activeIndex={activeIndex}
      onSelect={handleActiveIndex}
      className="product-detail-carousel"
      controls={false}
      indicators={false}
    >
      <Carousel.Item>
        <img
          className="img-fluid"
          src={productImg1}
          alt="product-img"
          height={416}
          width={416}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid"
          src={productImg2}
          alt="product-img"
          height={416}
          width={416}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid"
          src={productImg3}
          alt="product-img"
          height={416}
          width={416}
        />
      </Carousel.Item>
    </Carousel>
    <div className="product-detail-carousel position-relative">
      <ol className="carousel-indicators product-carousel-indicators mt-2">
        <li
          className={classNames({
            active: activeIndex === 0,
          })}
          onClick={() => handleActiveIndex(0)}
          data-bs-target="#product-carousel"
        >
          <img
            src={productImg1}
            alt="product-img"
            className="img-fluid product-nav-img"
            height={80}
            width={80}
          />
        </li>
        <li
          className={classNames({
            active: activeIndex === 1,
          })}
          onClick={() => handleActiveIndex(1)}
          data-bs-target="#product-carousel"
        >
          <img
            src={productImg2}
            alt="product-img"
            className="img-fluid product-nav-img"
            height={80}
            width={80}
          />
        </li>
        <li
          className={classNames({
            active: activeIndex === 2,
          })}
          onClick={() => handleActiveIndex(2)}
          data-bs-target="#product-carousel"
        >
          <img
            src={productImg3}
            alt="product-img"
            className="img-fluid product-nav-img"
            height={80}
            width={80}
          />
        </li>
      </ol>
    </div>
  </Col>
  )
}

export default ProductSwiper