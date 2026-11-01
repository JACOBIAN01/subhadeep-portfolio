// Figures for blog posts, drawn from a post's JSON:
//   { "t": "figure", "kind": "flow" | "compare" | "split" | "gate", ... }
// Each kind's fields are listed above its function. Missing or odd data never crashes:
// a figure draws what it can, or nothing.
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FiKey, FiLock, FiUnlock, FiMonitor, FiServer, FiDatabase, FiGlobe, FiUser, FiUsers,
  FiMail, FiSearch, FiShield, FiAlertTriangle, FiCloud, FiFileText, FiSmartphone,
  FiCheck, FiX, FiPlay, FiRotateCcw,
} from "react-icons/fi";

/* ------------------------------------------------------------------ shared bits */

const ICONS = {
  key: FiKey, lock: FiLock, unlock: FiUnlock, laptop: FiMonitor, server: FiServer,
  database: FiDatabase, globe: FiGlobe, user: FiUser, users: FiUsers, mail: FiMail,
  search: FiSearch, shield: FiShield, alert: FiAlertTriangle, cloud: FiCloud,
  file: FiFileText, phone: FiSmartphone,
};

// "tone" names a post can use, as [text colour, background colour].
const TONES = {
  blue: ["#0066cc", "#eff6ff"],
  orange: ["#ff9500", "#fff7ed"],
  red: ["#d93025", "#fdecea"],
  green: ["#1f9d55", "#eafaf0"],
  purple: ["#6a3fc6", "#f5f1fd"],
  grey: ["#86868b", "#f5f5f7"],
};

function toneColour(name, fallback = "blue") {
  return (TONES[name] || TONES[fallback])[0];
}

function toneBackground(name, fallback = "blue") {
  return (TONES[name] || TONES[fallback])[1];
}

const asList = (value) => (Array.isArray(value) ? value : []);

function Icon({ name }) {
  const IconComponent = ICONS[name];
  return IconComponent ? <IconComponent size={14} aria-hidden="true" /> : null;
}

function Frame({ label, buttons, children }) {
  return (
    <div className="rounded-3xl border border-hairline bg-canvas p-4 font-sans sm:p-6">
      {(label || buttons) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-faint">{label}</span>
          {buttons}
        </div>
      )}
      {children}
    </div>
  );
}

// True while the element is on screen, so animations only run when someone can see them.
function useOnScreen() {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.35,
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, onScreen];
}

/* ------------------------------------------------------------------ flow */
// A path through a system: boxes in order, with a dot travelling through them.
// steps: [{ title, sub, icon, focus }]   2–5 boxes; focus draws a heavier border
// runs:  [{ label, tone }]               optional; several runs take turns
// note:  small text under the legend

const SECONDS_PER_STEP = 0.6;
const GRID_COLUMNS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5" };

