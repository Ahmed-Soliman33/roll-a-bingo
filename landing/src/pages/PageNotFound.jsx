import Footer from "@components/ui/Footer";
import Navbar from "@components/ui/Navbar";

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      </div>
      <Footer />
    </>
  );
}
export default PageNotFound;
