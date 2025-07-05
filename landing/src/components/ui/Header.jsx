import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import logo from "/logo.webp";

const navItems = [
  { text: "Home", path: "/" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
  { text: "Games", path: "/games" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black/60 to-transparent px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="ROLL-A-BINGO"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-36 cursor-pointer drop-shadow-lg sm:w-44 md:w-56"
        />

        {/* Desktop Nav */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item}
              whileTap={{
                scale: 1.2,
                rotateZ: 3,
              }}
              whileHover={{
                scale: 1.1,
                rotateZ: -2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              onClick={() => {
                setTimeout(() => {
                  setMenuOpen(false);
                  scroller.scrollTo(item.path, {
                    smooth: true,
                    duration: 800,
                    offset: -70,
                  });
                }, 400); // استنى الانيميشن يخلص
              }}
              className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-2xl font-extrabold tracking-widest text-transparent uppercase transition-all duration-500 hover:tracking-[0.2em] hover:blur-[0.3px] hover:brightness-125"
            >
              <span className="inline-block animate-pulse">{item.text}</span>
            </motion.button>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="z-[60] text-white md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 z-40 flex h-screen w-full flex-col items-center justify-center gap-8 bg-black/90 text-white backdrop-blur-sm md:hidden"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  whileTap={{ scale: 0.9, rotateZ: -2 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => {
                    setTimeout(() => {
                      setMenuOpen(false);

                      scroller.scrollTo(`${item.path}`, {
                        smooth: true,
                        duration: 600,
                        offset: -70,
                      });
                    }, 250);
                  }}
                  className="text-2xl font-extrabold tracking-widest uppercase transition-all duration-300 hover:text-yellow-400"
                >
                  {item.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
