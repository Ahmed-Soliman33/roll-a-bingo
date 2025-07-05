import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "@components/ui/LoadingScreen";

// Lazy load components
const Header = lazy(() => import("@components/ui/Header"));
const Footer = lazy(() => import("@components/ui/Footer"));
const OutletWrapper = lazy(() => import("@components/ui/OutletWrapper"));

const MainLayout = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer;
    if (document.readyState === "complete") {
      timer = setTimeout(() => setLoaded(true), 2000);
    } else {
      const onLoad = () => {
        timer = setTimeout(() => setLoaded(true), 2000);
      };
      window.addEventListener("load", onLoad);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  if (!loaded) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="flex-1">
          <OutletWrapper />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default MainLayout;
