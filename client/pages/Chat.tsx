import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import FloatChatAvatar from "@/components/FloatChatAvatar";
import { Send, Mic } from "lucide-react";

type Row = { id: number; user_email: string; text: string; created_at: string };

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-.1s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground"></span>
    </span>
  );
}

export default function ChatPage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Row[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email ?? null;
      setSessionEmail(email);
      if (!email) navigate("/auth", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const email = s?.user?.email ?? null;
      setSessionEmail(email);
      if (!email) navigate("/auth", { replace: true });
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (!error && data) setMessages((data as Row[]).slice().reverse());
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => setMessages((prev) => [...prev, payload.new as Row]),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [messages, isTyping]);

  const Header = useMemo(
    () => (
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-3">
          <FloatChatAvatar className="h-10 w-10" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--brand-ocean))] dark:text-white">
            FloatChat AI — Ocean Insights in Real Time
          </h1>
        </div>
        <p className="mt-2 text-sm text-foreground/70 max-w-2xl mx-auto">
          Ask about ocean data and chat with FloatChat.
        </p>
      </div>
    ),
    [],
  );

  async function send() {
    if (!input.trim() || !sessionEmail) return;
    const text = input.trim();
    setInput("");
    setIsTyping(true);
    const { error } = await supabase
      .from("messages")
      .insert([{ user_email: sessionEmail, text }]);
    if (error) {
      // Non-intrusive: revert typing state
      setIsTyping(false);
      setInput(text);
      return;
    }
    // Simulate AI typing indicator only (optional UI), real AI insert would come via realtime
    setTimeout(() => setIsTyping(false), 800);
  }

  if (!sessionEmail) return null;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,hsl(var(--brand-ocean)),hsl(var(--brand-aqua-start))_60%,hsl(var(--brand-aqua-end)))] pt-20">
      <div className="container py-8">
        <div className="mb-4">
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            ← Back to Home
          </a>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/20 ring-1 ring-brand-aqua-start/20 bg-white/90 dark:bg-white/5 backdrop-blur shadow-xl">
          <div className="absolute -inset-1 -z-10 opacity-50 blur-2xl [background:radial-gradient(800px_300px_at_50%_-80px,hsl(var(--brand-aqua-start)/.25),transparent_70%)]" />
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between">
              {Header}
              <div className="ml-6 shrink-0 text-right">
                <div className="text-xs text-foreground/70">Signed in as</div>
                <div className="text-sm font-medium truncate max-w-[220px]">
                  {sessionEmail}
                </div>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.assign("/auth");
                  }}
                  className="mt-1 inline-flex items-center rounded-full border border-brand-aqua-start/30 bg-white/90 px-3 py-1 text-xs font-semibold hover:bg-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="grid gap-4">
              <div
                ref={listRef}
                className="h-[520px] overflow-y-auto rounded-xl border border-brand-aqua-start/30 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5 p-4"
              >
                {loading && (
                  <div className="text-center text-sm text-foreground/70">
                    Loading messages…
                  </div>
                )}
                {!loading &&
                  messages.map((m) => {
                    const mine = m.user_email === sessionEmail;
                    return (
                      <div
                        key={m.id}
                        className={
                          "mt-2 flex items-start gap-2 " +
                          (mine ? "justify-end" : "justify-start")
                        }
                      >
                        {!mine && <FloatChatAvatar className="h-8 w-8" />}
                        <div
                          className={
                            "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow animate-fade-up " +
                            (mine
                              ? "bg-[hsl(var(--brand-aqua-start))] text-white"
                              : "bg-white text-[hsl(var(--brand-ocean))] dark:bg-white/10 dark:text-white")
                          }
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })}
                {isTyping && (
                  <div className="mt-2 flex items-start gap-2 justify-start">
                    <FloatChatAvatar className="h-8 w-8" />
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white text-[hsl(var(--brand-ocean))] dark:bg-white/10 dark:text-white px-3 py-2 text-sm shadow">
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
          </div>
        </div>
      </div>
    </div>
  );
}
