import { useEffect, useRef } from "react";

// Plays only while actually in view: sidesteps browsers that don't reliably
// honor the autoplay attribute, and skips decoding video that's off-screen.
export default function AutoplayVideo({ clip, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={clip.poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-auto"
    >
      {/* AV1 first for browsers that can decode it; H.264 plays everywhere else. */}
      {clip.av1 && <source src={clip.av1} type='video/mp4; codecs="av01.0.05M.10"' />}
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}
