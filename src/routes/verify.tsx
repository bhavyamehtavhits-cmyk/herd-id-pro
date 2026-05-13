import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Fingerprint, Calendar, MapPin, User, Clock, AlertTriangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "Verification Result · BovineID Ops" }, { name: "description", content: "Verification result screen with confidence score, animal record and audit trail." }] }),
  component: Verify,
});

function Verify() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Result</div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Verification Successful</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> Completed in 4.2 seconds
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-success/40 bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">MATCH</span>
                <span className="text-xs text-muted-foreground">Confidence 98.4% · Threshold 92%</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-foreground">NDLM-RJ-88219</h2>
              <p className="text-sm text-muted-foreground">Gir × HF crossbreed · Female · 4 yrs · Tag #RJ-JP-7714</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                <Field icon={User} label="Owner" value="Ramesh Meena" />
                <Field icon={MapPin} label="Village" value="Bassi, Jaipur" />
                <Field icon={Calendar} label="Enrolled" value="14 Mar 2024" />
                <Field icon={Fingerprint} label="Biometric ID" value="MZ-9F-22-AC1E" />
                <Field icon={ShieldCheck} label="Vaccinations" value="FMD ✓ · LSD ✓" />
                <Field icon={User} label="Verifier" value="Meena Chauhan" />
              </div>

              <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">Match confidence</span>
                  <span className="font-mono text-success">98.4%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full bg-[image:var(--gradient-hero)]" style={{ width: "98.4%" }} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-muted-foreground">
                  <div>Muzzle similarity<br /><span className="text-sm font-semibold text-foreground">98.7%</span></div>
                  <div>Face geometry<br /><span className="text-sm font-semibold text-foreground">96.1%</span></div>
                  <div>Liveness check<br /><span className="text-sm font-semibold text-success">Passed</span></div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-hero)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
                  Confirm &amp; Log <ArrowRight className="h-4 w-4" />
                </button>
                <Link to="/capture" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                  Re-capture
                </Link>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
                  Flag mismatch
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold text-foreground">Audit Trail</h3>
            <ol className="mt-3 space-y-3 text-xs">
              <Trail time="11:42:01" text="Image captured by FLW-2201" />
              <Trail time="11:42:02" text="On-device inference complete" />
              <Trail time="11:42:03" text="Server cross-check (3 candidates)" />
              <Trail time="11:42:05" text="Match confirmed · NDLM-RJ-88219" ok />
            </ol>
          </div>
          <div className="rounded-xl border border-warning/40 bg-warning/10 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertTriangle className="h-4 w-4 text-[oklch(0.55_0.13_75)]" /> Duplicate Watch
            </div>
            <p className="mt-1 text-xs text-foreground/80">
              No duplicates found in 50km radius. Last 30-day collisions: 0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground"><Icon className="h-3 w-3" />{label}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
function Trail({ time, text, ok }: any) {
  return (
    <li className="flex gap-2.5">
      <span className="font-mono text-muted-foreground">{time}</span>
      <span className={ok ? "font-semibold text-success" : "text-foreground"}>{text}</span>
    </li>
  );
}
