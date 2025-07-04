import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";

import logoImage from "/logo.webp";
import BalloonsBg from "./BalloonsBg";
import AnimatedText from "./AnimatedText";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <BalloonsBg />

      {/* Fog layer */}
      <img
        src="https://res.cloudinary.com/dqlvs4ae5/image/upload/v1751594365/fog_xqtea8.webp"
        alt="Fog Image"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-30"
        style={{ willChange: "transform" }}
        loading="lazy"
      />

      {/* Text content or any front-end elements */}
      <div className="absolute top-1/2 left-1/2 z-40 h-[90vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <Link to="/">
          <img
            src={logoImage}
            alt="logo Image"
            className="h-auto w-[20vh] cursor-pointer md:w-auto"
            style={{ willChange: "transform" }}
            fetchPriority="high"
          />
        </Link>

        <AnimatedText />
      </div>
    </div>
  );
};

export default HeroSection;
