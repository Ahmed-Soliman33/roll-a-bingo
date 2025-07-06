import AboutSection from "@components/landing/AboutSection";
import GamesGallery from "@components/landing/GamesGallery";
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
          <GamesGallery />
        </Suspense>
      </div>
    </>
  );
};

export default LandingPage;
