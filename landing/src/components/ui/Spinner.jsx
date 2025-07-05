import Lottie from "lottie-react";
import { motion } from "framer-motion";

import animationData from "@animations/animation-loading.json";

const Spinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-[180px] sm:w-[220px] md:w-[250px]"
    >
      <Lottie animationData={animationData} loop autoplay />
    </motion.div>
  );
};

export default Spinner;
