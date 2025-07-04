import { lazy, memo, Suspense, useEffect, useState } from "react";

const AnimatedText = lazy(() => import("./AnimatedText"));

const AnimatedTextWrapper = ({ heading, subHeading }) => {
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
      <AnimatedText {...{ heading, subHeading }} />
    </Suspense>
  ) : null;
};

export default memo(AnimatedTextWrapper);
