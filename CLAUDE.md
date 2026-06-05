# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for MiForecast.com — a B2B sales forecasting SaaS. No build toolchain, no package manager.

## Running the project

Open `index.html` directly in a browser, or serve it with any static file server:

```sh
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

**No module system.** React 18, ReactDOM, and Babel are loaded from CDN in `index.html`. JSX is transpiled in-browser. All components are exported via `Object.assign(window, {...})` at the bottom of each file, making them available as globals.

**File load order is strict** (declared in `index.html` in this exact sequence):

1. `tweaks-panel.jsx` — exports `useTweaks`, `TweaksPanel`, and all `Tweak*` controls
2. `viz.jsx` — exports icons (`IcBolt`, `IcCheck`, etc.) and data viz components (`ForecastChart`, `PipelineMini`, `DashboardPreview`)
3. `sections.jsx` — exports all page sections (`Header`, `Hero`, `Nosotros`, `Servicio`, `Showcase`, `Planes`, `CtaBand`, `Contacto`, `Footer`); depends on `viz.jsx` globals
4. `app.jsx` — root `App` component; consumes everything; calls `ReactDOM.createRoot`

**CSS variables for theming.** `app.jsx` drives `--accent`, `--accent-soft`, `--accent-ring`, and `--font-head` on `:root` from tweak state. All theme-dependent styles in `styles.css` reference these variables.

**`TWEAK_DEFAULTS` sentinel block.** The literal `/*EDITMODE-BEGIN*/…/*EDITMODE-END*/` markers in `app.jsx` are a protocol: the host editor (an iframe wrapper) can rewrite the JSON between those markers on disk. Do not remove or rename them.

**Tweaks persistence protocol.** `useTweaks` (in `tweaks-panel.jsx`) communicates with a parent frame via `postMessage` types `__edit_mode_available`, `__activate_edit_mode`, `__deactivate_edit_mode`, `__edit_mode_set_keys`, and `__edit_mode_dismissed`. The panel is only visible when the host activates it — it hides itself on a cold load.

**Scroll reveal.** The `useReveal` hook in `app.jsx` uses `IntersectionObserver` to add the `.in` class to any element with `.reveal` when it enters the viewport. Sections that need fade-in must carry `className="... reveal"`.

**Hero variants.** The `Hero` component accepts `variant` ∈ `["split", "centered", "focus"]`. `split`/`centered` render copy-then-visual; `focus` reverses to visual-then-copy.
