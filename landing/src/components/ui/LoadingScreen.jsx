import { motion } from "framer-motion";

import Spinner from "./Spinner";

const LoadingScreen = () => {
  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center gap-8 px-4 text-white"
      style={{
        background:
          "linear-gradient(to bottom right, #1d001a, #75106b, #af1173)",
      }}
    >
      {/* Animated Icon or Game Graphic */}
      <Spinner />

      {/* Game Title or Catchy Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center text-lg font-extrabold tracking-widest sm:text-xl md:text-2xl"
        style={{ fontFamily: "var(--font-backso)" }}
      >
        Loading...
      </motion.p>

      {/* Progress Bar Animation */}
      <div className="relative h-3 w-full max-w-xs overflow-hidden rounded-full bg-white/10 shadow-lg">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-[var(--color-yellowColor)] blur-[2px]"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
