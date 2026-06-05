/* sections.jsx — Secciones de la landing. Texto = solo contenido real del sitio. */
const { useState, useEffect, useRef } = React;

const HERO_MSGS = [
  "IA que clasifica tus oportunidades por probabilidad de cierre.",
  "Deja de administrar datos. Empieza a predecir resultados.",
  "El anti-CRM: menos ingreso, más inteligencia comercial.",
  "Para vendedores y gerentes que quieren certeza, no reportes.",
  "Forecast preciso sin hojas de cálculo ni reuniones de seguimiento.",
];

const NAV = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#nosotros"],
  ["Nuestro Servicio", "#servicio"],
  ["Nuestros Planes", "#planes"],
  ["Contáctanos", "#contacto"],
];

const Logo = () => (
  <span className="logo"><span className="brand-mi">Mi</span><span className="brand-fc">Forecast</span><span className="dot">.com</span></span>
);

function Header() {
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <a href="#inicio"><Logo /></a>
        <nav className="nav">
          {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="hdr-cta">
          <a className="access" href="https://app.miforecast.com" target="_blank" rel="noopener">Acceso Clientes</a>
          <a className="btn btn-primary" href="https://app.miforecast.com/registro.html" target="_blank" rel="noopener">Pruébalo gratis</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero (3 variantes) ---------- */
function Hero({ variant, accent, green }) {
  const [mi, setMi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMi((m) => (m + 1) % HERO_MSGS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const Copy = (
    <div className="hero-copy">
      <span className="eyebrow">Inteligencia Comercial con IA</span>
      <h1>Menos administración.<br />Más ventas.</h1>
      <p className="lede">
        <span className="brand-mi">Mi</span><span className="brand-fc">Forecast</span> usa IA para analizar
        tu pipeline, priorizar lo que realmente importa y predecir tus ventas con precisión.
        Sin la complejidad de un CRM.
      </p>
      <div className="hero-cta">
        <a className="btn btn-primary btn-lg" href="https://app.miforecast.com/registro.html" target="_blank" rel="noopener">
          Pruébalo gratis <IcArrow />
        </a>
        <a className="btn btn-ghost btn-lg" href="#servicio">Ver cómo funciona</a>
      </div>
      <div className="hero-rot">
        <span className="tick"><IcCheck /></span>
        <span className="msg" key={mi}>{HERO_MSGS[mi]}</span>
      </div>
    </div>
  );

  const Visual = (
    <div className="hero-visual">
      <DashboardPreview float={variant !== "centered"} accent={accent} green={green} />
    </div>
  );

  return (
    <section id="inicio" className={`hero v-${variant}`}>
      <div className="hero-glow" />
      <div className="wrap">
        <div className="hero-grid">
          {variant === "focus" ? (<>{Visual}{Copy}</>) : (<>{Copy}{Visual}</>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Logo strip ---------- */
const LOGOS = ["Besalco", "Xstrata", "Salfa", "Confuturo", "Bechtle", "Innova"];

function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="wrap">
        <p className="logo-strip-label">Empresas que ya venden más con MiForecast</p>
        <div className="logo-strip-grid">
          {LOGOS.map((l) => <span key={l} className="logo-strip-item">{l}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- ParadigmaFlow (CRM → nodo IA → MiForecast) ---------- */
const PFLOW_BEFORE = [
  "Horas de trabajo manual y datos desactualizados",
  "Información dispersa y difícil de analizar",
  "Sin visibilidad clara del futuro",
  "Decisiones basadas en intuición",
];
const PFLOW_AFTER = [
  "IA que trabaja por ti y mantiene todo actualizado",
  "Información centralizada y accionable",
  "Predicciones confiables de tus ventas futuras",
  "Decisiones basadas en datos, no en corazonadas",
];
const PFLOW_LINE_YS = [28, 60, 92, 124, 156];
const PFLOW_DURS   = [1.5, 1.2, 1.0, 1.3, 1.1];
const PFLOW_DELAYS = [0, 0.3, 0.6, 0.15, 0.45];

function Paradigma() {
  const cx = 150, cy = 110;
  return (
    <section className="pflow-section reveal">
      <div className="wrap">
        <div className="pflow-grid">

          {/* IZQUIERDA: dolores del CRM */}
          <div className="pflow-card pflow-before">
            <div className="pflow-title">
              <span className="pflow-badge bad">Antes</span>
              CRM tradicional
            </div>
            <ul className="pflow-list">
              {PFLOW_BEFORE.map((t) => (
                <li key={t} className="pflow-item bad"><IcX />{t}</li>
              ))}
            </ul>
          </div>

          {/* CENTRO: animación SVG */}
          <div className="pflow-svg-wrap">
            <svg viewBox="0 0 300 192" width="100%" style={{ overflow: "visible", display: "block" }}>
              <defs>
                <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(31,111,229,.55)" />
                  <stop offset="100%" stopColor="rgba(31,111,229,0)" />
                </radialGradient>
                <radialGradient id="pglow2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(99,102,241,.4)" />
                  <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </radialGradient>
              </defs>

              {/* Líneas rojas: caos del CRM → nodo */}
              {PFLOW_LINE_YS.map((y, i) => {
                const path = `M0,${y} C70,${y} 120,${cy} ${cx},${cy}`;
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke="#f4655a" strokeWidth="1.2" opacity="0.35" />
                    <circle r="2.8" fill="#f4655a" opacity="0.9">
                      <animateMotion dur={`${PFLOW_DURS[i]}s`} repeatCount="indefinite"
                        begin={`${PFLOW_DELAYS[i]}s`} path={path} />
                    </circle>
                  </g>
                );
              })}

              {/* Flecha azul: nodo → solución */}
              <path d={`M${cx + 2},${cy} L290,${cy}`} fill="none" stroke="#1f6fe5" strokeWidth="2" />
              <polygon points={`290,${cy - 5} 300,${cy} 290,${cy + 5}`} fill="#1f6fe5" />

              {/* Glow exterior */}
              <circle cx={cx} cy={cy} r={44} fill="url(#pglow)" />
              <circle cx={cx} cy={cy} r={30} fill="url(#pglow2)" />

              {/* Anillo exterior */}
              <circle cx={cx} cy={cy} r={24} fill="rgba(99,102,241,.08)"
                stroke="rgba(99,102,241,.25)" strokeWidth="1">
                <animate attributeName="r" values="24;28;24" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Anillo interior */}
              <circle cx={cx} cy={cy} r={15} fill="rgba(99,102,241,.15)"
                stroke="rgba(120,113,246,.5)" strokeWidth="1.5" />

              {/* Estrella de 4 puntas */}
              <path d={`M${cx},${cy-15} L${cx+3.5},${cy-3.5} L${cx+15},${cy} L${cx+3.5},${cy+3.5} L${cx},${cy+15} L${cx-3.5},${cy+3.5} L${cx-15},${cy} L${cx-3.5},${cy-3.5} Z`}
                fill="#c4b5fd" opacity="0.95">
                <animate attributeName="opacity" values="0.95;0.6;0.95" dur="2s" repeatCount="indefinite" />
              </path>

              {/* Centro brillante */}
              <circle cx={cx} cy={cy} r={3} fill="#fff" opacity="0.9">
                <animate attributeName="r" values="3;4.5;3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* DERECHA: beneficios de MiForecast */}
          <div className="pflow-card pflow-after">
            <div className="pflow-title">
              <span className="pflow-badge good">Con</span>
              MiForecast
            </div>
            <ul className="pflow-list">
              {PFLOW_AFTER.map((t) => (
                <li key={t} className="pflow-item good"><IcCheck />{t}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Nosotros ---------- */
function Nosotros() {
  return (
    <section id="nosotros" className="sec reveal">
      <div className="wrap about-grid">
        <div>
          <span className="kicker-tag">Nosotros</span>
          <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 800, marginTop: 16 }}>
            Hecho por vendedores y gerentes, para equipos de venta B2B
          </h2>
          <p style={{ marginTop: 18, fontSize: 18, color: "var(--muted)" }}>
            <span className="brand-mi">Mi</span><span className="brand-fc">Forecast</span>.com es fruto de +25 años de
            experiencia exitosa gestionando ventas B2B en empresas locales y transnacionales, como vendedores y gerentes.
          </p>
          <p style={{ marginTop: 14, fontSize: 16, color: "var(--muted)" }}>
            Aquí encuentras la forma más simple de pronosticar ventas sin tener que ingresar cientos de datos de
            clientes o contratar personas para que los ingresen.
          </p>
          <div className="not-crm"><IcShield /> No somos un CRM ni queremos serlo.</div>
          <div className="stat-row">
            <div className="stat"><div className="n">+25<span className="u"> años</span></div><div className="l">de experiencia gestionando ventas B2B</div></div>
            <div className="stat"><div className="n">2</div><div className="l">vistas especializadas: vendedor y gerente</div></div>
          </div>
        </div>
        <div className="about-card">
          <div className="q">"Nuestro propósito es ser SIMPLE y EFICAZ."</div>
          <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 15 }}>
            Únete a nosotros y descubre cómo podrás calificar mejor tus oportunidades y focalizarte en aquellas
            que te harán llegar a la meta.
          </p>
          <div className="who">
            <div className="av">MF</div>
            <div className="meta"><b>Equipo MiForecast</b><span>Experiencia en ventas B2B</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Nuestro Servicio (4 pilares reales) ---------- */
const PILLARS = [
  { ic: <IcSpark />, t: "IA que prioriza",
    p: "La IA de MiForecast analiza cada oportunidad de tu pipeline y la clasifica según su probabilidad real de cierre. Sin suposiciones. Sin intuición. Solo inteligencia aplicada directamente a tus ventas." },
  { ic: <IcChart />, t: "Forecasting predecible",
    p: "Proyección de ventas basada en las etapas del pipeline con metodología Solution Selling. Sabes cuánto vas a facturar antes de que termine el mes, sin hojas de cálculo ni reuniones de seguimiento." },
  { ic: <IcShield />, t: "El anti-CRM",
    p: "Diseñado para NO ser un CRM. Sin implementaciones complejas, sin campos interminables, sin trabajo administrativo innecesario. Solo los datos necesarios para predecir tus ventas y enfocarte en cerrar." },
  { ic: <IcLayers />, t: "Visibilidad por rol",
    p: "Vendedores ven su forecast personal y sus oportunidades priorizadas por IA. Gerentes ven el rendimiento del equipo y simulan escenarios para llegar a la meta. Cada rol ve exactamente lo que necesita." },
];

const SVC_IN_YS     = [80, 195, 315, 435];
const SVC_IN_LABELS = ["Historial de ventas", "Datos de compras", "Pipeline activo", "Clientes activos"];
const SVC_IN_COLS   = ["#1f6fe5", "#2f9e44", "#1f6fe5", "#2f9e44"];
const SVC_IN_DURS   = [1.8, 1.5, 1.2, 1.6];
const SVC_IN_DELS   = [0, 0.3, 0.6, 0.15];
const SVC_OUT_YS    = [65, 205, 345, 490];
const SVC_OUT_DURS  = [1.4, 1.6, 1.3, 1.5];
const SVC_OUT_DELS  = [0.1, 0.4, 0.7, 0.25];
const SVC_CX = 245, SVC_CY = 260;

function Servicio() {
  return (
    <section id="servicio" className="sec reveal">
      <div className="wrap">
        <div className="servicio-grid">

          {/* IZQUIERDA: texto + funnel SVG */}
          <div className="sfunnel-col">
            <span className="kicker-tag">Nuestro Servicio</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, marginTop: 14 }}>
              De tus datos a resultados<br />que cierran negocios
            </h2>
            <p style={{ marginTop: 12, fontSize: 15, color: "var(--muted)", maxWidth: 380 }}>
              MiForecast conecta tus señales comerciales y las convierte en las capacidades que tu equipo necesita para vender más.
            </p>

            <svg viewBox="0 0 400 560" width="100%" style={{ display: "block", marginTop: 20 }} className="sfunnel-svg">
              <defs>
                <radialGradient id="sfglow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(31,111,229,.5)" />
                  <stop offset="100%" stopColor="rgba(31,111,229,0)" />
                </radialGradient>
              </defs>

              {/* Líneas de entrada + dots */}
              {SVC_IN_YS.map((y, i) => {
                const path = `M100,${y} C165,${y} 220,${SVC_CY} ${SVC_CX},${SVC_CY}`;
                const dc = SVC_IN_COLS[i] === "#1f6fe5" ? "#4d91f5" : "#5fd07f";
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke={SVC_IN_COLS[i]} strokeWidth="1.2" opacity="0.28" />
                    <circle r="2.8" fill={dc}>
                      <animateMotion dur={`${SVC_IN_DURS[i]}s`} repeatCount="indefinite"
                        begin={`${SVC_IN_DELS[i]}s`} path={path} />
                    </circle>
                    <circle cx={100} cy={y} r={4} fill={SVC_IN_COLS[i]} opacity="0.45" />
                    <text x={94} y={y + 4} textAnchor="end" fontSize="10"
                      fontFamily="Roboto, system-ui, sans-serif" fill="#4a6078" fontWeight="500">
                      {SVC_IN_LABELS[i]}
                    </text>
                  </g>
                );
              })}

              {/* Líneas de salida + dots */}
              {SVC_OUT_YS.map((y, i) => {
                const path = `M${SVC_CX},${SVC_CY} C305,${SVC_CY} 365,${y} 400,${y}`;
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke="#2f9e44" strokeWidth="1.2" opacity="0.35" />
                    <circle r="2.8" fill="#5fd07f">
                      <animateMotion dur={`${SVC_OUT_DURS[i]}s`} repeatCount="indefinite"
                        begin={`${SVC_OUT_DELS[i]}s`} path={path} />
                    </circle>
                  </g>
                );
              })}

              {/* Nodo: glow + estrella */}
              <circle cx={SVC_CX} cy={SVC_CY} r={52} fill="url(#sfglow)" />
              <circle cx={SVC_CX} cy={SVC_CY} r={34} fill="rgba(31,111,229,.07)" stroke="rgba(31,111,229,.18)" strokeWidth="1">
                <animate attributeName="r" values="34;38;34" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={SVC_CX} cy={SVC_CY} r={21} fill="rgba(31,111,229,.14)" stroke="rgba(31,111,229,.4)" strokeWidth="1.5" />
              <path d={`M${SVC_CX},${SVC_CY-14} L${SVC_CX+3.5},${SVC_CY-3.5} L${SVC_CX+14},${SVC_CY} L${SVC_CX+3.5},${SVC_CY+3.5} L${SVC_CX},${SVC_CY+14} L${SVC_CX-3.5},${SVC_CY+3.5} L${SVC_CX-14},${SVC_CY} L${SVC_CX-3.5},${SVC_CY-3.5} Z`}
                fill="#c4b5fd">
                <animate attributeName="opacity" values="0.9;0.55;0.9" dur="2.5s" repeatCount="indefinite" />
              </path>
              <circle cx={SVC_CX} cy={SVC_CY} r={3} fill="#fff">
                <animate attributeName="r" values="3;4.2;3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x={SVC_CX} y={SVC_CY + 30} textAnchor="middle" fontSize="10"
                fontFamily="Roboto, system-ui, sans-serif" fontWeight="800" letterSpacing="-0.3">
                <tspan fill="#2f9e44">Mi</tspan><tspan fill="#1f6fe5">Forecast</tspan>
              </text>
            </svg>
          </div>

          {/* DERECHA: cards de output */}
          <div className="feat-stack">
            {PILLARS.map((f) => (
              <div className="feat-output" key={f.t}>
                <div className="feat-output-ic">{f.ic}</div>
                <div>
                  <h3>{f.t}</h3>
                  <p>{f.p}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- DataFunnel (señales → MiForecast) ---------- */
const FSOURCES = [
  { l1: "Historial", l2: "de ventas", x: 80, col: "#1f6fe5" },
  { l1: "Datos de", l2: "compras", x: 250, col: "#2f9e44" },
  { l1: "Pipeline", l2: "activo", x: 500, col: "#1f6fe5" },
  { l1: "Clientes", l2: "activos", x: 750, col: "#2f9e44" },
  { l1: "Proyecciones", l2: "del período", x: 920, col: "#1f6fe5" },
];
const FDURS    = [2.8, 2.3, 1.9, 2.5, 2.2];
const FDELAYS  = [0, 0.5, 1.0, 0.25, 0.75];
const FOUTPUTS = ["Forecast preciso", "Priorización con IA", "Predicción de cierre", "Decisiones claras"];

function DataFunnel() {
  const cy = 400;
  return (
    <section className="sec-dark reveal" style={{ padding: "80px 0 60px" }}>
      <div className="wrap">
        <div className="sec-head center">
          <span className="kicker-tag-dark">Cómo funciona</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginTop: 16 }}>
            De tus datos a decisiones<br />que cierran negocios
          </h2>
          <p style={{ marginTop: 16, fontSize: 17, color: "#8fa1b8", maxWidth: 560, margin: "16px auto 0" }}>
            MiForecast conecta todas tus señales comerciales y las transforma en inteligencia accionable.
          </p>
        </div>

        <svg viewBox="0 0 1000 480" width="100%" style={{ display: "block", marginTop: 16 }}>
          <defs>
            <radialGradient id="fglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(31,111,229,.4)" />
              <stop offset="100%" stopColor="rgba(31,111,229,0)" />
            </radialGradient>
          </defs>

          {FSOURCES.map((s, i) => {
            const path = `M${s.x},92 C${s.x},255 500,265 500,${cy}`;
            const dotCol = s.col === "#1f6fe5" ? "#4d91f5" : "#5fd07f";
            return (
              <g key={i}>
                <path d={path} fill="none" stroke={s.col} strokeWidth="1.5" opacity="0.3" />

                <circle r="3.5" fill={dotCol} opacity="0.95">
                  <animateMotion dur={`${FDURS[i]}s`} repeatCount="indefinite"
                    begin={`${FDELAYS[i]}s`} path={path} />
                </circle>
                <circle r="1.8" fill="rgba(255,255,255,.5)">
                  <animateMotion dur={`${FDURS[i]}s`} repeatCount="indefinite"
                    begin={`${FDELAYS[i] + 0.12}s`} path={path} />
                </circle>

                <circle cx={s.x} cy={76} r="16"
                  fill={s.col === "#1f6fe5" ? "rgba(31,111,229,.12)" : "rgba(47,158,68,.12)"}
                  stroke={s.col} strokeWidth="1" opacity="0.8" />

                <text x={s.x} y={108} textAnchor="middle" fontSize="11"
                  fontFamily="Roboto, system-ui, sans-serif" fill="#5a7090" fontWeight="500">{s.l1}</text>
                <text x={s.x} y={121} textAnchor="middle" fontSize="11"
                  fontFamily="Roboto, system-ui, sans-serif" fill="#5a7090" fontWeight="500">{s.l2}</text>
              </g>
            );
          })}

          <circle cx={500} cy={cy} r={70} fill="url(#fglow)" />
          <circle cx={500} cy={cy} r={46} fill="rgba(31,111,229,.07)" stroke="rgba(31,111,229,.16)" strokeWidth="1">
            <animate attributeName="r" values="46;51;46" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx={500} cy={cy} r={30} fill="rgba(31,111,229,.15)" stroke="rgba(31,111,229,.45)" strokeWidth="1.5" />

          <text x={500} y={cy - 3} textAnchor="middle" fontSize="13"
            fontFamily="Roboto, system-ui, sans-serif" fontWeight="800" letterSpacing="-0.5">
            <tspan fill="#2f9e44">Mi</tspan><tspan fill="#1f6fe5">Forecast</tspan>
          </text>
          <text x={500} y={cy + 12} textAnchor="middle" fontSize="7.5"
            fontFamily="Roboto, system-ui, sans-serif" fill="#3d5268" letterSpacing="1.5">IA</text>
        </svg>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 0 }}>
          {FOUTPUTS.map((o) => (
            <div key={o} style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600,
              color: "#c4d4e6", background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.08)", padding: "10px 18px", borderRadius: 999
            }}>
              <span style={{ color: "#2f9e44", display: "inline-flex", width: 15, height: 15 }}><IcCheck /></span>
              {o}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Showcase (data viz protagonista) ---------- */
function Showcase({ accent, green }) {
  const [val, setVal] = useState(72);
  const meta = 100;
  const proj = Math.round(val * 1.18);
  const pct = Math.min(100, Math.round((proj / meta) * 100));
  return (
    <section className="sec showcase reveal">
      <div className="wrap show-grid">
        <div>
          <span className="kicker-tag">Toma de decisiones</span>
          <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 800, marginTop: 16 }}>
            Dashboards flexibles y un simulador para llegar a la meta
          </h2>
          <p style={{ marginTop: 16, fontSize: 17, color: "var(--muted)" }}>
            Los dashboards te ayudan a tomar mejores decisiones. Si eres gerente, podrás ver el rendimiento de tu
            equipo de ventas y simular escenarios para llegar a la meta.
          </p>
          <div className="show-list">
            <div className="show-item"><span className="b"><IcGrid /></span><div><h4>Grilla de oportunidades</h4><p>Optimizada para requerir el menor tiempo en ingreso de datos.</p></div></div>
            <div className="show-item"><span className="b"><IcLayers /></span><div><h4>Vistas para vendedor y gerente</h4><p>Cada rol ve exactamente lo que necesita para decidir.</p></div></div>
            <div className="show-item"><span className="b"><IcChart /></span><div><h4>Pronóstico predecible</h4><p>Calificación por etapas del pipeline (Solution Selling).</p></div></div>
          </div>

          <div className="sim">
            <div className="sim-head">
              <span className="t"><IcGauge /> &nbsp;Simulador de ventas</span>
              <span className="tag">vista ilustrativa</span>
            </div>
            <div className="sim-row">
              <span className="big">{proj}%</span>
              <span className="meta">de la meta proyectada</span>
            </div>
            <input type="range" min="40" max="100" value={val} onChange={(e) => setVal(+e.target.value)} />
            <div className="sim-bar"><i style={{ width: `${pct}%` }} /></div>
            <div className="sim-scale"><span>Escenario conservador</span><span>Meta</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <DashboardPreview float={false} accent={accent} green={green} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Nuestros Planes (precios reales) ---------- */
const PLANS = [
  { name: "Plan Trimestral", amt: "14,90", feats: ["Acceso panel de ventas", "Simulador de ventas", "Dashboard"], featured: false },
  { name: "Plan Anual", amt: "9,80", feats: ["Acceso panel de ventas", "Simulador de ventas", "Costo por usuario más bajo", "Dashboard"], featured: true, pill: "Mejor precio" },
  { name: "Plan Semestral", amt: "12,50", feats: ["Acceso panel de ventas", "Simulador de ventas", "Dashboard"], featured: false },
];

function Planes() {
  return (
    <section id="planes" className="sec reveal">
      <div className="wrap">
        <div className="sec-head center">
          <span className="kicker-tag">Nuestros Planes</span>
          <h2>Precio por usuario, sin complicaciones</h2>
          <p>Comienza tu prueba gratuita de 15 días. Todos los planes incluyen panel de ventas, simulador y dashboard.</p>
        </div>
        <div className="price-grid">
          {PLANS.map((p) => (
            <div className={`price ${p.featured ? "feat-plan" : ""}`} key={p.name}>
              {p.pill && <span className="pill">{p.pill}</span>}
              <div className="pname">{p.name}</div>
              <div className="pprice"><span className="cur">USD</span><span className="amt">{p.amt}</span></div>
              <div className="pper">mensual por usuario</div>
              <ul className="pfeat">
                {p.feats.map((f) => <li key={f}><IcCheck /> {f}</li>)}
              </ul>
              <a className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`} href="https://app.miforecast.com/registro.html" target="_blank" rel="noopener">Pruébalo gratis</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
function CtaBand() {
  return (
    <section className="cta-band reveal">
      <div className="wrap">
        <div className="cta-box">
          <h2>Prueba nuestro servicio gratuito y lleva tu gestión al siguiente nivel</h2>
          <p>Comienza tu <span className="cta-free">prueba gratuita de 15 días</span>.</p>
          <a className="btn btn-primary btn-lg" href="https://app.miforecast.com/registro.html" target="_blank" rel="noopener">
            Pruébalo gratis <IcArrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contacto ---------- */
function Contacto() {
  const [ok, setOk] = useState(false);
  const submit = (e) => { e.preventDefault(); setOk(true); };
  return (
    <section id="contacto" className="sec reveal">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <span className="kicker-tag">Contáctanos</span>
          <h2 style={{ marginTop: 16 }}>¿Hablamos?</h2>
          <p className="lead">Escríbenos y te responderemos a la brevedad.</p>
          <div className="mailblock">
            <a className="mailcard" href="mailto:ventas@miforecast.com?subject=Información%20sobre%20Ventas">
              <span className="mi"><IcMail /></span>
              <div><div className="lab">Ventas</div><div className="em">ventas@miforecast.com</div></div>
            </a>
            <a className="mailcard" href="mailto:soporte@miforecast.com?subject=Consulta%20cliente">
              <span className="mi"><IcSupport /></span>
              <div><div className="lab">Soporte y consultas de clientes</div><div className="em">soporte@miforecast.com</div></div>
            </a>
          </div>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="row">
            <div className="field"><label>Nombre*</label><input type="text" required placeholder="Tu nombre" /></div>
            <div className="field"><label>Email*</label><input type="email" required placeholder="tu@empresa.com" /></div>
          </div>
          <div className="field"><label>Asunto</label><input type="text" placeholder="Asunto" /></div>
          <div className="field"><label>Mensaje*</label><textarea required placeholder="Cuéntanos en qué te ayudamos" /></div>
          <button className="btn btn-primary" type="submit">Enviar</button>
          <div className={`form-ok ${ok ? "show" : ""}`}>¡Gracias! Te contactaremos pronto.</div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div>
            <Logo />
            <p className="ftr-tag">El propósito de MiForecast.com es ser SIMPLE y EFICAZ. Pronóstico de ventas B2B basado en Solution Selling.</p>
          </div>
          <div className="ftr-nav">
            <div className="ftr-col">
              <h5>Navegación</h5>
              {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
            </div>
            <div className="ftr-col">
              <h5>Contacto</h5>
              <a href="mailto:ventas@miforecast.com">ventas@miforecast.com</a>
              <a href="mailto:soporte@miforecast.com">soporte@miforecast.com</a>
              <a href="https://app.miforecast.com" target="_blank" rel="noopener">Acceso Clientes</a>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} MiForecast.com</span>
          <a href="https://miforecast.com/wp/terminos-y-condiciones-de-uso/" target="_blank" rel="noopener">Términos y Condiciones de Uso</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Hero, LogoStrip, Paradigma, Nosotros, Servicio, DataFunnel, Showcase, Planes, CtaBand, Contacto, Footer });
