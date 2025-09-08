import { useState } from "react";
import Bubbles from "@/components/Bubbles";
import FeatureCard from "@/components/FeatureCard";
import { Bot, BarChart3, Waves, Globe2, MessageSquare, Share2, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Index() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-ocean-gradient" />
        <div className="absolute inset-0 bg-ocean-radial" />
        <Bubbles />
        <div className="relative container grid gap-10 py-24 md:grid-cols-2 md:py-32">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Waves className="h-4 w-4" /> Futuristic Ocean AI
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              FloatChat AI
            </h1>
            <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
              Ask the Ocean Anything – Explore ARGO Data with AI. Chat, visualize, and discover insights from millions of global ocean float observations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#demo" className="group relative inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end blur-md opacity-80 group-hover:opacity-100 transition" />
                <span className="relative z-10 inline-flex items-center gap-2"><Play className="h-4 w-4"/> Try the Demo</span>
              </a>
              <a href="#features" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white hover:border-white/60 transition">Explore Features</a>
            </div>
          </div>

          {/* Demo mockup */}
          <div className="relative">
            <div className="relative rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="rounded-xl bg-white/90 p-4 shadow-2xl">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-xs font-semibold text-slate-700">Chat</div>
                    <div className="mt-2 space-y-2 text-xs">
                      <div className="rounded-md bg-slate-100 px-3 py-2">How is temperature changing at 1000m in the North Atlantic?</div>
                      <div className="ml-auto w-5/6 rounded-md bg-gradient-to-r from-brand-aqua-start/20 to-brand-aqua-end/20 px-3 py-2 text-slate-700">Median trend is +0.08°C/decade since 2010. Visualizing profiles…</div>
                      <div className="rounded-md bg-slate-100 px-3 py-2">Show map of float density and a time series.</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <div className="text-xs font-semibold text-slate-700">Visualization</div>
                    <div className="mt-2 grid gap-3">
                      <div className="h-28 rounded-md bg-gradient-to-tr from-brand-aqua-start/25 to-brand-aqua-end/25 ring-1 ring-brand-aqua-start/30" />
                      <div className="h-28 rounded-md bg-[conic-gradient(from_180deg_at_50%_50%,#0a2540_0deg,#00c9ff_120deg,#1e90ff_240deg,#0a2540_360deg)] opacity-90" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[24px] opacity-70 blur-2xl [background:linear-gradient(135deg,hsl(var(--brand-aqua-start)),hsl(var(--brand-aqua-end)))]" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why FloatChat?</h2>
            <p className="mt-4 text-foreground/70">
              ARGO floats generate massive ocean data. It’s complex and hidden. FloatChat makes it simple: chat, explore, and visualize.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-brand-aqua-start/10 to-brand-aqua-end/10 p-6 ring-1 ring-brand-aqua-start/20">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/80"><Bot className="h-5 w-5 text-brand-aqua-start"/></div>
              <h3 className="mt-4 font-semibold">AI</h3>
              <p className="text-sm text-foreground/70">Ask natural questions. Get synthesized answers with maps and charts.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-aqua-start/10 to-brand-aqua-end/10 p-6 ring-1 ring-brand-aqua-start/20">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/80"><BarChart3 className="h-5 w-5 text-brand-aqua-start"/></div>
              <h3 className="mt-4 font-semibold">Visualization</h3>
              <p className="text-sm text-foreground/70">Interactive maps, time series, and profile plots generated on demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative bg-[radial-gradient(1000px_300px_at_50%_-60px,hsl(var(--brand-aqua-start)/0.15),transparent_70%)] py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight">Capabilities</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<MessageSquare />} title="AI Chat" description="Ask natural questions about the ocean and float data." />
            <FeatureCard icon={<BarChart3 />} title="Data Visualization" description="Interactive maps & charts for fast insights." />
            <FeatureCard icon={<Globe2 />} title="Real Ocean Data" description="Powered by ARGO and ERDDAP datasets." />
            <FeatureCard icon={<Bot />} title="Storytelling" description="AI generates explanations and narratives." />
            <FeatureCard icon={<Share2 />} title="Exportable Results" description="Share insights as slides or links." />
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="relative py-20">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">See FloatChat in Action</h2>
            <p className="mt-3 text-foreground/70">Explore a live preview of the chat + visualization experience. Ask questions, render maps and charts, and share results in seconds.</p>
            <a href="#demo" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-3 text-sm font-semibold text-white drop-shadow-glow">Launch FloatChat Demo</a>
          </div>
          <div className="relative rounded-2xl border border-border p-4">
            <div className="rounded-xl bg-gradient-to-tr from-brand-aqua-start/10 to-brand-aqua-end/10 p-4 ring-1 ring-brand-aqua-start/20">
              <div className="aspect-[16/10] rounded-md bg-white/80">
                <div className="h-full w-full rounded-md bg-[linear-gradient(120deg,hsl(var(--brand-aqua-start)/.15),transparent_40%),radial-gradient(600px_200px_at_60%_-80px,hsl(var(--brand-cyan)/.25),transparent_70%)]" />
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-60 blur-2xl [background:linear-gradient(135deg,hsl(var(--brand-aqua-start)),hsl(var(--brand-aqua-end)))]" />
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="relative py-20">
        <div className="container grid items-center gap-8 rounded-3xl border border-border bg-gradient-to-tr from-brand-aqua-start/10 to-brand-aqua-end/10 p-8 ring-1 ring-brand-aqua-start/20 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight">Ready to Talk to the Ocean?</h3>
            <p className="mt-2 text-foreground/70">Get early access to the FloatChat demo and updates.</p>
            <form
              className="mt-6 flex max-w-md items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Thanks! We'll keep you posted.");
                setEmail("");
              }}
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-brand-aqua-start/30 bg-white/80 px-4 py-3 text-sm outline-none ring-0 placeholder:text-foreground/50 focus:border-brand-aqua-end/60"
              />
              <button
                type="submit"
                className="relative inline-flex items-center rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-3 text-sm font-semibold text-white drop-shadow-glow"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="h-full w-full rounded-2xl bg-[radial-gradient(300px_120px_at_50%_-30px,hsl(var(--brand-cyan)/.25),transparent_70%)]" />
        </div>
      </section>
    </div>
  );
}
