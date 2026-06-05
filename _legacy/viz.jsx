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
const IcX       = () => <Icon d="M18 6L6 18M6 6l12 12" sw={2.2} />;

/* ----- Forecast area+line chart (ilustrativo) ----- */
function ForecastChart({ w = 440, h = 120, accent = "#1f6fe5", green = "#2f9e44" }) {
  const real = [0.34, 0.42, 0.38, 0.52, 0.6, 0.57, 0.71];
  const pred = [0.71, 0.79, 0.86, 0.95];
  const padX = 8, padY = 10, iw = w - padX * 2, ih = h - padY * 2;
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
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line key={i} x1={padX} x2={w - padX} y1={Y(g)} y2={Y(g)} stroke="rgba(255,255,255,.05)" />
      ))}
      <path d={areaD} fill="url(#fcArea)" />
      <polyline points={ptsReal.join(" ")} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={ptsPred.join(" ")} fill="none" stroke={green} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={X(offset)} cy={Y(real[real.length-1])} r="3" fill={accent} stroke="#0c1828" strokeWidth="1.5" />
      <circle cx={X(n)} cy={Y(pred[pred.length-1])} r="3.5" fill={green} stroke="#0c1828" strokeWidth="1.5" />
    </svg>
  );
}

/* ----- Pipeline (embudo) — se mantiene para uso interno ----- */
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

/* ----- Tabla de oportunidades rankeadas por IA (formato imagen) ----- */
function OpportunityTable({ accent = "#1f6fe5", green = "#2f9e44" }) {
  const rows = [
    { opp: "Renovación Plataforma", account: "TechSolutions", prob: 84, value: "$135,000" },
    { opp: "Expansión Servicios",   account: "Grupo Industrial", prob: 72, value: "$98,000" },
    { opp: "Implementación CRP",    account: "Logística Andina", prob: 65, value: "$80,000" },
  ];
  const col = (p) => p >= 75 ? green : p >= 60 ? "#f5bd4f" : "#f4655a";
  const cols = "1.7fr 1.1fr 1.6fr 0.9fr";
  const hdStyle = { color: "#3d5570", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: "0 6px", padding: "0 4px 7px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        {["Oportunidad", "Cuenta", "Prob. de cierre", "Valor est."].map(h => (
          <span key={h} style={hdStyle}>{h}</span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: cols, gap: "0 6px", padding: "7px 4px", borderBottom: "1px solid rgba(255,255,255,.04)", alignItems: "center" }}>
          <span style={{ color: "#cdd9e6", fontSize: 10.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.opp}</span>
          <span style={{ color: "#7d8ea3", fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.account}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
              <div style={{ width: `${r.prob}%`, height: "100%", background: col(r.prob), borderRadius: 999 }} />
            </div>
            <span style={{ color: col(r.prob), fontSize: 10, fontWeight: 700, flex: "none", minWidth: 26 }}>{r.prob}%</span>
          </div>
          <span style={{ color: "#cdd9e6", fontSize: 10, fontWeight: 600 }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ----- KPI sidebar: Oportunidades Activas ----- */
function KpiActivas({ green = "#2f9e44" }) {
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: "11px 10px 8px" }}>
      <div style={{ color: "#6a7f98", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Oportunidades Activas</div>
      <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1, marginTop: 3 }}>128</div>
      <div style={{ color: "#5fd07f", fontSize: 9.5, fontWeight: 600, marginTop: 3 }}>▲ +15% vs período anterior</div>
      <svg viewBox="0 0 120 26" width="100%" style={{ display: "block", marginTop: 7 }}>
        <defs>
          <linearGradient id="spkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={green} stopOpacity="0.2" />
            <stop offset="100%" stopColor={green} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,22 L18,19 L36,21 L54,13 L72,9 L90,11 L108,5 L120,3 L120,26 L0,26 Z" fill="url(#spkArea)" />
        <polyline points="0,22 18,19 36,21 54,13 72,9 90,11 108,5 120,3" fill="none" stroke={green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="120" cy="3" r="2.5" fill={green} />
      </svg>
    </div>
  );
}

/* ----- KPI sidebar: Tasa de Cierre ----- */
function KpiCierre({ accent = "#1f6fe5" }) {
  const r = 13, circ = 2 * Math.PI * r;
  const pct = 0.32;
  return (
    <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: "11px 10px" }}>
      <div style={{ color: "#6a7f98", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Tasa de Cierre Estimada</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
        <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1 }}>32%</div>
        <svg viewBox="0 0 36 36" width="36" height="36" style={{ flex: "none" }}>
          <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="3.5" />
          <circle cx="18" cy="18" r={r} fill="none" stroke={accent} strokeWidth="3.5"
            strokeDasharray={`${circ * pct} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)" />
        </svg>
      </div>
      <div style={{ color: "#4d91f5", fontSize: 9.5, fontWeight: 600, marginTop: 4 }}>▲ +6% vs período anterior</div>
    </div>
  );
}

/* ----- Dashboard preview (hero & showcase) ----- */
function DashboardPreview({ float = true, accent = "#1f6fe5", green = "#2f9e44" }) {
  return (
    <div className={`device ${float ? "float" : ""}`}>
      <div className="device-bar">
        <span className="dot3 r" /><span className="dot3 y" /><span className="dot3 g" />
        <span className="addr">app.miforecast.com</span>
      </div>
      <span className="device-tag">Vista ilustrativa</span>
      <div className="dash">

        {/* Fila superior: chart + KPI sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 10, marginBottom: 10 }}>

          {/* Izquierda: métrica + gráfico */}
          <div>
            <div className="dash-metric">
              <div>
                <div className="dash-metric-lbl">Proyección de Ventas</div>
                <div className="dash-metric-val">$2.45M <span className="dash-delta-up">▲ +24%</span></div>
              </div>
              <div className="legend">
                <span><i style={{ background: accent }} />Real</span>
                <span><i style={{ background: green }} />Proyección IA</span>
              </div>
            </div>
            <ForecastChart accent={accent} green={green} h={112} />
          </div>

          {/* Derecha: KPI stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <KpiActivas green={green} />
            <KpiCierre accent={accent} />
          </div>
        </div>

        {/* Tabla de oportunidades */}
        <div className="dash-card">
          <div className="ch-head" style={{ marginBottom: 8 }}>
            <span className="t">Top oportunidades recomendadas por IA</span>
            <span className="ai-badge">IA activa</span>
          </div>
          <OpportunityTable accent={accent} green={green} />
        </div>

      </div>
    </div>
  );
}

Object.assign(window, {
  Icon, IcSpark, IcCheck, IcArrow, IcBolt, IcRoute, IcShield, IcSupport,
  IcGrid, IcGauge, IcLayers, IcMail, IcChart, IcX,
  ForecastChart, PipelineMini, OpportunityTable, DashboardPreview,
});
