// Figures for blog posts, drawn from a post's JSON:
//   { "t": "figure", "kind": "flow" | "compare" | "split" | "gate", ... }
// Each kind's fields are listed above its function. The diagrams are still pictures;
// only "gate" is interactive. Missing or odd data never crashes: a figure draws what it
// can, or nothing.
import { useState } from "react";
import {
  FiKey, FiLock, FiUnlock, FiMonitor, FiServer, FiDatabase, FiGlobe, FiUser, FiUsers,
  FiMail, FiSearch, FiShield, FiAlertTriangle, FiCloud, FiFileText, FiSmartphone,
  FiCheck, FiX, FiPlay, FiRotateCcw, FiArrowRight,
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

function Dot({ colour }) {
  return <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: colour }} />;
}

/* ------------------------------------------------------------------ flow */
// A path through a system: numbered boxes in order.
// steps: [{ title, sub, icon, focus }]   2–5 boxes; focus draws a heavier border
// runs:  [{ label, tone }]               optional; listed under the boxes as a legend
// note:  small text under the legend

const GRID_COLUMNS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5" };

function Flow({ spec }) {
  const steps = asList(spec.steps).filter(Boolean);
  const runs = asList(spec.runs).filter((run) => run && run.label);

  return (
    <Frame label={spec.label}>
      <ol className={`grid grid-cols-2 gap-3 sm:gap-2 ${GRID_COLUMNS[steps.length] || ""}`}>
        {steps.map((step, i) => (
          <li
            key={i}
            className="rounded-2xl bg-white p-3"
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
          </li>
        ))}
      </ol>

      {(runs.length > 0 || spec.note) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {runs.map((run, i) => (
            <span key={i} className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: toneColour(run.tone) }}>
              <Dot colour={toneColour(run.tone)} />
              {run.label}
            </span>
          ))}
          {spec.note && <span className="text-[12px] text-subtle">{spec.note}</span>}
        </div>
      )}
    </Frame>
  );
}

/* ------------------------------------------------------------------ compare */
// Same input, different outcomes. A blocked lane shows its chip stopped at a wall;
// the others show it through to the end.
// lanes: [{ title, status, blocked, chip, note, tone }]   2–3 lanes

function Lane({ lane }) {
  const stopsAtWall = Boolean(lane.blocked);
  const statusColour = toneColour(lane.tone, stopsAtWall ? "green" : "red");

  return (
    <div className="rounded-2xl border border-hairline bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink">{lane.title}</span>
        <span className="text-right text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: statusColour }}>
          {lane.status}
        </span>
      </div>

      <div className="relative mt-3 flex h-11 items-center rounded-xl bg-canvas-alt px-2">
        {stopsAtWall && (
          <div className="absolute inset-y-0 right-[32%] w-1 rounded-full" style={{ background: statusColour }} />
        )}
        <span
          className="flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[11px] font-bold text-white shadow"
          // Pushed right: to just before the wall if blocked, otherwise all the way to the end.
          style={{
            background: stopsAtWall ? "#86868b" : "#d93025",
            marginLeft: "auto",
            marginRight: stopsAtWall ? "calc(32% + 0.75rem)" : 0,
          }}
        >
          {lane.chip || (stopsAtWall ? "stopped" : "through")}
          {!stopsAtWall && <FiArrowRight size={11} aria-hidden="true" />}
        </span>
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
// Where things live: two panes side by side (stacked on phones), with optional share bars.
// panes: [{ kicker, title, body, share, shareLabel, icon, tone }]   exactly 2
// mover: a short token shown on the arrow between the panes (e.g. "₿")
// out:   label for a last step out of the right pane

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
            <div className="h-full rounded-full" style={{ background: colour, width: `${pane.share}%` }} />
          </div>
          <div className="mt-1.5 text-[11px] font-medium" style={{ color: colour }}>
            {pane.shareLabel || `${pane.share}%`}
          </div>
        </div>
      )}
    </div>
  );
}

// A small token like "₿" on an arrow. Points right on wide screens, down on phones.
function TokenArrow({ text }) {
  return (
    <span className="flex items-center gap-1 text-faint">
      {text && (
        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-ink px-1.5 text-[10px] font-bold text-white">
          {text}
        </span>
      )}
      <FiArrowRight size={14} aria-hidden="true" className="rotate-90 sm:rotate-0" />
    </span>
  );
}

