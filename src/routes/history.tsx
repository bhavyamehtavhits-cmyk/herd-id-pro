import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Download, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Verification History · BovineID Ops" }, { name: "description", content: "Searchable history of bovine biometric verifications." }] }),
  component: History,
});

function History() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Records</div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Verification History</h1>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search NDLM ID, operator, village…" className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-secondary"><Filter className="h-3.5 w-3.5" /> District: All</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-secondary"><Filter className="h-3.5 w-3.5" /> Status: All</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"><Download className="h-3.5 w-3.5" /> Export CSV</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left">Time</th>
                <th className="px-4 py-2.5 text-left">Animal ID</th>
                <th className="px-4 py-2.5 text-left">Operator</th>
                <th className="px-4 py-2.5 text-left">District</th>
                <th className="px-4 py-2.5 text-left">Confidence</th>
                <th className="px-4 py-2.5 text-left">TAT</th>
                <th className="px-4 py-2.5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-4 py-2.5 text-muted-foreground">{r.time}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground">{r.id}</td>
                  <td className="px-4 py-2.5">{r.op}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.dist}</td>
                  <td className="px-4 py-2.5"><Confidence v={r.conf} /></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.tat}s</td>
                  <td className="px-4 py-2.5"><Status s={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border p-4 text-xs text-muted-foreground">
          <span>Showing 1–8 of 2,418 records · Today</span>
          <div className="flex gap-1">
            <button className="rounded-md border border-border px-2.5 py-1 hover:bg-secondary">Prev</button>
            <button className="rounded-md bg-primary px-2.5 py-1 text-primary-foreground">1</button>
            <button className="rounded-md border border-border px-2.5 py-1 hover:bg-secondary">2</button>
            <button className="rounded-md border border-border px-2.5 py-1 hover:bg-secondary">3</button>
            <button className="rounded-md border border-border px-2.5 py-1 hover:bg-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Confidence({ v }: { v: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full ${v >= 92 ? "bg-success" : v >= 75 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${v}%` }} />
      </div>
      <span className="font-mono text-xs">{v}%</span>
    </div>
  );
}
function Status({ s }: { s: string }) {
  if (s === "Match") return <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success"><CheckCircle2 className="h-3 w-3" />Match</span>;
  if (s === "Review") return <span className="inline-flex items-center gap-1 rounded-full bg-warning/25 px-2 py-0.5 text-xs font-medium text-[oklch(0.45_0.13_75)]"><AlertTriangle className="h-3 w-3" />Review</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive"><XCircle className="h-3 w-3" />Mismatch</span>;
}
const rows = [
  { time: "11:42", id: "NDLM-RJ-88219", op: "Meena Chauhan", dist: "Jaipur", conf: 98, tat: 4.2, status: "Match" },
  { time: "11:38", id: "NDLM-RJ-88218", op: "Meena Chauhan", dist: "Jaipur", conf: 95, tat: 3.9, status: "Match" },
  { time: "11:31", id: "NDLM-RJ-88217", op: "Arun Singh", dist: "Sikar", conf: 88, tat: 5.1, status: "Review" },
  { time: "11:24", id: "NDLM-RJ-88216", op: "Sunita Devi", dist: "Ajmer", conf: 97, tat: 3.7, status: "Match" },
  { time: "11:11", id: "NDLM-RJ-88142", op: "Ravi Yadav", dist: "Tonk", conf: 71, tat: 6.8, status: "Mismatch" },
  { time: "10:58", id: "NDLM-RJ-88141", op: "Kamla Bai", dist: "Alwar", conf: 96, tat: 4.0, status: "Match" },
  { time: "10:46", id: "NDLM-RJ-88140", op: "Meena Chauhan", dist: "Jaipur", conf: 99, tat: 3.5, status: "Match" },
  { time: "10:32", id: "NDLM-RJ-88139", op: "Arun Singh", dist: "Sikar", conf: 84, tat: 5.6, status: "Review" },
];
