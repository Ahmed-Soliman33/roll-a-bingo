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
      timer = setTimeout(() => setLoaded(true), 2500);
    } else {
      const onLoad = () => {
        timer = setTimeout(() => setLoaded(true), 2500);
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
    <Suspense
      fallback={
        <div
          className="max-h-[90vh] w-full overflow-hidden md:min-h-screen"
          style={{
            background:
              "linear-gradient(to bottom right, #1d001a, #75106b, #af1173)",
            overflow: "hidden",
          }}
        />
      }
    >
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
