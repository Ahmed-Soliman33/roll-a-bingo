import HeroSection from "@components/landing/HeroSection";
import { Suspense } from "react";

const LandingPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>
      </div>
    </>
  );
};

export default LandingPage;
