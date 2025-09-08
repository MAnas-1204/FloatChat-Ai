import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        (e.currentTarget as HTMLDivElement).style.setProperty("--x", `${x}%`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/20 ring-1 ring-brand-aqua-start/20 bg-white/10 p-6 backdrop-blur transition hover:border-brand-cyan/60 hover:ring-brand-aqua-end/30 hover:-translate-y-1 hover:bg-white/15",
        "before:pointer-events-none before:absolute before:-inset-1 before:opacity-0 before:transition before:duration-500 before:[background:radial-gradient(420px_160px_at_var(--x,50%)_-20px,hsl(var(--brand-cyan)/0.22),transparent_70%)] group-hover:before:opacity-100",
        className,
      )}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-aqua-start to-brand-aqua-end text-white drop-shadow-glow">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{description}</p>
    </div>
  );
}
