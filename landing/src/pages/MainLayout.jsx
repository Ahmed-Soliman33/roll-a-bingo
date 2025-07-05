import Footer from "@components/ui/Footer";
import Header from "@components/ui/Header";
import LoadingScreen from "@components/ui/LoadingScreen";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or wait for assets
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 sec

    return () => clearTimeout(timeout);
  }, []);

  return isLoading ? (
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
