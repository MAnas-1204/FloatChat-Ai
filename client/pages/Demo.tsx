import { useEffect, useMemo, useRef, useState } from "react";
import BrandHeader from "@/components/BrandHeader";
import BrandFooter from "@/components/BrandFooter";
import Bubbles from "@/components/Bubbles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Mic, MessageSquare, Map, LineChart, Waves } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-.1s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground"></span>
    </span>
  );
}

type Msg = { id: string; role: "user" | "ai"; content: string; kind?: "text" | "chart" | "map" | "profiles" };

const demoChart = Array.from({ length: 16 }).map((_, i) => ({
  t: i,
  temp: 12 + Math.sin(i / 3) * 2 + (i / 20),
}));

export default function DemoPage() {
  const [tab, setTab] = useState("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", role: "ai", content: "Hi! Ask me anything about ARGO floats, temperature or salinity trends.", kind: "text" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: input.trim(), kind: "text" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);
    // Simulate AI response with variety
    setTimeout(() => {
      const variants: Msg[] = [
        { id: crypto.randomUUID(), role: "ai", content: "Here is a quick temperature trend preview.", kind: "chart" },
        { id: crypto.randomUUID(), role: "ai", content: "Plotting float density map in the North Atlantic.", kind: "map" },
        { id: crypto.randomUUID(), role: "ai", content: "Profiles from ARGO float 6903017 show stable salinity at 1000m.", kind: "profiles" },
        { id: crypto.randomUUID(), role: "ai", content: "Median trend since 2010 is +0.08°C/decade around 45°N, 30°W.", kind: "text" },
      ];
      const pick = variants[Math.floor(Math.random() * variants.length)];
      setMessages((m) => [...m, pick]);
      setIsTyping(false);
      if (pick.kind && pick.kind !== "text") setTab(pick.kind === "chart" ? "chart" : pick.kind);
    }, 1100);
  };

  const IntroHeader = useMemo(
    () => (
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ocean))] dark:text-white">
          FloatChat AI — Ocean Insights in Real Time
        </h1>
        <p className="mt-2 text-sm text-foreground/70 max-w-2xl mx-auto">
          Ask about ocean data and instantly visualize maps, charts, and profiles.
        </p>
      </div>
    ),
    [],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(135deg,hsl(var(--brand-ocean)),hsl(var(--brand-aqua-start))_60%,hsl(var(--brand-aqua-end)))]">
      <div className="relative">
        <Bubbles className="pointer-events-none absolute inset-0 opacity-30" />
      </div>

      <main className="flex-1 pt-20">
        <div className="container py-8">
          {/* Chat/Demo Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/20 ring-1 ring-brand-aqua-start/20 bg-white/90 dark:bg-white/5 backdrop-blur shadow-xl">
            <div className="absolute -inset-1 -z-10 opacity-50 blur-2xl [background:radial-gradient(800px_300px_at_50%_-80px,hsl(var(--brand-aqua-start)/.25),transparent_70%)]" />

            <div className="px-6 py-6">{IntroHeader}</div>

            <div className="px-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="bg-white/70 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-xl">
                  <TabsTrigger value="chat" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><MessageSquare className="h-4 w-4"/> Chat</TabsTrigger>
                  <TabsTrigger value="map" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><Map className="h-4 w-4"/> Map</TabsTrigger>
                  <TabsTrigger value="chart" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><LineChart className="h-4 w-4"/> Chart</TabsTrigger>
                  <TabsTrigger value="profiles" className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"><Waves className="h-4 w-4"/> Profiles</TabsTrigger>
                </TabsList>

                {/* Chat */}
                <TabsContent value="chat" className="mt-4 transition-opacity duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                  <div className="relative grid gap-4 md:grid-cols-[1fr]">
                    <div ref={listRef} className="h-[420px] overflow-y-auto rounded-xl border border-brand-aqua-start/30 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5 p-4">
                      {messages.map((m) => (
                        <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                          <div
                            className={
                              "mt-2 max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow transition-opacity animate-fade-up " +
                              (m.role === "user"
                                ? "bg-[hsl(var(--brand-aqua-start))] text-white"
                                : "bg-white text-[hsl(var(--brand-ocean))] dark:bg-white/10 dark:text-white")
                            }
                          >
                            {m.content}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white text-[hsl(var(--brand-ocean))] dark:bg-white/10 dark:text-white px-3 py-2 text-sm shadow">
                            <TypingDots />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input dock */}
                    <div className="sticky bottom-0 flex items-center gap-2 rounded-xl border border-brand-aqua-start/30 dark:border-white/10 bg-white/80 dark:bg-white/10 px-3 py-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && send()}
                        placeholder="Ask about ocean data…"
                        className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-foreground/50"
                      />
                      <button
                        onClick={send}
                        className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-aqua-start))] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                      >
                        <Send className="h-4 w-4" /> Send
                      </button>
                      <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 hover:bg-white/70 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10">
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </TabsContent>

                {/* Map */}
                <TabsContent value="map" className="mt-4 transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                  <div className="aspect-[16/9] rounded-xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-[radial-gradient(600px_200px_at_60%_-80px,hsl(var(--brand-cyan)/.25),transparent_70%)] p-4">
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-foreground/20 text-sm text-foreground/70 animate-fade-up">
                      Map placeholder (Leaflet/Mapbox)
                    </div>
                  </div>
                </TabsContent>

                {/* Chart */}
                <TabsContent value="chart" className="mt-4 transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                  <div className="aspect-[16/9] rounded-xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/80 dark:bg-white/5 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={demoChart} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                        <defs>
                          <linearGradient id="tempGradientDemo" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--brand-aqua-start))" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="hsl(var(--brand-aqua-end))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                        <XAxis dataKey="t" stroke="currentColor" opacity={0.6} fontSize={12} />
                        <YAxis stroke="currentColor" opacity={0.6} fontSize={12} />
                        <ReTooltip cursor={{ stroke: "hsl(var(--brand-aqua-start))", strokeWidth: 1 }} />
                        <Area type="monotone" dataKey="temp" stroke="hsl(var(--brand-aqua-start))" fill="url(#tempGradientDemo)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                {/* Profiles */}
                <TabsContent value="profiles" className="mt-4 transition-all duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["6903017", "7900690", "4903593", "3901855"].map((id, i) => (
                      <div key={id} className="rounded-xl border border-brand-aqua-start/30 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 animate-fade-up" style={{animationDelay: `${i * 60}ms`}}>
                        <div className="text-sm font-semibold">ARGO Float {id}</div>
                        <div className="mt-1 text-xs text-foreground/70">Last profile: 2025-02-01 • Region: North Atlantic</div>
                        <div className="mt-3 h-24 rounded-md ring-1 ring-brand-aqua-start/30 dark:ring-white/10 bg-[radial-gradient(300px_120px_at_60%_-80px,hsl(var(--brand-cyan)/.2),transparent_70%)]"></div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Input spacing at bottom */}
            <div className="h-4" />
          </div>

          {/* Impact */}
          <section className="mt-10">
            <div className="rounded-3xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/50 dark:bg-white/5 p-6 backdrop-blur-sm animate-fade-up">
              <h2 className="text-center text-2xl font-bold tracking-tight inline-flex items-center gap-2 justify-center"><Waves className="h-5 w-5 text-brand-cyan"/> Why FloatChat Matters</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-5 text-center">4,000+ ARGO floats worldwide</div>
                <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-5 text-center">Real-time ocean data access</div>
                <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-5 text-center">AI-powered insights for researchers & students</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
