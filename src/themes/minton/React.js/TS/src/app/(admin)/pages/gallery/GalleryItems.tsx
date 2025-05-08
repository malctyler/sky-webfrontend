
import { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// components
import { Loader } from "@/components";

// dummy data
import { Col, Row } from "react-bootstrap";
import { gallery as data, GalleryItem } from "./data";


const GalleryItems = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(data);
  const [category, setCategory] = useState<string>("all");
  const [galleryImages, setGalleryImages] = useState<SlideImage[]>(
    (data || []).map((album) => {
      return album.image;
    })
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * filter images by category
   * @param category category
   */
  const filterImages = (category: string) => {
    setIsLoading(true);
    setCategory(category);
    setTimeout(() => {
      const galleryAlbums =
        category === "all"
          ? data
          : data.filter((album) => album.category?.includes(category));
      setGallery(galleryAlbums);
      setGalleryImages(
        (galleryAlbums || []).map((album) => {
          return album.image;
        })
      );
      setIsLoading(false);
    }, 300);
  };

  /*
   * handle lightbox events
   */
  const openLightbox = () => {
    setIsOpen(true);
  };

  return (
  <>
        <Row>
        <Col xs={12}>
          <div className="text-center filter-menu">
            <Link
              to=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "all",
              })}
              onClick={() => filterImages("all")}
            >
              All
            </Link>
            <Link
              to=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "web",
              })}
              onClick={() => filterImages("web")}
            >
              Web Design
            </Link>
            <Link
              to=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "graphic",
              })}
              onClick={() => filterImages("graphic")}
            >
              Graphic Design
            </Link>
            <Link
              to=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "illustrator",
              })}
              onClick={() => filterImages("illustrator")}
            >
              Illustrator
            </Link>
            <Link
              to=""
              className={classNames("filter-menu-item", "me-1", {
                active: category === "photography",
              })}
              onClick={() => filterImages("photography")}
            >
              Photography
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="filterable-content position-relative">
        {isLoading && <Loader />}
        {(gallery || []).map((item, index) => {
          return (
            <Col sm={6} xl={3} className="filter-item all illustrator" key={index}>
              <div className="gal-box">
                <Link
                  to=""
                  className="image-popup"
                  onClick={openLightbox}
                >
                  <img src={item.image.src!} alt="" width={365} height={243} className="img-fluid" />
                </Link>

                <div className="gall-info">
                  <h4 className="font-16 mt-0">{item.title}</h4>
                  <Link to="">
                    <img
                      src={item.avatar}
                      alt="user-img"
                      className="rounded-circle"
                      height={24}
                      width={24}
                    />
                    <span className="text-muted ms-1">{item.userName}</span>
                  </Link>
                  <Link to="" className="gal-like-btn">
                    <i className="mdi mdi-heart-outline text-danger"></i>
                  </Link>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* image lightbox */}
        <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={galleryImages}
        />

  </>
  )
}

export default GalleryItems