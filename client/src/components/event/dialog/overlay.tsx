import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { OverlayPortal } from "./types";

const Overlay: OverlayPortal = ({ children }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-scroll bg-black/80"
    >
      <div className="flex justify-center py-8">{children}</div>
    </motion.div>,
    document.body,
  );
};

export default Overlay;
