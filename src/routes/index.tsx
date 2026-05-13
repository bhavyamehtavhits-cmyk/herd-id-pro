import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, CheckCircle2, Clock, Cpu, Database, FileSearch,
  Fingerprint, RefreshCw, ScanFace, ShieldCheck, Smartphone, Users, Wifi, WifiOff,
  ArrowUpRight, Camera, GraduationCap, LifeBuoy, PlayCircle, BookOpen, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard · BovineID Ops" },
      { name: "description", content: "Live operational dashboard for bovine biometric verification — pending verifications, FLW activity, AI confidence and device sync." },
    ],
  }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, delta, tone = "primary" }: any) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-[oklch(0.45_0.13_75)]",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className="flex items-center gap-0.5 text-xs font-medium text-success">
            <ArrowUpRight className="h-3 w-3" /> {delta}
          </span>
        )}
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, sub, to, accent }: any) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function Dashboard() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> NDLM Pilot · Phase II live in 6 districts
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Bovine Biometric Verification Operations
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
                AI-assisted muzzle &amp; face recognition for cattle and buffalo, built for field workers, slow networks and rural deployment under the National Digital Livestock Mission.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/capture" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-elegant)] hover:bg-white/95">
                  <Camera className="h-4 w-4" /> Start Capture
                </Link>
                <Link to="/verify" className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/15">
                  <Fingerprint className="h-4 w-4" /> Verify Animal
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
                <div className="text-[10px] uppercase tracking-wider text-white/70">Operator</div>
                <div className="mt-0.5 font-semibold">Meena Chauhan</div>
                <div className="text-white/70">FLW-2201 · Jaipur Cluster</div>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
                <div className="text-[10px] uppercase tracking-wider text-white/70">Avg Verification TAT</div>
                <div className="mt-0.5 font-semibold">4.2 sec</div>
                <div className="text-white/70">↓ 0.6s vs last week</div>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
                <div className="text-[10px] uppercase tracking-wider text-white/70">Last Animal</div>
                <div className="mt-0.5 font-semibold">NDLM-RJ-88219</div>
                <div className="text-white/70">Match · 98.4%</div>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur">
                <div className="text-[10px] uppercase tracking-wider text-white/70">Model</div>
                <div className="mt-0.5 font-semibold">MuzzleNet v3.2</div>
                <div className="text-white/70">On-device · Quantised</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        {/* Operational Dashboard */}
        <section>
          <SectionHeader title="Operational Dashboard" subtitle="Live state across the pilot. Updated every 30 seconds." />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat icon={Clock} label="Pending Verifications" value="142" delta="12%" tone="warning" />
            <Stat icon={CheckCircle2} label="Verified Today" value="2,418" delta="8.4%" tone="success" />
            <Stat icon={WifiOff} label="Offline Devices" value="7" tone="destructive" />
            <Stat icon={Users} label="Active FLWs" value="318" delta="5" tone="primary" />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <SectionHeader title="Quick Actions" subtitle="One-tap entry points for field workflows." />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction icon={ScanFace} title="Capture Animal Face" sub="AI-guided framing" to="/capture" accent="bg-primary/10 text-primary" />
            <QuickAction icon={Fingerprint} title="Capture Muzzle Image" sub="Unique biometric ID" to="/capture" accent="bg-accent/25 text-accent-foreground" />
            <QuickAction icon={ShieldCheck} title="Verify Animal" sub="Match against registry" to="/verify" accent="bg-success/15 text-success" />
            <QuickAction icon={RefreshCw} title="Sync Offline Data" sub="32 records pending" to="/sync" accent="bg-warning/25 text-[oklch(0.45_0.13_75)]" />
          </div>
        </section>

        {/* AI Verification Insights + Pilot Activity */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">AI Verification Insights</h3>
                <p className="text-xs text-muted-foreground">Last 24 hours · MuzzleNet v3.2</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                <Activity className="h-3 w-3" /> Healthy
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Insight label="Match Confidence" value="96.7%" bar={96.7} tone="success" foot="Threshold ≥ 92%" />
              <Insight label="Failed Verifications" value="38" bar={14} tone="destructive" foot="1.6% of total · Investigate 4" />
              <Insight label="Duplicate Detection" value="11" bar={28} tone="warning" foot="Auto-flagged for review" />
            </div>

            <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Confidence distribution (last 500 captures)</span>
                <span className="text-muted-foreground">Avg 96.7%</span>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {[35,42,28,55,68,72,84,92,88,76,60,48,52,66,80,95,110,122,118,104,90,72,58,44,36].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-[image:var(--gradient-hero)] opacity-80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>50%</span><span>70%</span><span>85%</span><span>95%</span><span>100%</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Pilot Activity Feed</h3>
              <Link to="/history" className="text-xs font-medium text-primary hover:underline">View all</Link>
            </div>
            <ol className="mt-4 space-y-3">
              {feed.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${f.tone}`}>
                    <f.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                    <div className="text-sm text-foreground">{f.text}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{f.meta}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Device Sync Status */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">Device Synchronization Status</h3>
              <p className="text-xs text-muted-foreground">325 devices deployed across 6 districts</p>
            </div>
            <Link to="/sync" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
              <Database className="h-3.5 w-3.5" /> Open Sync Console
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left">Device ID</th>
                  <th className="px-4 py-2.5 text-left">Operator</th>
                  <th className="px-4 py-2.5 text-left">District</th>
                  <th className="px-4 py-2.5 text-left">Pending</th>
                  <th className="px-4 py-2.5 text-left">Last Sync</th>
                  <th className="px-4 py-2.5 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id} className="border-t border-border">
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground">{d.id}</td>
                    <td className="px-4 py-2.5 text-foreground">{d.op}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.district}</td>
                    <td className="px-4 py-2.5 text-foreground">{d.pending}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{d.last}</td>
                    <td className="px-4 py-2.5"><StatusPill status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Support */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SupportCard icon={PlayCircle} title="Field Training Videos" body="12 short modules in Hindi & English on capture, sync and verification." cta="Watch now" />
          <SupportCard icon={BookOpen} title="Operator Handbook" body="SOPs for muzzle capture, lighting, animal restraint and edge cases." cta="Open PDF" />
          <SupportCard icon={LifeBuoy} title="Helpline & Tickets" body="24×7 support · 1800-180-1551 · or raise a ticket from any device." cta="Contact support" />
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function Insight({ label, value, bar, tone, foot }: any) {
  const colors: Record<string, string> = {
    success: "bg-success",
    destructive: "bg-destructive",
    warning: "bg-warning",
  };
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${colors[tone]}`} style={{ width: `${bar}%` }} />
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">{foot}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Online: "bg-success/15 text-success",
    Offline: "bg-destructive/10 text-destructive",
    Syncing: "bg-primary/10 text-primary",
    Idle: "bg-warning/20 text-[oklch(0.45_0.13_75)]",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${map[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {status}
  </span>;
}

function SupportCard({ icon: Icon, title, body, cta }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="mt-3 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      <button className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
        {cta} <ArrowUpRight className="h-3 w-3" />
      </button>
    </div>
  );
}

const feed = [
  { icon: CheckCircle2, tone: "bg-success/15 text-success", text: "NDLM-RJ-88219 verified by FLW-2201 · 98.4% match", meta: "Meena Chauhan · 2 min ago · Bassi village" },
  { icon: AlertTriangle, tone: "bg-destructive/10 text-destructive", text: "Duplicate flagged on NDLM-RJ-88142", meta: "Auto-detected · pending supervisor review" },
  { icon: Cpu, tone: "bg-primary/10 text-primary", text: "MuzzleNet v3.2 deployed to 318 devices", meta: "Rollout 100% · 14 min ago" },
  { icon: WifiOff, tone: "bg-warning/20 text-[oklch(0.45_0.13_75)]", text: "FLW-2189 offline for 2h 14m", meta: "Last seen · Tonk district" },
  { icon: ScanFace, tone: "bg-accent/25 text-accent-foreground", text: "12 new animals enrolled at Manoharpur center", meta: "Batch sync complete · 21 min ago" },
];

const devices = [
  { id: "FLW-2201", op: "Meena Chauhan", district: "Jaipur", pending: 0, last: "30 sec ago", status: "Online" },
  { id: "FLW-2189", op: "Ravi Yadav", district: "Tonk", pending: 32, last: "2h 14m ago", status: "Offline" },
  { id: "FLW-2156", op: "Sunita Devi", district: "Ajmer", pending: 8, last: "Syncing…", status: "Syncing" },
  { id: "FLW-2098", op: "Arun Singh", district: "Sikar", pending: 3, last: "12 min ago", status: "Online" },
  { id: "FLW-2044", op: "Kamla Bai", district: "Alwar", pending: 0, last: "5 min ago", status: "Idle" },
];
