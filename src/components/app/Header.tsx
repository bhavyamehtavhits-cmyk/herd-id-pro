import { Link } from "@tanstack/react-router";
import { ScanFace, Bell, Wifi } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/capture", label: "Capture" },
  { to: "/verify", label: "Verify" },
  { to: "/sync", label: "Sync" },
  { to: "/history", label: "History" },
  { to: "/support", label: "Support" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
            <ScanFace className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">BovineID Ops</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">NDDB · NDLM Pilot</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-1.5 text-sm font-medium bg-secondary text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground sm:flex">
            <Wifi className="h-3.5 w-3.5 text-success" />
            <span>Online · Sync OK</span>
          </div>
          <button className="relative rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/30 text-xs font-semibold text-accent-foreground">MC</div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-xs font-semibold text-foreground">Meena Chauhan</div>
              <div className="text-[10px] text-muted-foreground">FLW-2201 · Rajasthan</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}