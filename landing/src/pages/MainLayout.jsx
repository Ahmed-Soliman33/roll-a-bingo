import Footer from "@components/ui/Footer";
import Header from "@components/ui/Header";
import LoadingScreen from "@components/ui/LoadingScreen";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer;
    if (document.readyState === "complete") {
      timer = setTimeout(() => setLoaded(true), 1000);
    } else {
      const onLoad = () => {
        timer = setTimeout(() => setLoaded(true), 1000);
      };
      window.addEventListener("load", onLoad);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", onLoad);
      };
    }
  }, []);

  return !loaded ? (
    <LoadingScreen />
  ) : (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