function Flow({ spec }) {
  const steps = asList(spec.steps);
  const runs = asList(spec.runs).length > 0 ? spec.runs : [{}];
  const [ref, onScreen] = useOnScreen();
  const [runIndex, setRunIndex] = useState(0);
  const secondsPerRun = steps.length * SECONDS_PER_STEP + 1.6;

  // Switch to the next run after each pass.
  useEffect(() => {
    if (!onScreen || runs.length < 2) return;
    const timer = setInterval(() => setRunIndex((i) => (i + 1) % runs.length), secondsPerRun * 1000);
    return () => clearInterval(timer);
  }, [onScreen, runs.length, secondsPerRun]);

  const run = runs[runIndex] || {};
  const dotColour = toneColour(run.tone);

  return (
    <Frame label={spec.label}>
      <div ref={ref} className={`grid grid-cols-2 gap-3 sm:gap-2 ${GRID_COLUMNS[steps.length] || ""}`}>
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div
              className="h-full rounded-2xl bg-white p-3"
              style={{ border: step.focus ? "2px solid #1d1d1f" : "1px solid var(--color-hairline)" }}
            >
              <div className="flex items-center justify-between text-ink">
                <span className="text-[10px] font-bold tracking-[0.1em] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon name={step.icon} />
              </div>
              <div className="mt-1.5 text-[13px] font-semibold leading-tight text-ink">{step.title}</div>
              {step.sub && <div className="mt-0.5 text-[11px] leading-snug text-subtle">{step.sub}</div>}
            </div>

            {onScreen && (
              <motion.div
                key={`${runIndex}-${i}`}
                className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{ background: dotColour }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
                transition={{
                  duration: 0.95,
                  delay: i * SECONDS_PER_STEP,
                  times: [0, 0.25, 0.7, 1],
                  repeat: runs.length < 2 ? Infinity : 0,
                  repeatDelay: secondsPerRun - 0.95,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {(run.label || spec.note) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {run.label && (
            <motion.span
              key={runIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[13px] font-semibold"
              style={{ color: dotColour }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: dotColour }} />
              {run.label}
            </motion.span>
          )}
          {spec.note && <span className="text-[12px] text-subtle">{spec.note}</span>}
        </div>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ compare */
// Same input, different outcomes: each lane sends a chip along; blocked lanes stop at a wall.
// lanes: [{ title, status, blocked, chip, note, tone }]   2–3 lanes

function Lane({ lane }) {
  const statusColour = toneColour(lane.tone, lane.blocked ? "green" : "red");
  const stopsAtWall = Boolean(lane.blocked);

  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink">{lane.title}</span>
        <span className="text-right text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: statusColour }}>
          {lane.status}
        </span>
      </div>

      <div className="relative mt-3 h-11 overflow-hidden rounded-xl bg-canvas-alt">
        {stopsAtWall && (
          <div className="absolute inset-y-0 right-[32%] w-1 rounded-full" style={{ background: statusColour }} />
        )}
        <motion.div
          className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-3 text-[11px] font-bold text-white shadow"
          style={{ background: stopsAtWall ? "#86868b" : "#d93025" }}
          initial={{ left: "2%" }}
          whileInView={{ left: stopsAtWall ? ["2%", "56%", "56%"] : ["2%", "102%"] }}
          transition={{
            duration: stopsAtWall ? 2.6 : 2.2,
            times: stopsAtWall ? [0, 0.55, 1] : [0, 1],
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        >
          {lane.chip || (stopsAtWall ? "stopped" : "through")}
        </motion.div>
      </div>

      {lane.note && <p className="mt-2.5 text-[12px] leading-relaxed text-subtle">{lane.note}</p>}
    </div>
  );
}

function Compare({ spec }) {
  const lanes = asList(spec.lanes);
  return (
    <Frame label={spec.label}>
      <div className={`grid gap-3 ${lanes.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {lanes.map((lane, i) => (
          <Lane key={i} lane={lane || {}} />
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ split */
// Where things live: two panes side by side, with optional share bars and a moving token.
// panes: [{ kicker, title, body, share, shareLabel, icon, tone }]   exactly 2
// mover: a short token that travels left pane -> right pane (e.g. "₿")
// out:   label for a last hop out of the right pane (the token ends there)

// True on screens wide enough to show the panes side by side (Tailwind's `sm:` size).
function useIsWide() {
  const query = "(min-width: 640px)";
  const [isWide, setIsWide] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setIsWide(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isWide;
}

// Where the token stops, as [left %, top %] of the figure: the left pane, the right pane,
// then the "out" label if there is one. Side by side on wide screens, stacked on phones.
function tokenStops(isWide, hasOut) {
  const stops = isWide ? [[25, 42], [75, 42]] : [[50, 22], [50, 70]];
  if (hasOut) stops.push(isWide ? [97, 96] : [93, 97]);
  return stops;
}

// The token fades in on the first stop, moves through each stop, and fades out on the last.
function TravellingToken({ text, stops, colour, running }) {
  const path = [stops[0], ...stops, stops[stops.length - 1]];
  const visible = path.map((_, i) => (i === 0 || i === path.length - 1 ? 0 : 1));

  return (
    <motion.div
      className="absolute z-10 flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white shadow-md"
      style={{ background: colour, x: "-50%", y: "-50%", left: `${stops[0][0]}%`, top: `${stops[0][1]}%`, opacity: 0 }}
      animate={
        running
          ? { left: path.map(([left]) => `${left}%`), top: path.map(([, top]) => `${top}%`), opacity: visible }
          : { opacity: 0 }
      }
      transition={{
        duration: 1.4 * stops.length,
        times: path.map((_, i) => i / (path.length - 1)),
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8,
      }}
    >
      {text}
    </motion.div>
  );
}

function Pane({ pane, fallbackTone }) {
  const colour = toneColour(pane.tone, fallbackTone);
  const hasShare = typeof pane.share === "number";

  return (
    <div
      className="flex-1 rounded-2xl border p-5 sm:p-6"
      style={{ borderColor: `${colour}33`, background: toneBackground(pane.tone, fallbackTone) }}
    >
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: colour }}>
        <Icon name={pane.icon} /> {pane.kicker}
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-ink">{pane.title}</div>
      {pane.body && <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{pane.body}</p>}

      {hasShare && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <motion.div
              className="h-full rounded-full"
              style={{ background: colour }}
              initial={{ width: 0 }}
              whileInView={{ width: `${pane.share}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="mt-1.5 text-[11px] font-medium" style={{ color: colour }}>
            {pane.shareLabel || `${pane.share}%`}
          </div>
        </div>
      )}
    </div>
  );
}

function Split({ spec }) {
  const [ref, onScreen] = useOnScreen();
  const isWide = useIsWide();
  const [left, right] = asList(spec.panes);
  if (!left || !right) return null;

  return (
    <Frame label={spec.label}>
      <div ref={ref} className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <Pane pane={left} fallbackTone="blue" />
          <div className="flex items-center justify-center sm:w-16">
            <div className="h-px w-full bg-hairline sm:h-full sm:w-px" />
          </div>
          <Pane pane={right} fallbackTone="orange" />
        </div>

        {spec.out && (
          <div className="mt-4 pr-10 text-right text-[11px] font-medium text-subtle">{spec.out}</div>
        )}

        {spec.mover && (
          <TravellingToken
            text={spec.mover}
            stops={tokenStops(isWide, Boolean(spec.out))}
            colour="#1d1d1f"
            running={onScreen}
          />
        )}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ gate (interactive) */
// The reader switches rules on, presses the button, and sees which requests get through.
// rules:    [{ name, hint, why, block }]          1–6; `block` says when the rule stops a request
// requests: [{ label, tag, detail, bad, fields }]  1–3; `bad: true` = should be stopped
// action, passed, passedBad, stopped, openNote:    optional wording
//
// `block` is a condition on the request's `fields`, for example
//   { "field": "amount", "op": ">", "value": 100 }
// or several conditions: { "any": [ ... ] } / { "all": [ ... ] }.

function conditionIsTrue(condition, fields) {
  if (!condition || typeof condition !== "object") return false;
  if (Array.isArray(condition.any)) return condition.any.some((c) => conditionIsTrue(c, fields));
  if (Array.isArray(condition.all)) return condition.all.every((c) => conditionIsTrue(c, fields));

  const actual = fields[condition.field];
  const expected = condition.value;

  switch (condition.op) {
    case ">":
      return actual > expected;
    case ">=":
      return actual >= expected;
    case "<":
      return actual < expected;
    case "<=":
      return actual <= expected;
    case "is":
      return actual === expected;
    case "not":
      return actual !== expected;
    case "in":
      return Array.isArray(expected) && expected.includes(actual);
    case "notIn":
      return Array.isArray(expected) && !expected.includes(actual);
    case "includes":
      return Array.isArray(actual) && actual.includes(expected);
    default:
      return false;
  }
}

// "Blocked: amount is over the limit." or just "Blocked." if the rule gives no reason.
function blockedMessage(spec, rule) {
  const word = spec.stopped || "Blocked";
  return typeof rule.why === "string" && rule.why ? `${word}: ${rule.why}.` : `${word}.`;
}

// The first switched-on rule that stops this request, or undefined if it gets through.
function findBlockingRule(activeRules, request) {
  const fields = request.fields && typeof request.fields === "object" ? request.fields : {};
  return activeRules.find((rule) => conditionIsTrue(rule.block, fields));
}

function RuleSwitch({ rule, on, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="flex items-start gap-3 rounded-xl border border-hairline bg-white p-3 text-left hover:border-ink/30"
    >
      <span
        className="mt-0.5 flex h-5 w-9 flex-none items-center rounded-full p-0.5 transition-colors"
        style={{ background: on ? "#1f9d55" : "#d2d2d7" }}
        aria-hidden="true"
      >
        <motion.span className="h-4 w-4 rounded-full bg-white shadow" animate={{ x: on ? 16 : 0 }} />
      </span>
      <span>
        <span className="block text-[13px] font-semibold text-ink">{rule.name}</span>
        {rule.hint && <span className="mt-0.5 block text-[12px] leading-snug text-subtle">{rule.hint}</span>}
      </span>
    </button>
  );
}

// One request's card. `step` counts how many rules have been checked so far (-1 = not run).
function RequestCard({ spec, request, activeRules, step }) {
  const blockingRule = findBlockingRule(activeRules, request);
  const blockedAt = activeRules.indexOf(blockingRule); // -1 if it gets through
  const finished = step >= 0 && (blockingRule ? step > blockedAt : step >= activeRules.length);

  // Right outcome = a bad request stopped, or a good request let through.
  const shouldBeStopped = Boolean(request.bad);
  const wasStopped = Boolean(blockingRule);
  const outcomeIsRight = wasStopped === shouldBeStopped;

  let message;
  if (wasStopped) message = blockedMessage(spec, blockingRule);
  else if (shouldBeStopped) message = spec.passedBad || "Got through.";
  else message = spec.passed || "Allowed.";

  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold text-ink">{request.label}</span>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.08em]"
          style={{ color: shouldBeStopped ? "#d93025" : "#0066cc" }}
        >
          {request.tag || (shouldBeStopped ? "bad" : "good")}
        </span>
      </div>
      {request.detail && <p className="mt-1 text-[12px] text-subtle">{request.detail}</p>}

      <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
        {activeRules.length === 0 && <li className="italic text-faint">No rules switched on.</li>}
        {activeRules.map((rule, i) => {
          const checked = step > i && (blockedAt === -1 || i <= blockedAt);
          const stoppedHere = checked && i === blockedAt;
          return (
            <li key={i} className="flex items-center gap-2 transition-opacity" style={{ opacity: checked ? 1 : 0.25 }}>
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full text-white"
                style={{ background: !checked ? "#d2d2d7" : stoppedHere ? "#d93025" : "#1f9d55" }}
                aria-hidden="true"
              >
                {stoppedHere ? <FiX size={10} /> : <FiCheck size={10} />}
              </span>
              <span className={stoppedHere ? "font-semibold text-ink" : "text-subtle"}>{rule.name}</span>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-xl px-3 py-2 text-[12px] font-semibold"
            style={{
              background: outcomeIsRight ? "#eafaf0" : "#fdecea",
              color: outcomeIsRight ? "#1f7a3a" : "#c2331b",
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Gate({ spec }) {
  const rules = asList(spec.rules).filter(Boolean);
  const requests = asList(spec.requests).filter(Boolean);

  const [switchedOn, setSwitchedOn] = useState(() => rules.map(() => false));
  const [step, setStep] = useState(-1); // -1 = not run yet

  const activeRules = rules.filter((_, i) => switchedOn[i]);
  const finished = step > activeRules.length;

  // While running, check one more rule every half second.
  useEffect(() => {
    if (step < 0 || finished) return;
    const timer = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(timer);
  }, [step, finished]);

  function toggleRule(index) {
    setSwitchedOn((current) => current.map((on, i) => (i === index ? !on : on)));
    setStep(-1);
  }

  function reset() {
    setSwitchedOn(rules.map(() => false));
    setStep(-1);
  }

  const everythingGotThrough = requests.every((r) => !findBlockingRule(activeRules, r));

  const buttons = (
    <div className="flex gap-2 text-[13px]">
      <button
        type="button"
        onClick={() => setStep(0)}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-medium text-white hover:bg-black"
      >
        <FiPlay size={12} aria-hidden="true" /> {spec.action || "Run"}
      </button>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-subtle hover:text-ink"
      >
        <FiRotateCcw size={12} aria-hidden="true" /> Reset
      </button>
    </div>
  );

  return (
    <Frame label={spec.label || "Try it"} buttons={buttons}>
      <div className="grid gap-2 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <RuleSwitch key={i} rule={rule} on={Boolean(switchedOn[i])} onToggle={() => toggleRule(i)} />
        ))}
      </div>

      <div className={`mt-4 grid gap-3 ${requests.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {requests.map((request, i) => (
          <RequestCard key={i} spec={spec} request={request} activeRules={activeRules} step={step} />
        ))}
      </div>

      {/* Read the results out to screen-reader users when a run finishes. */}
      <p aria-live="polite" className="sr-only">
        {finished
          ? requests
              .map((r) => {
                const rule = findBlockingRule(activeRules, r);
                return `${r.label}: ${rule ? blockedMessage(spec, rule) : "allowed."}`;
              })
              .join(" ")
          : ""}
      </p>

      {finished && everythingGotThrough && spec.openNote && (
        <p className="mt-4 text-[13px] leading-relaxed text-subtle">{spec.openNote}</p>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ pick the figure */

const FIGURES = { flow: Flow, compare: Compare, split: Split, gate: Gate };

export default function BlogFigure({ spec }) {
  const FigureComponent = FIGURES[spec?.kind];
  return FigureComponent ? <FigureComponent spec={spec} /> : null;
}
