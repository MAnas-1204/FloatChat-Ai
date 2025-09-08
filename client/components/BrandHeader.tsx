import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function BrandHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#home" className="group inline-flex items-center gap-2">
          <span className="text-2xl" aria-hidden>🌊</span>
          <span className="text-lg font-semibold tracking-tight">FloatChat <span className="text-brand-cyan">AI</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="group relative inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
          >
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end blur-md opacity-70 group-hover:opacity-90 transition" />
            <span className="relative z-10">Try the Demo</span>
          </a>
        </div>
      </div>
    </header>
  );
}
