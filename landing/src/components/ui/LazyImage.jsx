import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, index, alt, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const imgRef = useRef();
  const [isBig, setIsBig] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (img.width >= 1000 || img.height >= 1000) {
        setIsBig(true);
      }
    };
  }, [src]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              },
            }
          : {}
      }
      className={`group relative overflow-hidden rounded-xl bg-black shadow-md transition-shadow duration-300 ease-in-out ${
        isBig ? "md:col-span-2" : ""
      }`}
    >
      {inView && (
        <img
          ref={imgRef}
          src={`/assets/${src}`}
          alt={alt ? alt : `Gallery image-${index}`}
          className={
            className
              ? className
              : `h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03] ${loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"}`
          }
          loading="lazy"
          decoding="async"
          style={{ display: "block" }}
          onLoad={() => setLoaded(true)}
        />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:bg-white/10 group-hover:opacity-100"></div>
      <div className="group-hover:ring-opacity-40 pointer-events-none absolute inset-0 rounded-xl ring-0 transition duration-500 group-hover:ring-4 group-hover:ring-[var(--color-yellowColor)]"></div>
    </motion.div>
  );
};

export default LazyImage;
