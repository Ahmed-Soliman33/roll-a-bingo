import { Link } from "react-router-dom";

import logoImage from "/logo.webp";
import AnimatedTextWrapper from "./hero/AnimatedTextWrapper";
import BalloonsBgWrapper from "./hero/BallonsBgWrapper";

const HeroSection = () => {
  return (
    <div className="relative max-h-[80vh] w-full overflow-hidden md:min-h-screen">
      {/* Animated Background */}
      <BalloonsBgWrapper />

      {/* Fog layer */}
      <img
        src="https://res.cloudinary.com/dqlvs4ae5/image/upload/f_auto,q_auto,w_auto/v1751594365/fog_xqtea8.webp"
        alt="Fog Image"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-40"
        style={{ willChange: "transform" }}
        fetchPriority="high"
      />

      {/* Text content or any front-end elements */}
      <div className="absolute top-1/2 left-1/2 z-40 h-full w-full -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <Link to="/">
          <img
            src={logoImage}
            alt="logo Image"
            className="h-auto w-[20vh] cursor-pointer pt-5 md:w-auto"
            style={{ willChange: "transform" }}
            fetchPriority="high"
          />
        </Link>

        <AnimatedTextWrapper />
      </div>
    </div>
  );
};

export default HeroSection;
