import HeroSection from "@components/landing/HeroSection";
import { lazy, Suspense } from "react";

const AboutSection = lazy(() => import("@components/landing/AboutSection"));

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
