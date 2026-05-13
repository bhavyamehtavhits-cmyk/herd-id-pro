import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Sparkles, CheckCircle2, AlertTriangle, Sun, Focus, Eye, RotateCcw, Upload, Smartphone, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/capture")({
  head: () => ({ meta: [{ title: "Mobile Capture · BovineID Ops" }, { name: "description", content: "AI-guided mobile capture screen for bovine muzzle and face biometrics." }] }),
  component: CapturePage,
});

function CapturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Field Operation</div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Mobile Capture · AI-Assisted</h1>
        <p className="mt-1 text-sm text-muted-foreground">Hold the device steady. Live AI guidance will frame the muzzle automatically.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Phone mockup */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mx-auto max-w-sm">
              <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-foreground shadow-[var(--shadow-elegant)]">
                {/* Camera viewport */}
                <div className="relative aspect-[9/16] bg-gradient-to-b from-[oklch(0.25_0.04_180)] via-[oklch(0.32_0.05_175)] to-[oklch(0.18_0.03_200)]">
                  {/* Top bar */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-black/30 px-3 py-2 text-[10px] text-white">
                    <span>FLW-2201</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" /> REC · 00:03</span>
                    <span>4G · 78%</span>
                  </div>
                  {/* Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-56 w-56 rounded-full border-2 border-success/80 shadow-[0_0_40px_oklch(0.6_0.16_150_/_0.5)]">
                      <div className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-white" />
                      <div className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-white" />
                      <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-white" />
                      <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-white" />
                      {/* simulated muzzle silhouette */}
                      <div className="absolute inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.45_0.05_30)_0%,oklch(0.25_0.04_30)_70%)] opacity-90" />
                      <div className="absolute left-1/2 top-1/2 h-3 w-10 -translate-x-1/2 -translate-y-2 rounded-full bg-black/70" />
                      <div className="absolute left-1/2 top-1/2 h-3 w-10 -translate-x-1/2 translate-y-2 rounded-full bg-black/70" />
                    </div>
                  </div>
                  {/* AI guidance bubble */}
                  <div className="absolute left-3 right-3 top-12 rounded-lg border border-success/40 bg-success/15 px-3 py-2 text-xs text-white backdrop-blur">
                    <div className="flex items-center gap-1.5 font-semibold"><Sparkles className="h-3.5 w-3.5" /> Muzzle aligned · Hold still</div>
                    <div className="text-[10px] opacity-80">Confidence rising · 92% → ready in 1.2s</div>
                  </div>
                  {/* Bottom controls */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-5 pt-10">
                    <div className="mb-3 grid grid-cols-3 gap-1.5 text-[10px] text-white/90">
                      <Chip ok>Lighting OK</Chip>
                      <Chip ok>Distance 28cm</Chip>
                      <Chip warn>Hold steady</Chip>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"><RotateCcw className="h-4 w-4" /></button>
                      <button className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/95 text-primary"><Camera className="h-6 w-6" /></button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"><Upload className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Animal: <span className="font-mono text-foreground">NDLM-RJ-88219</span> · Operator <span className="font-semibold text-foreground">Meena Chauhan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold text-foreground">Live AI Guidance</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <Guide icon={Focus} ok>Muzzle centred in frame</Guide>
              <Guide icon={Sun} ok>Lighting sufficient (520 lux)</Guide>
              <Guide icon={Eye} ok>Both nostrils visible</Guide>
              <Guide icon={AlertTriangle} warn>Slight motion blur — hold 0.5s</Guide>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold text-foreground">Capture Mode</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ModeBtn icon={Fingerprint} label="Muzzle" active />
              <ModeBtn icon={Smartphone} label="Face" />
            </div>
            <div className="mt-4 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
              On-device inference · MuzzleNet v3.2 · No image leaves device until sync.
            </div>
          </div>
          <Link to="/verify" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-hero)] px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
            <CheckCircle2 className="h-4 w-4" /> Capture &amp; Verify
          </Link>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, ok, warn }: any) {
  const c = ok ? "bg-success/30 text-white" : warn ? "bg-warning/30 text-white" : "bg-white/15 text-white";
  return <div className={`rounded-md px-2 py-1 text-center ${c}`}>{children}</div>;
}
function Guide({ icon: Icon, children, ok, warn }: any) {
  const c = ok ? "text-success" : warn ? "text-[oklch(0.55_0.13_75)]" : "text-muted-foreground";
  return <li className="flex items-start gap-2"><Icon className={`mt-0.5 h-4 w-4 ${c}`} /><span className="text-foreground">{children}</span></li>;
}
function ModeBtn({ icon: Icon, label, active }: any) {
  return (
    <button className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs ${active ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border bg-background text-muted-foreground hover:bg-secondary"}`}>
      <Icon className="h-5 w-5" /> {label}
    </button>
  );
}
