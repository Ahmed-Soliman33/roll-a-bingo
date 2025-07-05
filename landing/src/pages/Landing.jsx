import AboutSection from "@components/landing/AboutSection";
import HeroSection from "@components/landing/HeroSection";

const LandingPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <HeroSection />
        <AboutSection />
      </div>
    </>
  );
};

export default LandingPage;
