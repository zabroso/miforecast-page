/* app.jsx — Compose + Tweaks */
const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split",
  "accent": "#1f6fe5",
  "headFont": "Roboto"
}/*EDITMODE-END*/;

const ACCENTS = ["#1f6fe5", "#0e9aa7", "#4f5bd5"];
const FONTS = ["Roboto", "Space Grotesk", "Manrope"];
const GREEN = "#2f9e44";

function useReveal() {
  useE(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useE(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-soft", t.accent + "16");
    r.setProperty("--accent-ring", t.accent + "29");
    r.setProperty("--font-head", `"${t.headFont}", system-ui, sans-serif`);
  }, [t.accent, t.headFont]);

  return (
    <>
      <Header />
      <main>
        <Hero variant={t.heroVariant} accent={t.accent} green={GREEN} />
        <LogoStrip />
        <Paradigma />
        <Servicio />
        <Showcase accent={t.accent} green={GREEN} />
        <Planes />
        <Nosotros />
        <CtaBand />
        <Contacto />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Disposición" value={t.heroVariant}
          options={["split", "centered", "focus"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakSection label="Marca" />
        <TweakColor label="Color de acento" value={t.accent} options={ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Tipografía de títulos" value={t.headFont} options={FONTS}
          onChange={(v) => setTweak("headFont", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
