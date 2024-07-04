import React from "react";
import useApi from "../utils/useApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/SimpleSlider.css";
import jwelery from "../carousel Img/jewelery.avif";
import mens from "../carousel Img/mens.jpeg";
import womens from "../carousel Img/womens.avif";
import electronics from "../carousel Img/image.png";
import { useNavigate } from "react-router-dom";

const SimpleSlider = ({ carouselCetegory }) => {
  const SliderImg = [mens, jwelery, electronics, womens];
  const Navigate = useNavigate();
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const settingsMobile = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [productsCarousel] = useApi();
  if (!productsCarousel) return <h4>Loading Data...</h4>;

  const handlesubmite = (item) => {
    Navigate(`/carousel/${item}`);
  };
  return (
    <>
      <div
        className="hero-slider"
        style={{ width: "100%", margin: "10px auto", background: "#5ddcff" }}
      >
        <Slider className="sliderMobile" {...settingsMobile}>
          {carouselCetegory.map((item, index) => (
            <div className="Main">
              <img src={SliderImg[index]} />
              <button
                className="carouselbutton"
                onClick={() => {
                  handlesubmite(item);
                }}
              >
                {item}
              </button>
            </div>
          ))}
        </Slider>

        <Slider className="slider" {...settings}>
          {carouselCetegory.map((item, index) => (
            <div className="Main">
              <img src={SliderImg[index]} />
              <button
                className="carouselbutton"
                onClick={() => {
                  handlesubmite(item);
                }}
              >
                {item}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow next-arrow" onClick={onClick}>
      &#10095;
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="arrow prev-arrow" onClick={onClick}>
      &#10094;
    </div>
  );
};

export default SimpleSlider;
