import { lazy, Suspense } from "react";

import AboutSection from "@components/landing/AboutSection";
import HeroSection from "@components/landing/HeroSection";
import Spinner from "@components/ui/Spinner";
import ContactSection from "@components/landing/ContactSection";
import LocationSection from "@components/landing/LocationSection";

const GamesGallery = lazy(() => import("@components/landing/GamesGallery"));

const LandingPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <HeroSection />
        <Suspense fallback={<Spinner />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <GamesGallery />
        </Suspense>
        <ContactSection />
        <LocationSection />
      </div>
    </>
  );
};

export default LandingPage;
