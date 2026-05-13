export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
        <div>
          © {new Date().getFullYear()} National Dairy Development Board · NDLM Pilot Operations
        </div>
        <div className="flex gap-4">
          <span>v2.4.1 · Build 88219</span>
          <span>SLA: 99.7% · TAT 4.2s</span>
          <span>WCAG 2.1 AA</span>
        </div>
      </div>
    </footer>
  );
}