import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "@components/ui/Footer";
import Header from "@components/ui/Header";
import LoadingScreen from "@components/ui/LoadingScreen";

const MainLayout = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer;
    if (document.readyState === "complete") {
      timer = setTimeout(() => setLoaded(true), 1500);
    } else {
      const onLoad = () => {
        timer = setTimeout(() => setLoaded(true), 1500);
      };
      window.addEventListener("load", onLoad);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  return (
    <div className="relative">
      {/* Loading screen overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-700 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <LoadingScreen />
      </div>

      {/* Actual app content */}
      <div
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
