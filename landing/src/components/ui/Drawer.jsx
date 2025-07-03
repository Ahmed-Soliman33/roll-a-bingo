// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const drawerVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: -300, opacity: 0, transition: { duration: 0.2 } },
};

const Drawer = ({ isOpen, handleToggle, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={handleToggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* Drawer Content */}
          <motion.nav
            className="fixed top-0 left-0 z-50 flex h-full w-64 flex-col items-center bg-white p-4 shadow-lg"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
