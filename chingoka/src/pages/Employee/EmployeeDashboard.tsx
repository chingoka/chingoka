import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EmployeeDashboard: React.FC = () => {


  const images = [
    "../../src/assets/image/poto.png",
    "../../src/assets/image/poto5.png",
    "../../src/assets/image/tornado.png",
    "../../src/assets/image/cello200.png",
    "../../src/assets/image/viti2.png",
    "../../src/assets/images-removebg-preview (2).png",
    "../../src/assets/image/cello160.png",
    "../../src/assets/image/celloviti.png",
    "../../src/assets/image/sufuriakubwa.png",
    "../../src/assets/images__9_-removebg-preview.png",
    "../../src/assets/cf292218c4b993fc5df5e1286fa86ec3-removebg-preview.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="flex bg-gray-100 min-h-screen mt-16 justify-center items-center">
      <div className="p-4 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">User Dashboard Overview</h1>

        {/* Image Slider */}
        <div className="min-h-screen max-w-lg mx-auto mb-6">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="flex justify-center">
                <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>


      </div>
    </div>
  );
};

export default EmployeeDashboard;
