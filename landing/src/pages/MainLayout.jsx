import Footer from "@components/ui/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
