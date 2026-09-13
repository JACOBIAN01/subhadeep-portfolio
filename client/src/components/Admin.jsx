// src/components/Admin.jsx
import { useEffect, useState } from "react";
import {
  FaEye,
  FaUserPlus,
  FaUserCheck,
  FaGlobeAmericas,
  FaLock,
} from "react-icons/fa";
import GlassCard from "./GlassCard";

const DURATION_LABELS = {
  quick: "Left quickly (under 10s)",
  browsed: "Browsed a bit (10s–1m)",
  engaged: "Read the whole page (1m+)",
};

function sortedEntries(obj = {}) {
  return Object.entries(obj)
    .map(([label, value]) => ({ label, value: Number(value) || 0 }))
    .sort((a, b) => b.value - a.value);
}

function withPercentages(entries) {
  const total = entries.reduce((sum, e) => sum + e.value, 0) || 1;
  return entries.map((e) => ({ ...e, pct: Math.round((e.value / total) * 100) }));
}

function last30Days(daysMap = {}) {
  const out = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: Number(daysMap[key]) || 0, dateObj: d });
  }
  return out;
}

function BarList({ title, blurb, entries, emptyLabel = "No data yet" }) {
  const list = withPercentages(sortedEntries(entries)).slice(0, 6);
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-subtle mt-1 mb-5">{blurb}</p>
      {list.length === 0 ? (
        <p className="text-sm text-faint">{emptyLabel}</p>
      ) : (
        <div className="space-y-3">
          {list.map((e) => (
            <div key={e.label}>
              <div className="flex justify-between gap-3 text-sm mb-1">
                <span className="text-ink truncate">{e.label}</span>
                <span className="text-subtle shrink-0">
                  {e.value.toLocaleString()} ({e.pct}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-canvas-alt overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent/70"
                  style={{ width: `${e.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function HeadlineCard(props) {
  const { Icon, value, label } = props;
  return (
    <div className="bg-white border border-hairline rounded-3xl p-6 md:p-7">
      <Icon className="text-accent text-lg" />
      <div className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        {value.toLocaleString()}
      </div>
      <div className="text-sm text-subtle mt-2">{label}</div>
    </div>
  );
}

function PasswordGate({ onSubmit, loading, error }) {
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-sm text-center">
        <FaLock className="mx-auto text-2xl text-accent mb-4" />
        <h1 className="text-xl font-semibold text-ink mb-1">Site Analytics</h1>
        <p className="text-sm text-subtle mb-6">
          Enter the admin password to view visitor stats.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(password);
          }}
          className="space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border border-hairline px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-white py-2.5 font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Checking…" : "View stats"}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadStats(password) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) throw new Error("wrong-password");
      if (!res.ok) throw new Error("server-error");
      const data = await res.json();
      setStats(data);
      sessionStorage.setItem("pf_admin_pw", password);
    } catch (e) {
      setError(
        e.message === "wrong-password"
          ? "That password didn't work."
          : "The stats couldn't load — the Redis database probably isn't connected yet (check Vercel Storage settings)."
      );
      sessionStorage.removeItem("pf_admin_pw");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("pf_admin_pw");
    if (saved) loadStats(saved);
  }, []);

  if (!stats) {
    return <PasswordGate onSubmit={loadStats} loading={loading} error={error} />;
  }

  const days = last30Days(stats.days);
  const busiestDay = days.reduce((max, d) => (d.count > max.count ? d : max), days[0]);
  const busiestLabel =
    busiestDay.count > 0
      ? `Busiest day: ${busiestDay.dateObj.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })} — ${busiestDay.count.toLocaleString()} visits`
      : "No visits recorded yet.";
  const maxDayCount = Math.max(1, ...days.map((d) => d.count));

  const durations = Object.fromEntries(
    Object.entries(DURATION_LABELS).map(([key, label]) => [
      label,
      stats.durations?.[key] || 0,
    ])
  );

  return (
    <div className="min-h-screen px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <div className="mb-12">
        <div className="text-sm font-medium tracking-wide text-accent mb-3">
          ADMIN
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          Your site, in plain numbers
        </h1>
        <p className="text-subtle mt-3">
          A friendly summary of who's been visiting and how.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <HeadlineCard Icon={FaEye} value={stats.total} label="Total visits" />
        <HeadlineCard
          Icon={FaUserPlus}
          value={stats.newVisitors}
          label="First-time visitors"
        />
        <HeadlineCard
          Icon={FaUserCheck}
          value={stats.returningVisitors}
          label="Came back for more"
        />
        <HeadlineCard
          Icon={FaGlobeAmericas}
          value={sortedEntries(stats.countries).length}
          label="Countries reached"
        />
      </div>

      <GlassCard className="mb-6">
        <h3 className="text-lg font-semibold text-ink">
          Visits over the last 30 days
        </h3>
        <p className="text-sm text-subtle mt-1 mb-6">{busiestLabel}</p>
        <div className="flex items-end gap-1 h-32">
          {days.map((d) => (
            <div
              key={d.date}
              title={`${d.date}: ${d.count} visit${d.count === 1 ? "" : "s"}`}
              className="flex-1 bg-accent/70 rounded-t-sm min-h-[2px]"
              style={{ height: `${(d.count / maxDayCount) * 100}%` }}
            />
          ))}
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <BarList
          title="Where people come from"
          blurb="How visitors found your site."
          entries={stats.referrers}
        />
        <BarList
          title="Most visited pages"
          blurb="What people looked at."
          entries={stats.paths}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <BarList title="Countries" blurb="Where in the world." entries={stats.countries} />
        <BarList title="Devices" blurb="Phone, tablet, or computer." entries={stats.devices} />
        <BarList title="Operating system" blurb="What they run." entries={stats.os} />
        <BarList title="Browsers" blurb="What they browsed with." entries={stats.browsers} />
      </div>

      <BarList
        title="How long they stayed"
        blurb="A rough sense of how engaged visitors were."
        entries={durations}
      />
    </div>
  );
}
