import { cn } from "@/lib/utils";

export default function FloatChatAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-brand-aqua-start to-brand-aqua-end text-white shadow-lg ring-2 ring-white/60 dark:ring-white/20 drop-shadow-glow",
        className ?? "h-8 w-8",
      )}
      aria-label="FloatChat AI avatar"
    >
      <svg viewBox="0 0 64 64" className="h-2/3 w-2/3">
        <defs>
          <linearGradient id="fishFin" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <g transform="translate(6,16)">
          <ellipse cx="22" cy="16" rx="14" ry="10" fill="#fff" opacity="0.95" />
          <polygon points="36,16 48,8 48,24" fill="url(#fishFin)" />
          <circle cx="16" cy="14" r="2" fill="hsl(var(--brand-ocean))" />
        </g>
      </svg>
      <span className="absolute -top-0.5 -left-0.5 h-2 w-2 rounded-full bg-white/80 animate-ping-slow" />
      <span className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-white/70 animate-ping-slow [animation-delay:200ms]" />
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--brand-cyan))] ring-1 ring-white/80" />
    </div>
  );
}
