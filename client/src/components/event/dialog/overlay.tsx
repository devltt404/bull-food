import { createPortal } from "react-dom";
import { OverlayPortal } from "./types";

const Overlay: OverlayPortal = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/80">
      <div className="flex justify-center py-8">{children}</div>
    </div>,
    document.body,
  );
};

export default Overlay;
