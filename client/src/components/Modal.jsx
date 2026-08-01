import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const EASE = [0.16, 1, 0.3, 1];

export default function Modal({ open, onClose, title, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-60 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="bg-white rounded-3xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline shrink-0">
              <span className="text-[15px] font-medium text-ink">{title}</span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                className="text-subtle hover:text-ink transition-colors duration-300"
              >
                <IoClose className="text-2xl" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 min-h-0">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
