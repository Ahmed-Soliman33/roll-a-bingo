import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, PhoneForwarded } from "lucide-react";

import footerContent from "@content/footer.json";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-blackColor w-full px-4 pt-10 pb-6 text-sm text-gray-300 sm:px-10"
    >
      {/* Copyright + Designer */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
        <p className="text-center text-[.65rem] tracking-widest sm:text-xs">
          © {year}{" "}
          <span className="text-yellowColor font-semibold">
            {footerContent.copyrightDesigner}
          </span>{" "}
          – All Rights Reserved.
        </p>

        <div className="flex items-center gap-2 text-[.65rem] text-gray-400 sm:text-xs">
          <span>Powered by</span>
          <a
            href={footerContent.poweredByLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellowColor font-bold text-white transition-colors duration-300"
          >
            {footerContent.poweredBy}
          </a>
        </div>
      </div>

      {/* Social Media Links */}
      <motion.div
        className="mt-5 flex justify-center gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        {footerContent.socalMedia.map(({ icon: Icon, link }, idx) => (
          <motion.a
            key={idx}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hover:text-yellowColor text-white transition duration-300"
          >
            {Icon === "Facebook" && <Facebook size={20} strokeWidth={2.2} />}
            {Icon === "Twitter" && <Twitter size={20} strokeWidth={2.2} />}
            {Icon === "Instagram" && <Instagram size={20} strokeWidth={2.2} />}
            {Icon === "PhoneForwarded" && (
              <PhoneForwarded size={20} strokeWidth={2.2} />
            )}
          </motion.a>
        ))}
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
