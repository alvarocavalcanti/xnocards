import { useEffect } from "react";
import { analytics } from "../utils";
import { CardSVG } from "./CardPanel";

export default function Homepage() {
  useEffect(() => {
    analytics.page();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-950 bg-white">
      {/* Hero */}
      <section className="homepage-hero-gradient relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 dark:text-white text-gray-900"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            X, N &amp; O Cards
          </h1>
          <p className="text-xl md:text-2xl dark:text-slate-300 text-slate-600 mb-12 max-w-2xl mx-auto">
            Anonymous TTRPG safety tools for{" "}
            <a
              href="https://www.owlbear.rodeo/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted hover:decoration-solid transition-all"
              style={{ color: "#7c3aed" }}
            >
              Owlbear Rodeo
            </a>
            . One click, no attribution, instant group awareness.
          </p>

          {/* Floating preview cards */}
          <div className="flex items-end justify-center gap-8 mb-12">
            <div className="float-x" style={{ marginBottom: "0px" }}>
              <CardSVG type="X" size={120} />
            </div>
            <div className="float-n" style={{ marginBottom: "12px" }}>
              <CardSVG type="N" size={140} />
            </div>
            <div className="float-o" style={{ marginBottom: "0px" }}>
              <CardSVG type="O" size={120} />
            </div>
          </div>

          <a
            href="https://extensions.owlbear.rodeo/"
            target="_blank"
            rel="noreferrer"
            id="homepage-install-btn"
            className="inline-block px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
            }}
          >
            Install from the OBR Store
          </a>
        </div>
      </section>

      {/* Cards explained */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center dark:text-white text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* X Card */}
          <div className="rounded-2xl p-6 border-2 text-center transition-transform hover:-translate-y-1"
               style={{ background: "#1e0505", borderColor: "#ef4444" }}>
            <div className="flex justify-center mb-4"><CardSVG type="X" size={80} /></div>
            <h3 className="text-xl font-bold text-red-400 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              X Card
            </h3>
            <p className="text-red-200/70 text-sm leading-relaxed">
              Something at the table is uncomfortable. Stop the scene, change direction,
              or rewind — no questions asked.
            </p>
          </div>

          {/* N Card */}
          <div className="rounded-2xl p-6 border-2 text-center transition-transform hover:-translate-y-1"
               style={{ background: "#1c1505", borderColor: "#f59e0b" }}>
            <div className="flex justify-center mb-4"><CardSVG type="N" size={80} /></div>
            <h3 className="text-xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              N Card
            </h3>
            <p className="text-amber-200/70 text-sm leading-relaxed">
              Content is heading somewhere uncomfortable. Slow down, fade to black,
              or shift focus before it becomes an X.
            </p>
          </div>

          {/* O Card */}
          <div className="rounded-2xl p-6 border-2 text-center transition-transform hover:-translate-y-1"
               style={{ background: "#031a0a", borderColor: "#22c55e" }}>
            <div className="flex justify-center mb-4"><CardSVG type="O" size={80} /></div>
            <h3 className="text-xl font-bold text-green-400 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              O Card
            </h3>
            <p className="text-green-200/70 text-sm leading-relaxed">
              A check-in for the whole group. Pause briefly to confirm everyone
              is comfortable to continue.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="dark:bg-gray-900/50 bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8">
            Designed for safety & trust
          </h2>
          <ul className="space-y-4 text-left">
            {[
              ["🔒", "Fully anonymous", "No player name or identity is ever attached to a played card."],
              ["⚡", "One click", "Cards appear instantly as a full-screen overlay for every participant."],
              ["🎭", "Works for everyone", "Any player or GM can play any card at any time."],
              ["🌗", "Dark & light aware", "Syncs automatically with your Owlbear Rodeo theme."],
            ].map(([icon, title, desc]) => (
              <li key={title} className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div>
                  <strong className="dark:text-white text-gray-900">{title}</strong>
                  <p className="dark:text-slate-400 text-slate-600 text-sm mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center dark:text-slate-500 text-slate-400 text-sm">
        <p>
          Made with ♥ by{" "}
          <a
            href="https://github.com/alvarocavalcanti"
            target="_blank"
            rel="noreferrer"
            className="underline hover:dark:text-slate-300 hover:text-slate-600"
          >
            Alvaro Cavalcanti
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/alvarocavalcanti/xnocards"
            target="_blank"
            rel="noreferrer"
            className="underline hover:dark:text-slate-300 hover:text-slate-600"
          >
            Source on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
