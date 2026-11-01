import { useCallback, useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IoPause, IoPlay, IoExpand } from "react-icons/io5";
import { VideoSources } from "./AutoplayVideo";
import TeachingLightbox from "./TeachingLightbox";

const EASE = [0.16, 1, 0.3, 1];
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;

// One stage, one clip at a time. Chapter bars under the stage fill as the
// clip plays, then the reel moves on to the next clip.
export default function TeachingReel({ clips }) {
  const reduceMotion = useReducedMotion();
  const count = clips.length;

  const [active, setActive] = useState(0);
  // Reduced motion: nothing moves until the visitor presses play.
  const [paused, setPaused] = useState(() => !!reduceMotion);
  const [hasStarted, setHasStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { index, time, origin }
  const [announce, setAnnounce] = useState("");

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const expandButtonRef = useRef(null);
  const videoRefs = useRef([]);
  const tabRefs = useRef([]);
  const draggedRef = useRef(false);

  const shouldPlay = inView && pageVisible && !paused && !lightbox;

  // Scroll-in "settle": the stage grows into place as it reaches the middle.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    // Settle to exactly 1x before the viewer is watching: a scaled video is
    // resampled every frame, which softens footage that's already low on detail.
    offset: ["start end", "start 0.6"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 28]);

  useEffect(() => {
    if (reduceMotion) setPaused(true);
  }, [reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Only the active clip plays; the rest sit paused under it.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && shouldPlay) {
        video.play().then(() => setHasStarted(true)).catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, shouldPlay]);

  // Progress bars are written straight to the DOM so playback never
  // re-renders React. Earlier chapters stay full, later ones stay empty.
  const setFill = useCallback((i, ratio) => {
    rootRef.current
      ?.querySelectorAll(`[data-fill="${i}"]`)
      .forEach((el) => (el.style.transform = `scaleX(${ratio})`));
  }, []);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      if (i < active) setFill(i, 1);
      else if (i > active) setFill(i, 0);
    }
    const video = videoRefs.current[active];
    if (video?.duration) setFill(active, video.currentTime / video.duration);
    else setFill(active, 0);
  }, [active, count, setFill]);

  useEffect(() => {
    if (!shouldPlay) return;
    let frame;
    const tick = () => {
      const video = videoRefs.current[active];
      if (video?.duration) setFill(active, Math.min(video.currentTime / video.duration, 1));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, shouldPlay, setFill]);

  const goTo = useCallback(
    (index, { byUser = false, time = 0 } = {}) => {
      const next = (index + count) % count;
      const video = videoRefs.current[next];
      if (video) video.currentTime = time;
      setActive(next);
      // Announce only choices the visitor made, not auto-advance.
      setAnnounce(byUser ? `${clips[next].title}. ${clips[next].context}` : "");
    },
    [clips, count]
  );

  const onTabKeyDown = (e, i) => {
    let target = null;
    if (e.key === "ArrowRight") target = (i + 1) % count;
    else if (e.key === "ArrowLeft") target = (i - 1 + count) % count;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = count - 1;
    if (target === null) return;
    e.preventDefault();
    goTo(target, { byUser: true });
    tabRefs.current[target]?.focus();
  };

  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) goTo(active + 1, { byUser: true });
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) goTo(active - 1, { byUser: true });
  };

  const openLightbox = () => {
    if (draggedRef.current) return;
    const video = videoRefs.current[active];
    setLightbox({
      index: active,
      time: video?.currentTime ?? 0,
      origin: stageRef.current?.getBoundingClientRect() ?? null,
    });
  };

  const closeLightbox = (index, time) => {
    setLightbox(null);
    goTo(index, { time });
    requestAnimationFrame(() => expandButtonRef.current?.focus());
  };

  const togglePaused = () => setPaused((p) => !p);
  const clip = clips[active];
  const fadeDuration = reduceMotion ? 0 : 0.6;
  const showCenterPlay = paused && !hasStarted;

  return (
    <div ref={rootRef} className="mx-auto max-w-[880px] mb-16">
      <motion.div
        ref={stageRef}
        id="teaching-stage"
        role="tabpanel"
        aria-labelledby={`teaching-tab-${active}`}
        style={reduceMotion ? { borderRadius: 28 } : { scale, borderRadius: radius }}
        whileHover={isTouch || reduceMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="group relative overflow-hidden bg-canvas-alt border border-hairline shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      >
        <motion.div
          drag={isTouch ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => (draggedRef.current = true)}
          onDragEnd={(e, info) => {
            onDragEnd(e, info);
            // Let the click that follows a drag pass without opening the lightbox.
            setTimeout(() => (draggedRef.current = false), 0);
          }}
          onClick={openLightbox}
          className="relative aspect-video cursor-zoom-in touch-pan-y"
        >
          {clips.map((c, i) => {
            const isActive = i === active;
            const isNext = i === (active + 1) % count;
            return (
              <motion.video
                key={c.title}
                ref={(el) => (videoRefs.current[i] = el)}
                poster={c.poster}
                aria-label={c.title}
                aria-hidden={!isActive}
                muted
                playsInline
                preload={isActive || isNext ? "auto" : "metadata"}
                onEnded={() => isActive && goTo(active + 1)}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.03 }}
                transition={{ duration: fadeDuration, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              >
                <VideoSources clip={c} />
              </motion.video>
            );
          })}

          {/* Crisp inner edge: a sharp frame makes soft footage read sharper. */}
          <span className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />

          {showCenterPlay && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <IoPlay className="text-2xl translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          )}
        </motion.div>

        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/20 to-transparent pointer-events-none transition-opacity duration-300 ${
            paused || isTouch
              ? "opacity-100"
              : "[@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          }`}
        />
        <div
          className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300 ${
            paused || isTouch
              ? "opacity-100"
              : "[@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          }`}
        >
          <GlassButton
            onClick={togglePaused}
            label={paused ? "Play teaching clips" : "Pause teaching clips"}
            pressed={paused}
          >
            {paused ? <IoPlay className="translate-x-px" /> : <IoPause />}
          </GlassButton>
          <GlassButton ref={expandButtonRef} onClick={openLightbox} label="Expand clip">
            <IoExpand />
          </GlassButton>
        </div>
      </motion.div>

      <div className="sr-only" aria-live="polite">
        {announce}
      </div>

      <ChapterTabs
        clips={clips}
        active={active}
        tabRefs={tabRefs}
        onSelect={(i) => goTo(i, { byUser: true })}
        onKeyDown={onTabKeyDown}
      />

      {/* Tablet: one shared caption under the title-only tabs. */}
      <div className="hidden sm:block lg:hidden mt-5 text-center min-h-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={clip.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            className="text-sm text-subtle"
          >
            {clip.context}
          </motion.p>
        </AnimatePresence>
      </div>

      <PillDots
        clips={clips}
        active={active}
        onSelect={(i) => goTo(i, { byUser: true })}
        reduceMotion={reduceMotion}
      />

      {lightbox && (
        <TeachingLightbox
          clips={clips}
          startIndex={lightbox.index}
          startTime={lightbox.time}
          origin={lightbox.origin}
          getOrigin={() => stageRef.current?.getBoundingClientRect() ?? null}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

function ChapterTabs({ clips, active, tabRefs, onSelect, onKeyDown }) {
  return (
    <div role="tablist" aria-label="Teaching clips" className="hidden sm:grid grid-cols-4 gap-6 mt-8">
      {clips.map((c, i) => {
        const isActive = i === active;
        return (
          <motion.button
            key={c.title}
            ref={(el) => (tabRefs.current[i] = el)}
            id={`teaching-tab-${i}`}
            role="tab"
            aria-selected={isActive}
            aria-controls="teaching-stage"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
            className="group/tab flex flex-col justify-start h-full text-left rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="block h-[3px] rounded-full bg-hairline overflow-hidden">
              <span
                data-fill={i}
                className="block h-full w-full origin-left bg-ink"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            <span
              className={`mt-4 block min-h-[2lh] text-sm font-medium leading-snug line-clamp-2 transition-colors duration-300 ${
                isActive ? "text-ink" : "text-subtle group-hover/tab:text-ink"
              }`}
            >
              {c.title}
            </span>
            {/* Always rendered so the row never jumps; only the active one shows. */}
            <span
              className={`hidden lg:block mt-1 text-sm text-subtle leading-snug transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {c.context}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function PillDots({ clips, active, onSelect, reduceMotion }) {
  const clip = clips[active];
  return (
    <div className="sm:hidden mt-6">
      <div className="flex items-center justify-center gap-2">
        {clips.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.title}
              onClick={() => onSelect(i)}
              aria-label={`Show clip ${i + 1}: ${c.title}`}
              aria-current={isActive}
              className="p-1.5 -m-1.5"
            >
              <span
                className={`block h-2 rounded-full bg-hairline overflow-hidden transition-[width] duration-500 ${
                  isActive ? "w-8" : "w-2"
                }`}
              >
                <span
                  data-fill={isActive ? i : undefined}
                  className="block h-full w-full origin-left bg-ink"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 text-center min-h-12 px-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={clip.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
          >
            <div className="text-base font-medium text-ink">{clip.title}</div>
            <div className="text-sm text-subtle mt-1">{clip.context}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function GlassButton({ ref, onClick, label, pressed, children }) {
  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      aria-pressed={pressed}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-ink text-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-[background-color,transform] duration-300 hover:bg-white/90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
