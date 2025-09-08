import { Github, Linkedin } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function BrandFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[radial-gradient(800px_200px_at_50%_-40px,hsl(var(--brand-aqua-start)/0.15),transparent_70%)]">
      <div className="container grid gap-6 py-10 md:grid-cols-3 md:gap-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold"><span>🌊</span>FloatChat AI</div>
          <p className="mt-3 text-sm text-foreground/70 max-w-sm">Ask the Ocean Anything – explore global ARGO float data with AI chat, interactive maps, and storytelling insights.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-foreground/70 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-foreground/60">© {new Date().getFullYear()} FloatChat AI. All rights reserved.</div>
    </footer>
  );
}
