import { useState } from "react";
import { Type, Languages, Eye, HelpCircle } from "lucide-react";

export function AccessibilityBar() {
  const [size, setSize] = useState(100);
  const [lang, setLang] = useState<"EN" | "हिं">("EN");
  const [contrast, setContrast] = useState(false);

  const apply = (n: number) => {
    setSize(n);
    document.documentElement.style.fontSize = `${n}%`;
  };

  const toggleContrast = () => {
    setContrast(!contrast);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="w-full bg-primary text-primary-foreground text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
        <span className="font-medium tracking-wide">
          NDDB · National Digital Livestock Mission
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Type className="h-3.5 w-3.5" />
            <button onClick={() => apply(90)} className="rounded px-1.5 hover:bg-white/15">A-</button>
            <button onClick={() => apply(100)} className="rounded px-1.5 hover:bg-white/15">A</button>
            <button onClick={() => apply(115)} className="rounded px-1.5 hover:bg-white/15">A+</button>
            <span className="ml-1 opacity-70">{size}%</span>
          </div>
          <button
            onClick={() => setLang(lang === "EN" ? "हिं" : "EN")}
            className="flex items-center gap-1 rounded px-1.5 hover:bg-white/15"
          >
            <Languages className="h-3.5 w-3.5" /> {lang === "EN" ? "English" : "हिंदी"}
          </button>
          <button
            onClick={toggleContrast}
            className="flex items-center gap-1 rounded px-1.5 hover:bg-white/15"
            aria-pressed={contrast}
          >
            <Eye className="h-3.5 w-3.5" /> {contrast ? "Standard" : "High Contrast"}
          </button>
          <a href="/support" className="flex items-center gap-1 rounded px-1.5 hover:bg-white/15">
            <HelpCircle className="h-3.5 w-3.5" /> Help
          </a>
        </div>
      </div>
    </div>
  );
}