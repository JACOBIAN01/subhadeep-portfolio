import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, animate, useReducedMotion } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { VideoSources } from "./AutoplayVideo";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 0.5;

// Offset and scale that place `to` exactly over `from`, so the frame can grow
// out of the stage and shrink back into it.
function deltaBetween(from, to) {
  return {
    x: from.left + from.width / 2 - (to.left + to.width / 2),
    y: from.top + from.height / 2 - (to.top + to.height / 2),
    scale: from.width / to.width,
  };
}

export default function TeachingLightbox({ clips, startIndex, startTime, origin, getOrigin, onClose }) {
  const reduceMotion = useReducedMotion();
  const count = clips.length;
  const [index, setIndex] = useState(startIndex);
  const indexRef = useRef(startIndex);
  const resumeAt = useRef(startTime);

  const dialogRef = useRef(null);
  const backdropRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const closeRef = useRef(null);
  const closing = useRef(false);
  
  const go = useCallback(
    (next) => {
      const i = (next + count) % count;
      indexRef.current = i;
      resumeAt.current = 0;
      setIndex(i);
    },
    [count]
  );

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const time = videoRef.current?.currentTime ?? 0;
    const from = getOrigin();
    const frame = frameRef.current;
    if (!reduceMotion && from && frame) {
      const to = frame.getBoundingClientRect();
      await Promise.all([
        animate(frame, deltaBetween(from, to), { duration: DURATION * 0.8, ease: EASE }),
        animate(backdropRef.current, { opacity: 0 }, { duration: DURATION * 0.8, ease: EASE }),
      ]);
    }
    onClose(indexRef.current, time);
  }, [getOrigin, onClose, reduceMotion]);

  // Grow out of the stage.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (reduceMotion || !origin || !frame) return;
    const d = deltaBetween(origin, frame.getBoundingClientRect());
    animate(frame, { x: [d.x, 0], y: [d.y, 0], scale: [d.scale, 1] }, { duration: DURATION, ease: EASE });
    animate(backdropRef.current, { opacity: [0, 1] }, { duration: DURATION, ease: EASE });
  }, [origin, reduceMotion]);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(indexRef.current + 1);
      else if (e.key === "ArrowLeft") go(indexRef.current - 1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusables = dialogRef.current?.querySelectorAll("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, go]);

  // Resume where the stage left off on open; start from zero after that.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = resumeAt.current;
    video.play().catch(() => {});
  }, [index]);

  const clip = clips[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Teaching clip: ${clip.title}`}
      className="fixed inset-0 z-60 flex flex-col items-center justify-center p-4 md:p-10"
    >
      <div ref={backdropRef} className="absolute inset-0 bg-black/90" onClick={close} />

      <button
        ref={closeRef}
        onClick={close}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 text-2xl backdrop-blur-md transition-colors duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <IoClose aria-hidden="true" />
      </button>

      <div ref={frameRef} className="relative w-full max-w-[min(1040px,calc(78vh*16/9))]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, { offset, velocity }) => {
            if (offset.x < -60 || velocity.x < -500) go(index + 1);
            else if (offset.x > 60 || velocity.x > 500) go(index - 1);
          }}
          className="relative aspect-video overflow-hidden rounded-2xl bg-black touch-pan-y"
        >
          <AnimatePresence initial={false}>
            <motion.video
              key={clip.title}
              // The outgoing clip unmounts after its fade; don't let it null the ref.
              ref={(el) => el && (videoRef.current = el)}
              poster={clip.poster}
              aria-label={clip.title}
              muted
              playsInline
              autoPlay
              preload="auto"
              onEnded={() => go(index + 1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
              className="absolute inset-0 h-full w-full object-contain pointer-events-none"
            >
              <VideoSources clip={clip} />
            </motion.video>
          </AnimatePresence>
        </motion.div>

        <NavButton side="left" label="Previous clip" onClick={() => go(index - 1)}>
          <IoChevronBack />
        </NavButton>
        <NavButton side="right" label="Next clip" onClick={() => go(index + 1)}>
          <IoChevronForward />
        </NavButton>
      </div>

      <div className="relative mt-6 w-full max-w-[min(1040px,calc(78vh*16/9))] flex items-start justify-between gap-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={clip.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            aria-live="polite"
          >
            <div className="text-base md:text-lg font-medium text-white">{clip.title}</div>
            <div className="text-sm text-white/70 mt-1">{clip.context}</div>
          </motion.div>
        </AnimatePresence>
        <div className="shrink-0 text-sm tabular-nums text-white/60">
          {index + 1} / {count}
        </div>
      </div>
    </div>,
    document.body
  );
}

function NavButton({ side, label, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-4" : "right-4"
      } h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white/80 text-xl backdrop-blur-md transition-colors duration-300 hover:bg-black/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
