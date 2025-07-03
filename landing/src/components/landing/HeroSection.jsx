import AnaglyphScene from "./ThreeMeshBatch";
import fogImage from "@assets/fog.webp";
import logoImage from "/logo.webp";
import { Link } from "react-router-dom";
import AnimatedTextShader from "./AnimatedTextShader";
import { Suspense } from "react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* الخلفية المتحركة */}
      <Suspense fallback={<div>Loading...</div>}>
        <AnaglyphScene />
      </Suspense>

      {/* طبقة الضباب */}
      <img
        src={fogImage}
        alt=""
        className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-30"
        loading="lazy"
      />

      {/* المحتوى النصي أو أي عناصر أمامية */}

      <div className="absolute top-1/2 left-1/2 z-40 h-[90vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <Link to="/">
          <img src={logoImage} alt="logo Image" />
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedTextShader />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroSection;
