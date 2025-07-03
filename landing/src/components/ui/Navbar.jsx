import { useEffect, useRef, useState } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import Button from "./Button";
import Drawer from "./Drawer";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "packages" },
  { name: "About", path: "about" },
  { name: "Contact us", path: "contact" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY.current && currentY > 60) {
            setShowHeader(false); // scrolling down
          } else {
            setShowHeader(true); // scrolling up
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  return (
    <>
      <header
        className={`drawer fixed top-0 left-0 z-40 max-h-25 w-full bg-white/90 shadow-lg shadow-gray-300/55 backdrop-blur-lg transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="drawer-content">
          {/* Navbar */}
          <div className="navbar flex w-full justify-between px-4 py-5 md:px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Logo />
            </motion.div>
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Button variant="primary" size="sm" className="">
                Get Started Now
              </Button>
              <button
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
                onClick={handleDrawerToggle}
              >
                <Bars3BottomRightIcon className="text-primaryTextColor sm:h-16 sm:w-16" />
              </button>
            </div>

            <nav className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center justify-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    className="bg-none"
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primaryColor text-[1.1rem] font-medium"
                          : "text-primaryTextColor hover:text-primaryColor text-[1.1rem] font-medium"
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="hidden gap-4 lg:flex">
              <Button
                action={() => console.log("Sign In clicked")}
                variant="secondary"
                size="md"
                className=""
              >
                Sign In
              </Button>
              <Button variant="primary" size="md" className="">
                Start my Business
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Drawer isOpen={isDrawerOpen} handleToggle={handleDrawerToggle}>
        <div onClick={handleDrawerToggle} className="mb-4">
          <Logo />
        </div>
        <ul className="flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryColor text-[1.1rem] font-medium"
                    : "text-primaryTextColor hover:text-primaryColor text-[1.1rem] font-medium"
                }
                onClick={handleDrawerToggle}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button
          action={() => console.log("Sign In clicked")}
          variant="secondary"
          size="md"
          className="mt-10"
        >
          Sign In
        </Button>
      </Drawer>
    </>
  );
};

export default Navbar;
