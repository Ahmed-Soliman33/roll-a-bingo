import { useInView } from "react-intersection-observer";
import { Suspense, lazy } from "react";

const AnimatedText = lazy(() => import("./AnimatedText"));

const AnimatedTextWrapper = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
  });

  return (
    <div ref={ref}>
      {inView && (
        <Suspense fallback={null}>
          <AnimatedText />
        </Suspense>
      )}
    </div>
  );
};

export default AnimatedTextWrapper;
