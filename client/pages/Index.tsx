import { useEffect, useState } from "react";
import Bubbles from "@/components/Bubbles";
import FeatureCard from "@/components/FeatureCard";
import {
  Bot,
  BarChart3,
  Waves,
  Globe2,
  MessageSquare,
  Share2,
  Play,
  Sparkles,
  Map,
  LineChart,
  Atom,
  Mail,
  Send,
  User,
  Lock,
  UserPlus,
  Image as ImageIcon,
} from "lucide-react";
import Avatar from "@/components/FloatChatAvatar";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line as RLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Index() {
  const [email, setEmail] = useState("");
  const [parallaxY, setParallaxY] = useState(0);
  const chartData = Array.from({ length: 16 }).map((_, i) => ({
    x: i,
    temp: 10 + Math.sin(i / 2) * 1.2 + i * 0.12,
  }));
  useEffect(() => {
    const onScroll = () => setParallaxY(Math.min(window.scrollY * 0.05, 60));
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-ocean-gradient" />
        <div className="absolute inset-0 bg-ocean-radial" />
        <Bubbles
          className="will-change-transform"
          style={{ transform: `translateY(${parallaxY}px)` }}
        />
        <div className="relative container py-24 md:py-32">
          <div className="rounded-3xl border border-white/30 ring-1 ring-brand-aqua-start/30 hover:ring-brand-aqua-end/40 transition shadow-2xl bg-white/10 p-8 backdrop-blur-xl animate-fade-up">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                  <Waves className="h-4 w-4" /> Futuristic Ocean AI
                </div>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
                  FloatChat AI — Talk to the Ocean
                </h1>
                <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
                  Ask the Ocean Anything – Explore ARGO Data with AI. Chat,
                  visualize, and discover insights from millions of global ocean
                  float observations.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#demo"
                    className="group relative inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white animate-pulse-glow hover:brightness-110"
                  >
                    <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end blur-md opacity-80 group-hover:opacity-100 transition" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Play className="h-4 w-4" /> Try the Demo
                    </span>
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white hover:border-white/60 transition hover:underline underline-offset-4"
                  >
                    Explore Features
                  </a>
                </div>
              </div>

              {/* Demo mockup */}
              <div className="relative animate-fade-up md:animate-none">
                <div className="relative rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <div className="rounded-xl bg-white/90 p-4 shadow-2xl">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-slate-200 dark:border-white/10 dark:bg-white/5 p-3">
                        <div className="text-xs font-semibold text-foreground/90 inline-flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" /> Chat
                        </div>
                        <div className="mt-2 space-y-2 text-xs">
                          <div className="rounded-md bg-slate-100 dark:bg-white/10 px-3 py-2">
                            How is temperature changing at 1000m in the North
                            Atlantic?
                          </div>
                          <div className="ml-auto w-5/6 rounded-md bg-gradient-to-r from-brand-aqua-start/20 to-brand-aqua-end/20 px-3 py-2 text-foreground animate-fade-up">
                            Median trend is +0.08°C/decade since 2010.
                            Visualizing profiles…
                          </div>
                          <div className="rounded-md bg-slate-100 dark:bg-white/10 px-3 py-2">
                            Show map of float density and a time series.
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 dark:border-white/10 dark:bg-white/5 p-3">
                        <div className="text-xs font-semibold text-foreground/90 inline-flex items-center gap-1">
                          <LineChart className="h-3.5 w-3.5" /> Visualization
                        </div>
                        <div className="mt-2 grid gap-3">
                          <div className="h-28 rounded-md ring-1 ring-brand-aqua-start/30 dark:ring-white/10 bg-white dark:bg-white/5">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={chartData}
                                margin={{
                                  left: 8,
                                  right: 8,
                                  top: 8,
                                  bottom: 8,
                                }}
                              >
                                <defs>
                                  <linearGradient
                                    id="tempGradient"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="5%"
                                      stopColor="#1e90ff"
                                      stopOpacity={0.7}
                                    />
                                    <stop
                                      offset="95%"
                                      stopColor="#00c9ff"
                                      stopOpacity={0.2}
                                    />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid
                                  stroke="#e2e8f0"
                                  strokeDasharray="3 3"
                                />
                                <XAxis
                                  dataKey="x"
                                  tick={{ fontSize: 10 }}
                                  tickLine={false}
                                  axisLine={false}
                                />
                                <YAxis
                                  tick={{ fontSize: 10 }}
                                  tickLine={false}
                                  axisLine={false}
                                  domain={[9, 14]}
                                />
                                <Tooltip contentStyle={{ fontSize: 12 }} />
                                <Area
                                  type="monotone"
                                  dataKey="temp"
                                  stroke="#00c9ff"
                                  fill="url(#tempGradient)"
                                  strokeWidth={2}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="h-28 rounded-md bg-[radial-gradient(300px_120px_at_60%_-80px,hsl(var(--brand-cyan)/.2),transparent_70%)] ring-1 ring-brand-aqua-start/30 dark:ring-white/10 grid grid-cols-10 gap-1 p-2">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <span
                                key={i}
                                className="h-2.5 w-2.5 rounded-sm bg-brand-aqua-start/20 [box-shadow:0_0_6px_hsl(var(--brand-aqua-end)/.3)]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[24px] opacity-70 blur-2xl [background:linear-gradient(135deg,hsl(var(--brand-aqua-start)),hsl(var(--brand-aqua-end)))]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight inline-flex items-center gap-2 justify-center">
              <Sparkles className="h-6 w-6 text-brand-cyan" /> Why FloatChat?
            </h2>
            <p className="mt-4 text-foreground/70">
              ARGO floats generate massive ocean data. It’s complex and hidden.
              FloatChat makes it simple: chat, explore, and visualize.
            </p>
          </div>
          <div className="mt-10 rounded-3xl border border-brand-aqua-start/30 ring-1 ring-brand-aqua-start/20 bg-white/50 dark:border-white/10 dark:ring-white/10 dark:bg-white/5 p-6 backdrop-blur-sm animate-fade-up">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-brand-aqua-start/10 to-brand-aqua-end/10 dark:from-brand-aqua-start/20 dark:to-brand-aqua-end/20 p-6 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 transition-transform hover:-translate-y-0.5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 dark:bg-white/10">
                  <Bot className="h-5 w-5 text-brand-aqua-start" />
                </div>
                <h3 className="mt-4 font-semibold">AI</h3>
                <p className="text-sm text-foreground/70">
                  Ask natural questions. Get synthesized answers with maps and
                  charts.
                </p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand-aqua-start/10 to-brand-aqua-end/10 dark:from-brand-aqua-start/20 dark:to-brand-aqua-end/20 p-6 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 transition-transform hover:-translate-y-0.5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 dark:bg-white/10">
                  <BarChart3 className="h-5 w-5 text-brand-aqua-start" />
                </div>
                <h3 className="mt-4 font-semibold">Visualization</h3>
                <p className="text-sm text-foreground/70">
                  Interactive maps, time series, and profile plots generated on
                  demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative bg-[radial-gradient(1000px_300px_at_50%_-60px,hsl(var(--brand-aqua-start)/0.15),transparent_70%)] py-20"
      >
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight animate-fade-up inline-flex items-center gap-2 justify-center">
            <Sparkles className="h-6 w-6 text-brand-cyan" /> Features
          </h2>
          <div className="mt-10 rounded-3xl border border-brand-aqua-start/30 ring-1 ring-brand-aqua-start/20 bg-white/50 dark:border-white/10 dark:ring-white/10 dark:bg-white/5 p-6 backdrop-blur-sm animate-fade-up">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<MessageSquare />}
                title="AI Chat"
                description="Ask natural questions about the ocean and float data."
                className="min-h-[180px]"
              />
              <FeatureCard
                icon={<BarChart3 />}
                title="Data Visualization"
                description="Interactive maps & charts for fast insights."
                className="min-h-[180px]"
              />
              <FeatureCard
                icon={<Globe2 />}
                title="Real Ocean Data"
                description="Powered by ARGO and ERDDAP datasets."
                className="min-h-[180px]"
              />
              <FeatureCard
                icon={<Bot />}
                title="Storytelling"
                description="AI generates explanations and narratives."
                className="min-h-[180px]"
              />
              <FeatureCard
                icon={<Share2 />}
                title="Exportable Results"
                description="Share insights as slides or links."
                className="min-h-[180px]"
              />
              <FeatureCard
                icon={<Map />}
                title="Spatial Views"
                description="Explore float density and trajectories on map-like visuals."
                className="min-h-[180px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="relative py-20">
        <div className="container grid items-start gap-10 md:grid-cols-2">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight inline-flex items-center gap-2">
              <Map className="h-6 w-6 text-brand-cyan" /> See FloatChat in
              Action
            </h2>
            <p className="mt-3 text-foreground/70">
              Explore a preview of the chat + visualization experience. Ask
              questions, render maps and charts, and share results in seconds.
            </p>
            <a
              href="#demo"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-3 text-sm font-semibold text-white drop-shadow-glow animate-pulse-glow hover:brightness-110"
            >
              <Play className="h-4 w-4" /> Launch FloatChat Demo
            </a>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=120"
                alt="ocean"
                className="h-9 w-9 rounded-full ring-2 ring-brand-aqua-start/50 object-cover animate-bob"
              />
              <img
                src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=120"
                alt="floats"
                className="h-9 w-9 rounded-full ring-2 ring-brand-aqua-end/50 object-cover animate-bob"
                style={{ animationDelay: "0.2s" }}
              />
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=120"
                alt="map"
                className="h-9 w-9 rounded-full ring-2 ring-brand-cyan/50 object-cover animate-bob"
                style={{ animationDelay: "0.4s" }}
              />
              <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-brand-aqua-start/30 dark:border-white/10 bg-white/60 dark:bg-white/10 px-3 py-1 text-xs text-foreground/80">
                <Sparkles className="h-3.5 w-3.5" /> AI is preparing visuals…
              </span>
            </div>
          </div>
          <div className="relative rounded-3xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 p-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-xl animate-fade-up">
            <Tabs defaultValue="map">
              <TabsList className="bg-white/70 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-xl">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"
                >
                  <Map className="h-4 w-4" /> Map
                </TabsTrigger>
                <TabsTrigger
                  value="chart"
                  className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"
                >
                  <LineChart className="h-4 w-4" /> Chart
                </TabsTrigger>
                <TabsTrigger
                  value="profiles"
                  className="data-[state=active]:text-brand-aqua-start inline-flex gap-2"
                >
                  <Waves className="h-4 w-4" /> Profiles
                </TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="mt-4 transition-opacity duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-brand-aqua-start/30 ring-1 ring-brand-aqua-start/20 bg-[radial-gradient(600px_200px_at_60%_-80px,hsl(var(--brand-cyan)/.25),transparent_70%)] p-4">
                  <div className="h-full w-full rounded-lg bg-[linear-gradient(0deg,transparent_96%,hsl(var(--brand-aqua-start)/.35)_96%),linear-gradient(90deg,transparent_96%,hsl(var(--brand-aqua-end)/.35)_96%)] bg-[length:24px_24px]" />
                  <div className="pointer-events-none absolute inset-0">
                    <span className="absolute left-[20%] top-[30%] grid place-items-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan drop-shadow-glow animate-bob" />
                      <span className="absolute h-6 w-6 rounded-full border border-brand-cyan/60 animate-ping-slow" />
                    </span>
                    <span className="absolute left-[55%] top-[50%] grid place-items-center">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-brand-cyan drop-shadow-glow animate-bob"
                        style={{ animationDelay: "0.4s" }}
                      />
                      <span className="absolute h-6 w-6 rounded-full border border-brand-cyan/60 animate-ping-slow" />
                    </span>
                    <span className="absolute left-[75%] top-[25%] grid place-items-center">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-brand-cyan drop-shadow-glow animate-bob"
                        style={{ animationDelay: "0.8s" }}
                      />
                      <span className="absolute h-6 w-6 rounded-full border border-brand-cyan/60 animate-ping-slow" />
                    </span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="chart" className="mt-4 transition-opacity duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                <div className="aspect-[16/10] rounded-xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/80 dark:bg-white/5 p-4">
                  <div className="grid h-full grid-cols-12 items-end gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-brand-aqua-start/50 to-brand-aqua-end/70 animate-fade-up"
                        style={{
                          height: `${20 + Math.random() * 70}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="profiles" className="mt-4 transition-opacity duration-300 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                <div className="aspect-[16/10] rounded-xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/80 dark:bg-white/5 p-4">
                  <svg viewBox="0 0 400 200" className="h-full w-full">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0%" stopColor="#1e90ff" />
                        <stop offset="100%" stopColor="#00c9ff" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,140 Q80,100 120,120 T240,100 T400,110"
                      fill="none"
                      stroke="url(#g1)"
                      strokeWidth="3"
                      className="animate-[float_6s_ease-in-out_infinite]"
                    />
                    <path
                      d="M0,160 Q100,120 160,140 T320,120 T400,130"
                      fill="none"
                      stroke="#0a2540"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      className="animate-[float_7s_ease-in-out_infinite]"
                    />
                  </svg>
                </div>
              </TabsContent>
            </Tabs>
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-60 blur-2xl [background:linear-gradient(135deg,hsl(var(--brand-aqua-start)),hsl(var(--brand-aqua-end)))]" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/50 dark:bg-white/5 px-8 py-10 backdrop-blur-sm animate-fade-up">
            <div className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(400px_120px_at_50%_-40px,black,transparent_70%)]">
              <svg className="absolute inset-x-0 -top-12 h-40 w-full opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="hsl(var(--brand-cyan)/.3)" d="M0,64L60,74.7C120,85,240,107,360,133.3C480,160,600,192,720,181.3C840,171,960,117,1080,112C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-aqua-start/30 dark:border-white/10 bg-white/60 dark:bg-white/10 px-3 py-1 text-xs text-foreground/70">
                <Sparkles className="h-3.5 w-3.5 text-brand-cyan" /> Team
              </div>
              <h3 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(var(--brand-aqua-start)),hsl(var(--brand-cyan)),hsl(var(--brand-aqua-end)))] bg-[length:200%_100%] animate-shimmer">Meet the Oceanauts</h3>
              <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">A multidisciplinary team shaping FloatChat AI.</p>
            </div>

            {/* Members */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up">
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Angel%20Lakra&backgroundType=gradientLinear&radius=16" alt="Angel Lakra" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Angel Lakra</h4>
                    <p className="text-sm text-foreground/70">Frontend Developer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Designing intuitive user interfaces and crafting smooth user experiences.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.05s'}}>
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Shivam%20Kumar&backgroundType=gradientLinear&radius=16" alt="Shivam Kumar" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Shivam Kumar</h4>
                    <p className="text-sm text-foreground/70">Frontend Developer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Transforming ideas into responsive and interactive designs.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.1s'}}>
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Mohammad%20Anas&backgroundType=gradientLinear&radius=16" alt="Mohammad Anas" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Mohammad Anas</h4>
                    <p className="text-sm text-foreground/70">Backend Developer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Architecting scalable systems and ensuring robust backend performance.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.15s'}}>
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Vivek%20Kumar%20Singh&backgroundType=gradientLinear&radius=16" alt="Vivek Kumar Singh" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Vivek Kumar Singh</h4>
                    <p className="text-sm text-foreground/70">Backend Developer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Building secure APIs and managing data-driven workflows.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.2s'}}>
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Vaibhav%20Khanna&backgroundType=gradientLinear&radius=16" alt="Vaibhav Khanna" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Vaibhav Khanna</h4>
                    <p className="text-sm text-foreground/70">Backend Developer</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Optimizing performance and streamlining integrations for FloatChat AI.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.25s'}}>
                <div className="flex items-center gap-4">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=Tahasen%20Anjun&backgroundType=gradientLinear&radius=16" alt="Tahasen Anjun" className="h-16 w-16 rounded-xl ring-1 ring-white/30" />
                  <div>
                    <h4 className="font-semibold">Tahasen Anjun</h4>
                    <p className="text-sm text-foreground/70">Data Analyst</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80">Handling ARGO datasets, preprocessing data, and creating insightful visualizations.</p>
              </div>
            </div>

            {/* Grouped lists */}
            <div className="mt-8 grid gap-3 text-sm text-foreground/80">
              <div><span className="font-semibold">Frontend Team (2):</span> Angel Lakra, Shivam Kumar</div>
              <div><span className="font-semibold">Backend Team (3):</span> Mohammad Anas, Vivek Kumar Singh, Vaibhav Khanna</div>
              <div><span className="font-semibold">Data Team (1):</span> Tahasen Anjun</div>
            </div>

            {/* Values */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0s'}}>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-aqua-start to-brand-aqua-end text-white"><Waves className="h-5 w-5"/></div>
                <h4 className="mt-3 font-semibold">Ocean-first design</h4>
                <p className="text-sm text-foreground/70">Every interaction feels like water—fluid, calm, and precise.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.1s'}}>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-aqua-start to-brand-aqua-end text-white"><Bot className="h-5 w-5"/></div>
                <h4 className="mt-3 font-semibold">Human + AI</h4>
                <p className="text-sm text-foreground/70">We craft conversations that turn data into narratives and decisions.</p>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 backdrop-blur-sm animate-fade-up" style={{animationDelay:'0.2s'}}>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-aqua-start to-brand-aqua-end text-white"><Atom className="h-5 w-5"/></div>
                <h4 className="mt-3 font-semibold">Science in Motion</h4>
                <p className="text-sm text-foreground/70">Live maps, profiles, and visuals that breathe with real ARGO data.</p>
              </div>
            </div>

            <Bubbles className="opacity-20" />
          </div>
        </div>
      </section>

      {/* Impact / Why It Matters */}
      <section id="impact" className="relative py-16">
        <div className="container">
          <div className="rounded-3xl border border-brand-aqua-start/30 dark:border-white/10 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 bg-white/50 dark:bg-white/5 p-8 backdrop-blur-sm animate-fade-up">
            <h2 className="text-center text-3xl font-bold tracking-tight inline-flex items-center gap-2 justify-center"><Sparkles className="h-6 w-6 text-brand-cyan"/> Why FloatChat Matters</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-6 text-center">
                <div className="text-2xl">🌊</div>
                <div className="mt-2 text-lg font-semibold">4,000+ ARGO floats worldwide</div>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-6 text-center">
                <div className="text-2xl">🤖</div>
                <div className="mt-2 text-lg font-semibold">AI-powered interface makes complex datasets accessible</div>
              </div>
              <div className="rounded-2xl border border-brand-aqua-start/20 dark:border-white/10 bg-white/60 dark:bg-white/10 p-6 text-center">
                <div className="text-2xl">🎓</div>
                <div className="mt-2 text-lg font-semibold">For students, researchers, and innovators</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="relative py-20">
        <div className="container rounded-3xl border border-brand-aqua-start/30 dark:border-white/10 bg-white/50 dark:bg-white/5 ring-1 ring-brand-aqua-start/20 dark:ring-white/10 overflow-hidden">
          <div className="flex items-center justify-center gap-2 border-b border-brand-aqua-start/20 dark:border-white/10 bg-white/70 dark:bg-white/10 px-6 py-4">
            <span aria-hidden><Avatar className="h-7 w-7"/></span>
            <span className="font-semibold tracking-tight">
              FloatChat <span className="text-brand-cyan">AI</span>
            </span>
          </div>
          <div className="p-6 flex flex-col items-center text-center">
            <div className="animate-fade-up max-w-xl">
              <h3 className="text-2xl font-bold tracking-tight inline-flex items-center gap-2 justify-center">
                <Mail className="h-6 w-6 text-brand-cyan" /> Ready to Talk to
                the Ocean?
              </h3>
              <p className="mt-2 text-foreground/70">
                Get early access to the FloatChat demo and updates.
              </p>
              <form
                className="mt-6 mx-auto flex w-full max-w-md items-center justify-center gap-2"
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
                  className="flex-1 rounded-full border border-brand-aqua-start/30 dark:border-white/10 bg-white/80 dark:bg-white/10 px-4 py-3 text-sm outline-none ring-0 placeholder:text-foreground/50 dark:placeholder:text-white/50 dark:text-white focus:border-brand-aqua-end/60"
                />
                <button
                  type="submit"
                  className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-3 text-sm font-semibold text-white drop-shadow-glow"
                >
                  <Send className="h-4 w-4" /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
