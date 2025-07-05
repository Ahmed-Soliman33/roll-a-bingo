import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import logo from "/logo.webp";

const navItems = ["Home", "Games", "Gallery", "Events", "Contact"];

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
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.toLowerCase()}
                smooth
                duration={600}
                offset={-70}
                className="group relative cursor-pointer text-xs font-bold tracking-wide text-white uppercase transition-all duration-300 hover:text-yellow-400 sm:text-sm"
              >
                {item}
                <span className="absolute top-full left-0 mt-1 block h-0.5 w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
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
                    // تأثير أولاً
                    setTimeout(() => {
                      // يقفل المودال بعد شوية
                      setMenuOpen(false);

                      // يعمل سكرول للمكان المطلوب
                      scroller.scrollTo(item.toLowerCase(), {
                        smooth: true,
                        duration: 600,
                        offset: -70,
                      });
                    }, 250); // وقت التأثير قبل التنقل
                  }}
                  className="text-2xl font-extrabold tracking-widest uppercase transition-all duration-300 hover:text-yellow-400"
                >
                  {item}
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
