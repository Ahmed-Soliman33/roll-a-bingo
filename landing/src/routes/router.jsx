import { createBrowserRouter } from "react-router-dom";

import LandingPage from "@pages/Landing";
import MainLayout from "@pages/MainLayout";
import PageNotFound from "@pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
