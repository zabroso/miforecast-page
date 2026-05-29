/* viz.jsx — Visualizaciones (SVG puro). Datos ILUSTRATIVOS de producto. */
const { useState: useStateV } = React;

/* ----- Icon set (stroke, currentColor) ----- */
const Icon = ({ d, fill, vb = "0 0 24 24", sw = 1.8 }) => (
  <svg viewBox={vb} fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);
const IcSpark   = () => <Icon d="M3 17l5-5 4 3 6-7M21 8V4h-4" />;
const IcCheck   = () => <Icon d="M20 6L9 17l-5-5" sw={2.4} />;
const IcArrow   = () => <Icon d="M5 12h14M13 6l6 6-6 6" />;
const IcBolt    = () => <Icon d={<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />} fill />;
const IcRoute   = () => <Icon d="M5 19a2 2 0 100-4 2 2 0 000 4zM19 9a2 2 0 100-4 2 2 0 000 4zM7 17h6a4 4 0 004-4V8" />;
const IcShield  = () => <Icon d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3z" />;
const IcSupport = () => <Icon d="M4 12a8 8 0 0116 0M4 12v3a2 2 0 002 2h1v-5H5a1 1 0 00-1 1zm16 0v3a2 2 0 01-2 2h-1v-5h2a1 1 0 011 1zM12 20a3 3 0 003-3" />;
const IcGrid    = () => <Icon d="M3 9h18M9 3v18M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" />;
const IcGauge   = () => <Icon d="M12 14l4-4M5 19a9 9 0 1114 0" />;
const IcLayers  = () => <Icon d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />;
const IcMail    = () => <Icon d="M3 7l9 6 9-6M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />;
const IcChart   = () => <Icon d="M4 20V10M10 20V4M16 20v-7M22 20H2" />;

/* ----- Forecast area+line chart (ilustrativo) ----- */
function ForecastChart({ w = 440, h = 150, accent = "#1f6fe5", green = "#2f9e44" }) {
  // relative series 0..1; last 3 points are "predicción" (dashed)
  const real = [0.34, 0.42, 0.38, 0.52, 0.6, 0.57, 0.71];
  const pred = [0.71, 0.79, 0.86, 0.95];
  const padX = 8, padY = 14, iw = w - padX * 2, ih = h - padY * 2;
  const all = [...real, ...pred.slice(1)];
  const n = all.length - 1;
  const X = (i) => padX + (iw * i) / n;
  const Y = (v) => padY + ih * (1 - v);
  const ptsReal = real.map((v, i) => `${X(i)},${Y(v)}`);
  const offset = real.length - 1;
  const ptsPred = pred.map((v, i) => `${X(offset + i)},${Y(v)}`);
  const areaD = `M${X(0)},${Y(real[0])} L${ptsReal.join(" L")} L${X(offset)},${Y(real[real.length-1])} L${X(offset)},${h-padY} L${padX},${h-padY} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="fcArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line key={i} x1={padX} x2={w - padX} y1={Y(g)} y2={Y(g)} stroke="rgba(255,255,255,.06)" />
      ))}
      <path d={areaD} fill="url(#fcArea)" />
      <polyline points={ptsReal.join(" ")} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={ptsPred.join(" ")} fill="none" stroke={green} strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={X(offset)} cy={Y(real[real.length-1])} r="3.5" fill={accent} stroke="#0c1828" strokeWidth="2" />
      <circle cx={X(n)} cy={Y(pred[pred.length-1])} r="4" fill={green} stroke="#0c1828" strokeWidth="2" />
    </svg>
  );
}

/* ----- Pipeline (embudo): Oportunidad → Calificación → Pipeline → Venta ----- */
function PipelineMini({ accent = "#1f6fe5", green = "#2f9e44" }) {
  const stages = [
    { l: "Oportunidad", v: 100 },
    { l: "Calificación", v: 72 },
    { l: "Pipeline", v: 48 },
    { l: "Venta", v: 27 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {stages.map((s, i) => {
        const c = i === stages.length - 1 ? green : accent;
        return (
          <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 78, color: "#9fb0c4", fontSize: 11.5, fontWeight: 500, flex: "none" }}>{s.l}</span>
            <div style={{ flex: 1, height: 22, borderRadius: 6, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
              <div style={{ width: `${s.v}%`, height: "100%", borderRadius: 6,
                background: `linear-gradient(90deg, ${c}, ${c}cc)`, display: "flex", alignItems: "center",
                justifyContent: "flex-end", paddingRight: 8 }}>
                <span style={{ color: "#fff", fontSize: 10.5, fontWeight: 700 }}>{s.v}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ----- Full dashboard preview used in hero & showcase ----- */
function DashboardPreview({ float = true, accent = "#1f6fe5", green = "#2f9e44", variant = "full" }) {
  return (
    <div className={`device ${float ? "float" : ""}`}>
      <div className="device-bar">
        <span className="dot3 r" /><span className="dot3 y" /><span className="dot3 g" />
        <span className="addr">app.miforecast.com</span>
      </div>
      <span className="device-tag">Vista ilustrativa</span>
      <div className="dash">
        <div className="dash-top">
          <div>
            <div className="dash-title">Forecast de ventas</div>
            <div className="dash-sub">Resumen del equipo · ejemplo</div>
          </div>
        </div>
        <div className="kpis">
          <div className="kpi"><div className="lab">Forecast</div><div className="val">$ 312k</div><div className="delta up"><IcSpark />+18%</div></div>
          <div className="kpi"><div className="lab">Meta</div><div className="val">$ 360k</div><div className="delta flat">87% avance</div></div>
          <div className="kpi"><div className="lab">Oportunidades</div><div className="val">41</div><div className="delta up"><IcSpark />+6</div></div>
        </div>
        <div className="dash-card">
          <div className="ch-head">
            <span className="t">Proyección</span>
            <div className="legend">
              <span><i style={{ background: accent }} />Real</span>
              <span><i style={{ background: green }} />Predicción</span>
            </div>
          </div>
          <ForecastChart accent={accent} green={green} />
        </div>
        <div className="dash-card">
          <div className="ch-head"><span className="t">Pipeline · calificación de oportunidades</span></div>
          <PipelineMini accent={accent} green={green} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, IcSpark, IcCheck, IcArrow, IcBolt, IcRoute, IcShield, IcSupport,
  IcGrid, IcGauge, IcLayers, IcMail, IcChart,
  ForecastChart, PipelineMini, DashboardPreview,
});
