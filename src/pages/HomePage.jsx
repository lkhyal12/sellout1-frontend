import React from "react";
import wardrobeImg from "../assets/wardrobe.jpg";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-dvh pt-15">
      <div className="h-full w-full relative">
        {/* background image */}
        <div className="absolute inset-0 ">
          <img src={wardrobeImg} alt="" className="size-full object-cover" />
        </div>
        {/* layout */}
        <div className="absolute inset-0 bg-background/80" />

        {/* home page content */}
        <div className="max-w-2xl h-full flex items-center justify-center relative z-10  px-4 md:px-10">
          <div className="">
            <h3 className="text-orange-primary text-lg font-bold">
              New Collection
            </h3>
            <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mt-3">
              UP TO 50% OFF ON ALL PRODUCTS
            </h2>
            <p className="text-text-secondary text-lg max-w-sm mt-5">
              Discover the latest trends in fashion and upgrade your style
            </p>

            <button
              className="outline-none border-none rounded-lg bg-orange-primary font-semibold cursor-pointer text-white px-4 py-2 mt-8"
              onClick={() => navigate("/categories")}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
