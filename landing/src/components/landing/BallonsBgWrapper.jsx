import { lazy, Suspense, useEffect, useState } from "react";

const BalloonsBg = lazy(() => import("./BalloonsBg"));

const BalloonsBgWrapper = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setShow(true));
    } else {
      setTimeout(() => setShow(true), 0);
    }
  }, []);

  return show ? (
    <Suspense fallback={null}>
      <BalloonsBg />
    </Suspense>
  ) : null;
};

export default BalloonsBgWrapper;
