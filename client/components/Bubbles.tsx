export default function Bubbles({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={style}>
      <div className="absolute -left-10 top-20 h-24 w-24 rounded-full bg-brand-aqua-start/20 blur-xl animate-float" />
      <div className="absolute left-1/3 top-10 h-16 w-16 rounded-full bg-brand-cyan/20 blur-lg animate-float" style={{ animationDelay: '0.6s' }} />
      <div className="absolute right-10 top-28 h-28 w-28 rounded-full bg-brand-aqua-end/20 blur-xl animate-float" style={{ animationDelay: '1.2s' }} />
      <div className="absolute left-12 bottom-24 h-20 w-20 rounded-full bg-brand-cyan/20 blur-xl animate-float" style={{ animationDelay: '1.8s' }} />
      <div className="absolute right-1/4 bottom-12 h-16 w-16 rounded-full bg-brand-aqua-start/20 blur-md animate-float" style={{ animationDelay: '2.4s' }} />
    </div>
  );
}
