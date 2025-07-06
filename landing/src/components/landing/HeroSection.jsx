import AnimatedTextWrapper from "./hero/AnimatedTextWrapper";
import BalloonsBgWrapper from "./hero/BallonsBgWrapper";

import heroContent from "@content/hero.json";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative max-h-[85vh] w-full overflow-hidden md:min-h-screen"
    >
      {/* Animated Background */}
      <BalloonsBgWrapper />

      {/* Fog layer */}
      <img
        src={`/src/assets/${heroContent.fogLayerImage}`}
        alt="Fog Image"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-40"
        style={{ willChange: "transform" }}
        fetchPriority="high"
      />

      {/* Text content or any front-end elements */}
      <div className="absolute top-1/2 left-1/2 z-40 h-full w-full -translate-x-1/2 -translate-y-1/2 pt-20 text-center text-white">
        <AnimatedTextWrapper
          heading={heroContent.heading}
          subHeading={heroContent.subHeading}
        />
      </div>
    </section>
  );
};

export default HeroSection;
