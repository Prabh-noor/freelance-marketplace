import React from "react";
import "./Slide.scss";
// import Slider from "infinite-react-carousel";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// const Slide = ({ children, slidesToShow, arrowsScroll }) => {
//   return (
//     <div className="slide">
//       <div className="container">
//         <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
//           {children}
//         </Slider>
//       </div>
//     </div>
//   );
// };
const Slide = ({ children }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 6, spacing: 2 },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {React.Children.map(children, (child, i) => (
        <div className="keen-slider__slide">{child}</div>
      ))}
    </div>
  );
};

export default Slide;
