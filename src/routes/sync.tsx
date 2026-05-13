import { createFileRoute } from "@tanstack/react-router";
import { Database, RefreshCw, Wifi, WifiOff, CheckCircle2, AlertTriangle, Cloud, HardDrive } from "lucide-react";

export const Route = createFileRoute("/sync")({
  head: () => ({ meta: [{ title: "Device Sync · BovineID Ops" }, { name: "description", content: "Device synchronization dashboard for offline-first field operations." }] }),
  component: Sync,
});

function Sync() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Operations</div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Device Sync Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resilient sync built for low-bandwidth rural deployments.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-hero)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
          <RefreshCw className="h-4 w-4" /> Force Sync All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Tile icon={Wifi} label="Online Devices" value="318" tone="success" />
        <Tile icon={WifiOff} label="Offline" value="7" tone="destructive" />
        <Tile icon={Cloud} label="Records Synced (24h)" value="12,418" tone="primary" />
        <Tile icon={HardDrive} label="Pending Upload" value="86" tone="warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="text-base font-semibold text-foreground">Cluster Sync Health</h3>
          <p className="text-xs text-muted-foreground">By district · last 6 hours</p>
          <div className="mt-5 space-y-4">
            {clusters.map((c) => (
              <div key={c.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.synced} / {c.total} synced</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-[image:var(--gradient-hero)]" style={{ width: `${(c.synced / c.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold text-foreground">Sync Conflicts</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <Conflict ok title="NDLM-RJ-88219 merged" sub="Resolved automatically" />
            <Conflict title="NDLM-RJ-88142 duplicate" sub="Awaiting supervisor decision" />
            <Conflict title="Image hash mismatch · FLW-2189" sub="Re-upload queued for next sync" />
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="mb-4 text-base font-semibold text-foreground">Per-Device Queue</h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2.5 text-left">Device</th><th className="px-4 py-2.5 text-left">Operator</th><th className="px-4 py-2.5 text-left">Pending</th><th className="px-4 py-2.5 text-left">Bandwidth</th><th className="px-4 py-2.5 text-left">ETA</th><th className="px-4 py-2.5 text-left">Actions</th></tr>
            </thead>
            <tbody>
              {[
                ["FLW-2189", "Ravi Yadav", 32, "2G · 48 kbps", "~ 18 min"],
                ["FLW-2156", "Sunita Devi", 8, "4G · 1.2 Mbps", "30 sec"],
                ["FLW-2098", "Arun Singh", 3, "4G · 0.8 Mbps", "12 sec"],
                ["FLW-2201", "Meena Chauhan", 0, "Wi-Fi", "—"],
              ].map(([id, op, p, bw, eta]) => (
                <tr key={id as string} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">{id}</td>
                  <td className="px-4 py-2.5">{op}</td>
                  <td className="px-4 py-2.5 font-semibold text-foreground">{p}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{bw}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{eta}</td>
                  <td className="px-4 py-2.5"><button className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-secondary">Push</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label, value, tone }: any) {
  const tones: Record<string, string> = { success: "bg-success/15 text-success", destructive: "bg-destructive/10 text-destructive", primary: "bg-primary/10 text-primary", warning: "bg-warning/25 text-[oklch(0.45_0.13_75)]" };
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
      <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
function Conflict({ title, sub, ok }: any) {
  const Icon = ok ? CheckCircle2 : AlertTriangle;
  return (
    <li className="flex gap-2.5">
      <Icon className={`mt-0.5 h-4 w-4 ${ok ? "text-success" : "text-[oklch(0.55_0.13_75)]"}`} />
      <div><div className="text-foreground">{title}</div><div className="text-xs text-muted-foreground">{sub}</div></div>
    </li>
  );
}
const clusters = [
  { name: "Jaipur", synced: 78, total: 82 }, { name: "Tonk", synced: 41, total: 56 },
  { name: "Ajmer", synced: 60, total: 64 }, { name: "Sikar", synced: 48, total: 52 },
  { name: "Alwar", synced: 39, total: 41 }, { name: "Nagaur", synced: 28, total: 30 },
];
