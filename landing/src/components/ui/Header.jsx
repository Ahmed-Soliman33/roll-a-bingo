import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import headerContent from "@content/header.json";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black/60 to-transparent px-4 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.img
          src={headerContent.logo}
          alt="ROLL-A-BINGO"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-40 cursor-pointer drop-shadow-lg sm:w-44 md:w-56"
        />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {headerContent.navLinks.map((item) => (
            <motion.div
              key={item.text}
              whileTap={{ scale: 1.15, rotateZ: 3 }}
              whileHover={{ scale: 1.08, rotateZ: -2 }}
              transition={{ type: "spring", stiffness: 250, damping: 14 }}
              className="cursor-pointer"
              onClick={() => {
                if (document.getElementById(item.path)) {
                  setTimeout(() => {
                    setMenuOpen(false);
                    scroller.scrollTo(item.path, {
                      smooth: true,
                      duration: 500,
                      offset: -70,
                    });
                  }, 400);
                } else {
                  console.warn("Section not found:", item.path);
                }
              }}
            >
              <Link className="relative inline-block animate-pulse bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-xl font-extrabold tracking-wider text-transparent uppercase transition-all duration-500 hover:tracking-[0.2em] hover:blur-[0.3px] hover:brightness-125">
                {item.text}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-yellowColor z-[60] md:hidden"
        >
          {menuOpen ? <X size={40} /> : <Menu size={32} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 z-40 flex h-screen w-full flex-col items-center justify-center gap-10 bg-black/90 text-white backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            >
              {headerContent.navLinks.map((item) => (
                <motion.div
                  key={item.text}
                  whileTap={{ scale: 0.9, rotateZ: -10 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    onClick={() => {
                      if (document.getElementById(item.path)) {
                        setTimeout(() => {
                          setMenuOpen(false);
                          scroller.scrollTo(item.path, {
                            smooth: true,
                            duration: 500,
                            offset: -70,
                          });
                        }, 400);
                      } else {
                        console.warn("Section not found:", item.path);
                      }
                    }}
                    className="nimate-pulse block cursor-pointer bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-widest text-transparent uppercase transition-all duration-500 hover:tracking-[0.2em] hover:blur-[0.3px] hover:brightness-125"
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
