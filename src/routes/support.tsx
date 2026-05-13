import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, PlayCircle, BookOpen, Phone, Mail, MessageSquare, GraduationCap, Languages } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support & Training · BovineID Ops" }, { name: "description", content: "Help, training and helpline resources for FLWs and supervisors." }] }),
  component: Support,
});

function Support() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Help Center</div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Support &amp; Training</h1>
        <p className="mt-1 text-sm text-muted-foreground">Built for field workers — Hindi, English and 6 regional languages.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card icon={PlayCircle} title="Training Videos" body="12 modules · 3–5 min each · Captions in 6 languages." action="Open library" />
        <Card icon={BookOpen} title="Operator Handbook" body="Step-by-step SOPs for capture, verification, troubleshooting." action="Read PDF" />
        <Card icon={GraduationCap} title="Certification" body="Online assessment for FLWs and supervisors." action="Start course" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="text-base font-semibold text-foreground">Frequently Asked</h3>
          <div className="mt-4 divide-y divide-border">
            {faqs.map((f, i) => (
              <details key={i} className="group py-3" open={i === 0}>
                <summary className="cursor-pointer text-sm font-medium text-foreground marker:hidden">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold text-foreground">Helpline</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 1800-180-1551 (toll free)</li>
              <li className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> WhatsApp · +91 90000 11551</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@ndlm.gov.in</li>
              <li className="flex items-center gap-2"><Languages className="h-4 w-4 text-primary" /> HI · EN · MR · GU · TA · TE</li>
            </ul>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[image:var(--gradient-hero)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
              <LifeBuoy className="h-4 w-4" /> Raise Ticket
            </button>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-5 text-xs text-muted-foreground">
            Average response time: <span className="font-semibold text-foreground">8 minutes</span>. Tickets resolved in <span className="font-semibold text-foreground">98.4%</span> of cases within SLA.
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, body, action }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <h4 className="mt-3 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      <button className="mt-4 text-xs font-semibold text-primary hover:underline">{action} →</button>
    </div>
  );
}
const faqs = [
  { q: "How do I capture a clear muzzle image in low light?", a: "Use the device torch (auto-suggested by the app at <300 lux). Hold the device 25–30 cm away. Wait for the green reticle and the 'Hold still' chip before tapping capture." },
  { q: "What if the animal is moving?", a: "The AI guidance will show 'motion blur' in amber. Calm the animal, brace the device against your forearm, and capture during a still moment. Three frames are taken automatically — best is selected." },
  { q: "How does offline sync work?", a: "All captures are stored encrypted on-device. When connectivity returns, the app syncs in chunks, prioritising verifications over enrolment images. Sync resumes automatically if interrupted." },
  { q: "How are duplicates detected?", a: "Each muzzle generates a 512-d embedding compared against the cluster registry. Matches above 92% in a 50 km radius are flagged for supervisor review." },
];
