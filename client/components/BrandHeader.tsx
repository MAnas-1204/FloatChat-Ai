import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Info, Sparkles, Map, Mail } from "lucide-react";

const NAV = [
  { label: "About", href: "#about", icon: Info },
  { label: "Features", href: "#features", icon: Sparkles },
  { label: "Demo", href: "#demo", icon: Map },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function BrandHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "features", "demo", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { threshold: [0.25, 0.6], rootMargin: "-20% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--brand-ocean))]/80 text-white shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#home" className="group inline-flex items-center gap-2">
          <span className="text-2xl" aria-hidden>🌊</span>
          <span className="text-lg font-semibold tracking-tight">FloatChat <span className="text-brand-cyan">AI</span></span>
        </a>

        <div className="hidden md:block">
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur",
              scrolled
                ? "border border-white/15 bg-white/10 ring-1 ring-white/20"
                : "border border-foreground/10 bg-white/60 ring-1 ring-brand-aqua-start/20",
            )}
          >
            {NAV.map((item) => {
              const Icon = item.icon as any;
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition",
                    scrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20"
                      : "text-foreground/70 hover:text-foreground hover:bg-white border-transparent hover:border-foreground/10",
                    isActive &&
                      (scrolled
                        ? "bg-white/15 text-white ring-1 ring-brand-cyan/40"
                        : "bg-white text-foreground ring-1 ring-brand-aqua-start/30"),
                  )}
                >
                  <Icon className={cn("h-4 w-4", scrolled ? "text-brand-cyan" : "text-brand-aqua-start")} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="group relative inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 animate-pulse-glow"
          >
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end blur-md opacity-70 group-hover:opacity-90 transition" />
            <span className="relative z-10">Try the Demo</span>
          </a>
        </div>
      </div>
    </header>
  );
}
