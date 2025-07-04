// import fogImage from "@assets/fog.webp";
// import fogImage from "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1751594365/fog_xqtea8.webp";
import logoImage from "/logo.webp";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const AnaglyphScene = lazy(() => import("./ThreeMeshBatch"));
const AnimatedTextShader = lazy(() => import("./AnimatedTextShader"));

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* الخلفية المتحركة */}
      <Suspense fallback={null}>
        <AnaglyphScene />
      </Suspense>

      {/* طبقة الضباب */}
      <img
        src="https://res.cloudinary.com/dqlvs4ae5/image/upload/v1751594365/fog_xqtea8.webp"
        alt=""
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-30"
        loading="lazy"
        style={{ willChange: "transform" }}
      />

      {/* المحتوى النصي أو أي عناصر أمامية */}

      <div className="absolute top-1/2 left-1/2 z-40 h-[90vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <Link to="/">
          <img
            src={logoImage}
            alt="logo Image"
            className="h-auto w-[20vh] cursor-pointer md:w-auto"
            loading="lazy"
            style={{ willChange: "transform" }}
          />
        </Link>

        <Suspense fallback={null}>
          <AnimatedTextShader />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroSection;
