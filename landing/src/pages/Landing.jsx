import AboutSection from "@components/landing/AboutSection";
import HeroSection from "@components/landing/HeroSection";
import Spinner from "@components/ui/Spinner";
import { Suspense } from "react";

const LandingPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <HeroSection />
        <Suspense fallback={<Spinner />}>
          <AboutSection />
        </Suspense>
      </div>
    </>
  );
};

export default LandingPage;