function Split({ spec }) {
  const [left, right] = asList(spec.panes);
  if (!left || !right) return null;

  return (
    <Frame label={spec.label}>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Pane pane={left} fallbackTone="blue" />
        <div className="flex justify-center">
          <TokenArrow text={spec.mover} />
        </div>
        <Pane pane={right} fallbackTone="orange" />
      </div>

      {spec.out && (
        <div className="mt-4 flex items-center justify-end gap-2 text-[11px] font-medium text-subtle">
          <FiArrowRight size={12} aria-hidden="true" />
          {spec.out}
        </div>
      )}
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

// What happened to one request, and whether that was the right outcome. Used for both the
// card and the screen-reader announcement, so the two always say the same thing.
function requestOutcome(spec, request, activeRules) {
  const blockingRule = findBlockingRule(activeRules, request);
  // Right outcome = a bad request stopped, or a good request let through.
  const shouldBeStopped = Boolean(request.bad);
  const wasStopped = Boolean(blockingRule);

  let message;
  if (wasStopped) message = blockedMessage(spec, blockingRule);
  else if (shouldBeStopped) message = spec.passedBad || "Got through.";
  else message = spec.passed || "Allowed.";

  return { blockingRule, message, outcomeIsRight: wasStopped === shouldBeStopped };
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
        className={`mt-0.5 flex h-5 w-9 flex-none items-center rounded-full p-0.5 ${on ? "justify-end" : "justify-start"}`}
        style={{ background: on ? "#1f9d55" : "#d2d2d7" }}
        aria-hidden="true"
      >
        <span className="h-4 w-4 rounded-full bg-white shadow" />
      </span>
      <span>
        <span className="block text-[13px] font-semibold text-ink">{rule.name}</span>
        {rule.hint && <span className="mt-0.5 block text-[12px] leading-snug text-subtle">{rule.hint}</span>}
      </span>
    </button>
  );
}

// One request's card. Before a run it lists the switched-on rules; after a run it marks
// which rules passed, which one stopped the request, and shows the result.
function RequestCard({ spec, request, activeRules, ran }) {
  const { blockingRule, message, outcomeIsRight } = requestOutcome(spec, request, activeRules);
  const shouldBeStopped = Boolean(request.bad);
  const blockedAt = activeRules.indexOf(blockingRule); // -1 if it gets through

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
          // After a run: rules up to the one that stopped the request were checked.
          const checked = ran && (blockedAt === -1 || i <= blockedAt);
          const stoppedHere = checked && i === blockedAt;
          return (
            <li key={i} className="flex items-center gap-2" style={{ opacity: checked ? 1 : 0.35 }}>
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

      {ran && (
        <div
          className="mt-3 rounded-xl px-3 py-2 text-[12px] font-semibold"
          style={{
            background: outcomeIsRight ? "#eafaf0" : "#fdecea",
            color: outcomeIsRight ? "#1f7a3a" : "#c2331b",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

function Gate({ spec }) {
  const rules = asList(spec.rules).filter(Boolean);
  const requests = asList(spec.requests).filter(Boolean);

  const [switchedOn, setSwitchedOn] = useState(() => rules.map(() => false));
  const [ran, setRan] = useState(false); // results show after the button is pressed

  const activeRules = rules.filter((_, i) => switchedOn[i]);
  const everythingGotThrough = requests.every((r) => !findBlockingRule(activeRules, r));

  function toggleRule(index) {
    setSwitchedOn((current) => current.map((on, i) => (i === index ? !on : on)));
    setRan(false);
  }

  function reset() {
    setSwitchedOn(rules.map(() => false));
    setRan(false);
  }

  const buttons = (
    <div className="flex gap-2 text-[13px]">
      <button
        type="button"
        onClick={() => setRan(true)}
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
          <RequestCard key={i} spec={spec} request={request} activeRules={activeRules} ran={ran} />
        ))}
      </div>

      {/* Read the results out to screen-reader users after a run. */}
      <p aria-live="polite" className="sr-only">
        {ran ? requests.map((r) => `${r.label}: ${requestOutcome(spec, r, activeRules).message}`).join(" ") : ""}
      </p>

      {ran && everythingGotThrough && spec.openNote && (
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
