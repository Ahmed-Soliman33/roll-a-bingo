import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "@components/ui/LoadingScreen";

const OutletWrapper = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Outlet />
  </Suspense>
);

export default OutletWrapper;
