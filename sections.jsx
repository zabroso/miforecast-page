/* sections.jsx — Secciones de la landing. Texto = solo contenido real del sitio. */
const { useState, useEffect, useRef } = React;

/* mensajes reales del slider de Inicio */
const HERO_MSGS = [
  "Gestiona tus oportunidades de venta de manera SIMPLE.",
  "Vistas especializadas para vendedores y gerentes.",
  "Dashboard flexibles y personalizados para la toma de decisiones.",
  "Orientado a empresas y startups que hacen B2B.",
  "El propósito de MiForecast.com es ser SIMPLE y EFICAZ.",
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
      <span className="eyebrow">Pronóstico de ventas · B2B</span>
      <h1>Optimiza la gestión de tus oportunidades de venta con <span className="brand-mi">Mi</span><span className="brand-fc">Forecast</span></h1>
      <p className="lede">
        La plataforma está enfocada en la calificación de oportunidades de manera sencilla,
        pero cumpliendo ciertas condiciones que te darán predictibilidad. Si eres vendedor podrás
        predecir tu “forecast” de manera simple. Si eres gerente podrás ver el rendimiento de tu
        equipo de ventas y simular escenarios para llegar a la meta.
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
          <div className="q">“Nuestro propósito es ser SIMPLE y EFICAZ.”</div>
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
  { ic: <IcBolt />, t: "Simplicidad",
    p: "MiForecast.com tiene un solo propósito, hacerlo SIMPLE y EFICAZ, por esto la funcionalidad te permite gestionar tus oportunidades de venta a partir de un método de calificación. Esto hará que tengas un buen pronóstico de ventas." },
  { ic: <IcRoute />, t: "Metodología",
    p: "Está basado en el mecanismo Solution Selling, por lo que las oportunidades pasarán distintas etapas en el pipeline antes de convertirse en una “venta”. La forma de calificar es sencilla, la aprenderás rápidamente con los ejemplos y ayuda que te entregamos." },
  { ic: <IcShield />, t: "Seguridad",
    p: "Opera sobre servidores redundantes y con respaldo permanente, para que tus datos estén siempre disponibles y seguros. Para el pago de tu membresía contamos con uno de los líderes en Latinoamérica en mecanismos de pago." },
  { ic: <IcSupport />, t: "Soporte",
    p: "Para todos los suscriptores tenemos videos y guías de uso para aprovechar el servicio al 100%, y para nuestros suscriptores anuales hay soporte remoto vía Zoom brindado por nuestros expertos." },
];

function Servicio() {
  return (
    <section id="servicio" className="sec reveal">
      <div className="wrap">
        <div className="sec-head center">
          <span className="kicker-tag">Nuestro Servicio</span>
          <h2>Experiencia, tecnología y metodología en una sola plataforma</h2>
          <p>
            <span className="brand-mi">Mi</span><span className="brand-fc">Forecast</span>.com combina metodologías de gestión
            de ventas consolidadas mundialmente —embudo de ventas y Solution Selling— para que realices un buen
            pronóstico, sin importar si eres vendedor o gerente, ingresando sólo los datos necesarios. La “grilla de
            oportunidades” está optimizada para requerir el menor tiempo en ingreso de datos.
          </p>
        </div>
        <div className="feat-grid">
          {PILLARS.map((f) => (
            <div className="feat" key={f.t}>
              <div className="ic">{f.ic}</div>
              <h3>{f.t}</h3>
              <p>{f.p}</p>
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

Object.assign(window, { Header, Hero, Nosotros, Servicio, Showcase, Planes, CtaBand, Contacto, Footer });
