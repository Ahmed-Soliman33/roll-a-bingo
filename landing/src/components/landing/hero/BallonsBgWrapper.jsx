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

  // Constant to reserve background space
  const backgroundStyles = {
    background: "linear-gradient(to bottom right, #1d001a, #75106b, #af1173)",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={backgroundStyles}>
      <Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
        {show && <BalloonsBg />}
      </Suspense>
    </div>
  );
};

export default BalloonsBgWrapper;
