import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Spinner from "./Spinner";

const OutletWrapper = () => (
  <Suspense fallback={<Spinner />}>
    <Outlet />
  </Suspense>
);

export default OutletWrapper;
