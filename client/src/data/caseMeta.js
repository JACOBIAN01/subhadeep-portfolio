// Plain-JS (no JSX or asset imports) so the build-time prerender script can
// import it in Node. Used for per-page <title>, description and sitemap.
export const SITE = "https://www.subhadeepghorai.in";

export const CASE_META = [
  {
    slug: "eventloop-studio",
    title: "EventLoop Studio: runs your own JavaScript and replays the event loop",
    description:
      "A VS Code extension on the Marketplace that executes your code in a real Node vm sandbox and replays the call stack, microtasks, timers and libuv phases step by step.",
  },
  {
    slug: "sesd-agent",
    title: "SESD-Agent: LLM orchestration for grading 441 students in ~110 minutes",
    description:
      "Three orchestrated Claude API pipelines that grade GitHub repos, case studies and coding streaks, writing scores straight back to the cohort's Google Sheet.",
  },
  {
    slug: "adcms",
    title: "ADCMS: course platform with tamper-proof, commit-based evaluation",
    description:
      "An internal platform where students submit a GitHub repo per project and teachers evaluate progress against an immutable commit history.",
  },
  {
    slug: "atlas",
    title: "Atlas: internal operations platform for a 700+ teacher organisation",
    description:
      "Replaced a Google Form and Canva workflow for module tracking and certificate issuing; 168 certificates automated at $0/month infrastructure.",
  },
];

export const getCaseMeta = (slug) => CASE_META.find((c) => c.slug === slug);
