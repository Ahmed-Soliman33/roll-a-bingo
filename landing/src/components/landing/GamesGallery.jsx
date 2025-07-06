import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import LazyImage from "@components/ui/LazyImage";

import img1 from "@assets/portfolio-1.webp";
import img2 from "@assets/portfolio-2.webp";
import img3 from "@assets/portfolio-3.webp";
import img4 from "@assets/portfolio-4.webp";
import img5 from "@assets/portfolio-5.webp";
import img6 from "@assets/portfolio-6.webp";
import img7 from "@assets/portfolio-7.webp";
import img8 from "@assets/portfolio-8.webp";
import img9 from "@assets/portfolio-9.webp";
import img10 from "@assets/portfolio-10.webp";
import img11 from "@assets/portfolio-11.webp";
import img12 from "@assets/portfolio-12.webp";
import img13 from "@assets/portfolio-13.webp";
import img14 from "@assets/portfolio-14.webp";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
];

const AnimatedBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 4 + 1,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.shadowColor = "#ffce0a";
        ctx.shadowBlur = 12;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full border border-[#f6c500] opacity-100 blur-sm"
    />
  );
};

const GamesGallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(images.length);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // run initially
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // If it's mobile, start with partial view
    if (isMobile) {
      setVisibleCount(6);
    } else {
      setVisibleCount(images.length); // show all on desktop
    }
  }, [isMobile]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const breakpointColumns = {
    default: 4,
    1280: 3,
    768: 2,
    480: 1,
  };

  return (
    <section
      id="games"
      className="bg-primaryColor relative z-0 w-full overflow-hidden px-6 py-20 sm:px-8 md:px-16 lg:px-24"
    >
      <AnimatedBackground />
      <div className="text-yellowColor my-12 text-center text-4xl font-extrabold tracking-wider lg:text-5xl">
        Be part of the fun!
      </div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid flex gap-6"
        columnClassName="masonry-column"
      >
        {images.slice(0, visibleCount).map((src, i) => (
          <LazyImage key={i} src={src} index={i} />
        ))}
      </Masonry>
      {/* Show button only on mobile and if more images available */}
      {isMobile && visibleCount < images.length && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-yellowColor text-tertiaryColor rounded-full px-6 py-3 font-bold tracking-wide transition hover:bg-yellow-400"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default GamesGallery;
