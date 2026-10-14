import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
const I = {
  phone: "\u{1F4DE}",
  messages: "\u{1F4AC}",
  camera: "\u{1F4F7}",
  photos: "\u{1F5BC}\uFE0F",
  store: "\u{1F6CD}\uFE0F",
  tube: "\u25B6\uFE0F",
  calc: "\u{1F9EE}",
  clock: "\u{1F550}",
  notes: "\u{1F4DD}",
  music: "\u{1F3B5}",
  maps: "\u{1F5FA}\uFE0F",
  weather: "\u26C5",
  mail: "\u2709\uFE0F",
  browser: "\u{1F310}"
};
const now = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function App() {
  const [locked, setLocked] = useState(true);
  const [screen, setScreen] = useState("home");
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(["phone", "messages", "camera", "photos", "calc", "clock", "notes", "store", "tube", "games", "assistant", "settings"]);
  const [wallpaper, setWallpaper] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [notif, setNotif] = useState(null);
  const [time, setTime] = useState(now());
  const [secondFlash, setSecondFlash] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setTime(now());
      setSecondFlash((s) => s + 1);
    }, 1e3);
    return () => clearInterval(t);
  }, []);
  const open = (id) => {
    setApp(id);
    setScreen("app");
  };
  const goHome = () => setScreen("home");
  const allApps = APPS.filter((a) => installed.includes(a.id));
  const currentApp = APPS.find((a) => a.id === app);
  const notify = (icon, title, body) => {
    setNotif({ icon, title, body });
    setTimeout(() => setNotif(null), 3200);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#0a0614] relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 right-10 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-white/40 text-xs tracking-widest uppercase font-semibold", children: "Smartphone Simulator Pro" }),
    /* @__PURE__ */ jsx("div", { className: "phone-frame relative rounded-[3.4rem] p-[3px] bg-gradient-to-b from-slate-500 via-slate-800 to-slate-600 shadow-[0_0_60px_-10px_rgba(147,51,234,0.6)]", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full rounded-[3.2rem] border-[10px] border-[#1a1a1f] bg-black overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-[13px] top-24 w-[3px] h-16 bg-slate-700 rounded-r" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -right-[13px] top-44 w-[3px] h-8 bg-slate-700 rounded-r" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -left-[13px] top-32 w-[3px] h-10 bg-slate-700 rounded-l" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-0 inset-x-0 z-[60] flex justify-between items-center px-8 pt-3.5 text-white text-xs font-semibold pointer-events-none", children: [
        /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: time }),
        /* @__PURE__ */ jsxs("span", { className: "flex gap-1.5 items-center text-[10px]", children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F4F6}" }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F4F6}" }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F50B}" }),
          /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: "83%" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-[26px] bg-black rounded-full z-[70] border border-white/5 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-slate-800 ring-1 ring-slate-700" }) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: notif && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { y: -80, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -80, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 25 },
          className: "absolute top-12 left-3 right-3 z-[65] rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-3 flex items-center gap-3 shadow-xl cursor-pointer",
          onClick: () => setNotif(null),
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: notif.icon }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white", children: notif.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-white/60 truncate", children: notif.body })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pt-12 overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: locked ? /* @__PURE__ */ jsx(
        motion.div,
        {
          exit: { y: -100, opacity: 0 },
          className: "h-full",
          children: /* @__PURE__ */ jsx(LockScreen, { time, onUnlock: () => setLocked(false) })
        },
        "lock"
      ) : screen === "home" ? /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.92, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.92, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 28 },
          className: "h-full",
          children: /* @__PURE__ */ jsx(HomeScreen, { apps: allApps, onOpen: open, wallpaper })
        },
        "home"
      ) : /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.7, opacity: 0, y: 60 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.85, opacity: 0, y: 30 },
          transition: { type: "spring", stiffness: 260, damping: 26 },
          className: "h-full",
          children: /* @__PURE__ */ jsx(
            AppScreen,
            {
              id: app,
              onHome: goHome,
              installed,
              setInstalled,
              gallery,
              setGallery,
              videos,
              setVideos,
              notify,
              secondFlash,
              wallpaper,
              setWallpaper,
              openApp: open
            }
          )
        },
        app
      ) }) }),
      !locked && /* @__PURE__ */ jsx(
        motion.button,
        {
          onClick: goHome,
          whileTap: { scale: 0.85 },
          className: "absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-[5px] bg-white/80 rounded-full z-[60] shadow",
          "aria-label": "home"
        }
      )
    ] }) })
  ] });
}
function LockScreen({ time, onUnlock }) {
  const date = (/* @__PURE__ */ new Date()).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center relative bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#0c0a1f] overflow-hidden", children: [
    Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute rounded-full bg-white/40",
        style: { left: `${i * 37 % 100}%`, top: `${i * 53 % 80}%`, width: 2, height: 2, opacity: 0.2 + i % 5 * 0.12 }
      },
      i
    )),
    /* @__PURE__ */ jsx("div", { className: "absolute top-24 right-14 w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 shadow-[0_0_40px_rgba(255,255,255,0.4)]" }),
    /* @__PURE__ */ jsxs("div", { className: "pt-16 text-center text-white", children: [
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { y: -10, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          className: "text-[76px] font-extralight leading-none tabular-nums tracking-tight",
          children: time
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60 mt-2", children: date })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-2 w-full px-4", children: [["\u{1F4AC}", "Messages", "Mom \u2764\uFE0F: Coming home soon?"], ["\u2709\uFE0F", "Mail", "Vibe Team: Welcome to Mail!"]].map(([ic, t, b], i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { x: -60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { delay: 0.2 + i * 0.15 },
        className: "flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: ic }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold", children: t }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-white/60 truncate", children: b })
          ] })
        ]
      },
      t
    )) }),
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: onUnlock,
        whileTap: { scale: 0.9 },
        animate: { y: [0, -8, 0] },
        transition: { repeat: Infinity, duration: 2 },
        className: "mt-auto mb-10 px-8 py-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold",
        children: "\u21E1 Swipe up to unlock"
      }
    )
  ] });
}
const WALLPAPERS = [
  { name: "Nebula", css: "linear-gradient(135deg,#141428,#2a1a4a,#0c0a1f)", blob: ["rgba(147,51,234,0.4)", "rgba(37,99,235,0.3)", "rgba(219,39,119,0.25)"] },
  { name: "Sunset", css: "linear-gradient(135deg,#7c2d12,#9a3412,#1c1917)", blob: ["rgba(249,115,22,0.4)", "rgba(234,88,12,0.3)", "rgba(239,68,68,0.25)"] },
  { name: "Ocean", css: "linear-gradient(135deg,#0c4a6e,#075985,#082f49)", blob: ["rgba(56,189,248,0.4)", "rgba(14,165,233,0.3)", "rgba(6,182,212,0.25)"] },
  { name: "Forest", css: "linear-gradient(135deg,#14532d,#166534,#052e16)", blob: ["rgba(74,222,128,0.35)", "rgba(34,197,94,0.3)", "rgba(16,185,129,0.25)"] },
  { name: "Mono", css: "linear-gradient(135deg,#1f2937,#374151,#111827)", blob: ["rgba(148,163,184,0.25)", "rgba(100,116,139,0.25)", "rgba(203,213,225,0.15)"] },
  { name: "Candy", css: "linear-gradient(135deg,#831843,#9d174d,#500724)", blob: ["rgba(244,114,182,0.4)", "rgba(251,146,60,0.3)", "rgba(168,85,247,0.25)"] }
];
function HomeScreen({ apps, onOpen, wallpaper }) {
  const [page, setPage] = useState(0);
  const perPage = 16;
  const pages = Math.ceil(apps.length / perPage) || 1;
  const pageApps = apps.slice(page * perPage, (page + 1) * perPage);
  const dock = ["phone", "messages", "camera", "store"].filter((id) => apps.some((a) => a.id === id));
  const wp = WALLPAPERS[wallpaper] || WALLPAPERS[0];
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col relative overflow-hidden", style: { background: wp.css }, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl", style: { background: wp.blob[0] } }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -left-24 w-72 h-72 rounded-full blur-3xl", style: { background: wp.blob[1] } }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 right-10 w-72 h-72 rounded-full blur-3xl", style: { background: wp.blob[2] } }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 px-6 pt-6 relative", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
        className: "grid grid-cols-4 gap-x-5 gap-y-7",
        children: pageApps.map((a, i) => /* @__PURE__ */ jsxs(
          motion.button,
          {
            onClick: () => onOpen(a.id),
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { delay: i * 0.03, type: "spring", stiffness: 300 },
            whileTap: { scale: 0.82 },
            className: "flex flex-col items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-[60px] h-[60px] rounded-[1.35rem] flex items-center justify-center text-[28px] shadow-lg shadow-black/40 ring-1 ring-white/20",
                  style: { background: a.bg },
                  children: a.icon
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/90 font-medium drop-shadow", children: a.name })
            ]
          },
          a.id
        ))
      },
      page
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 pb-4 relative", children: Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => setPage(i),
        whileTap: { scale: 1.5 },
        className: `h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-white" : "w-1.5 bg-white/30"}`
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mx-4 mb-10 px-4 py-3.5 rounded-[2.2rem] bg-white/10 backdrop-blur-2xl border border-white/15 flex justify-around shadow-xl", children: dock.map((id) => {
      const a = apps.find((x) => x.id === id);
      return /* @__PURE__ */ jsx(
        motion.button,
        {
          onClick: () => onOpen(id),
          whileTap: { scale: 0.8 },
          className: "w-[54px] h-[54px] rounded-[1.3rem] flex items-center justify-center text-2xl shadow-lg shadow-black/30 ring-1 ring-white/20",
          style: { background: a.bg },
          children: a.icon
        },
        id
      );
    }) })
  ] });
}
function AppScreen({ id, installed, setInstalled, gallery, setGallery, videos, setVideos, notify, secondFlash, wallpaper, setWallpaper, openApp }) {
  switch (id) {
    case "calc":
      return /* @__PURE__ */ jsx(Calculator, {});
    case "store":
      return /* @__PURE__ */ jsx(AppStore, { installed, setInstalled, notify, openApp });
    case "tube":
      return /* @__PURE__ */ jsx(TubeApp, { videos, setVideos, notify });
    case "photos":
      return /* @__PURE__ */ jsx(Gallery, { gallery, setGallery });
    case "phone":
      return /* @__PURE__ */ jsx(PhoneApp, {});
    case "messages":
      return /* @__PURE__ */ jsx(MessagesApp, { notify });
    case "camera":
      return /* @__PURE__ */ jsx(CameraApp, { setGallery, notify });
    case "clock":
      return /* @__PURE__ */ jsx(ClockApp, { secondFlash });
    case "notes":
      return /* @__PURE__ */ jsx(NotesApp, {});
    case "music":
      return /* @__PURE__ */ jsx(MusicApp, {});
    case "weather":
      return /* @__PURE__ */ jsx(WeatherApp, {});
    case "maps":
      return /* @__PURE__ */ jsx(MapsApp, {});
    case "mail":
      return /* @__PURE__ */ jsx(MailApp, { notify });
    case "browser":
      return /* @__PURE__ */ jsx(BrowserApp, {});
    case "games":
      return /* @__PURE__ */ jsx(GamesApp, {});
    case "assistant":
      return /* @__PURE__ */ jsx(AssistantApp, { openApp, notify });
    case "settings":
      return /* @__PURE__ */ jsx(SettingsApp, { installed, setInstalled, wallpaper, setWallpaper, notify });
    default:
      return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center gap-3 bg-slate-950 text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl", children: APPS.find((a) => a.id === id)?.icon }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: APPS.find((a) => a.id === id)?.name })
      ] });
  }
}
const APPS = [
  { id: "phone", name: "Phone", icon: I.phone, bg: "linear-gradient(135deg,#34d399,#059669)" },
  { id: "messages", name: "Messages", icon: I.messages, bg: "linear-gradient(135deg,#60a5fa,#2563eb)" },
  { id: "camera", name: "Camera", icon: I.camera, bg: "linear-gradient(135deg,#94a3b8,#475569)" },
  { id: "photos", name: "Gallery", icon: I.photos, bg: "linear-gradient(135deg,#fbbf24,#f472b6)" },
  { id: "calc", name: "Calculator", icon: I.calc, bg: "linear-gradient(135deg,#fb923c,#ea580c)" },
  { id: "clock", name: "Clock", icon: I.clock, bg: "linear-gradient(135deg,#334155,#0f172a)" },
  { id: "notes", name: "Notes", icon: I.notes, bg: "linear-gradient(135deg,#fde047,#f59e0b)" },
  { id: "store", name: "App Store", icon: I.store, bg: "linear-gradient(135deg,#38bdf8,#0284c7)" },
  { id: "tube", name: "TubeVideo", icon: I.tube, bg: "linear-gradient(135deg,#ef4444,#b91c1c)" },
  { id: "maps", name: "Maps", icon: I.maps, bg: "linear-gradient(135deg,#86efac,#22c55e)" },
  { id: "weather", name: "Weather", icon: I.weather, bg: "linear-gradient(135deg,#60a5fa,#1d4ed8)" },
  { id: "music", name: "Music", icon: I.music, bg: "linear-gradient(135deg,#f472b6,#db2777)" },
  { id: "mail", name: "Mail", icon: I.mail, bg: "linear-gradient(135deg,#fca5a5,#dc2626)" },
  { id: "browser", name: "Browser", icon: I.browser, bg: "linear-gradient(135deg,#a5b4fc,#4f46e5)" },
  { id: "games", name: "Arcade", icon: "\u{1F579}\uFE0F", bg: "linear-gradient(135deg,#7c3aed,#4c1d95)" },
  { id: "assistant", name: "Vibe AI", icon: "\u2728", bg: "linear-gradient(135deg,#2dd4bf,#0e7490)" },
  { id: "settings", name: "Settings", icon: "\u2699\uFE0F", bg: "linear-gradient(135deg,#94a3b8,#475569)" }
];
const Header = ({ icon, title, right, accent = "text-white" }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 pt-3 pb-3 sticky top-0 z-10 backdrop-blur-xl bg-slate-950/70 border-b border-white/5", children: [
  /* @__PURE__ */ jsxs("h1", { className: `text-xl font-bold flex items-center gap-2 ${accent}`, children: [
    icon,
    " ",
    title
  ] }),
  right
] });
function Calculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true);
  const [history, setHistory] = useState([]);
  const inputDigit = (d) => {
    if (fresh) {
      setDisplay(d);
      setFresh(false);
    } else setDisplay(display === "0" ? d : display.length < 12 ? display + d : display);
  };
  const compute = (a, b, o) => ({ "+": a + b, "\u2212": a - b, "\xD7": a * b, "\xF7": b === 0 ? NaN : a / b })[o];
  const setOperation = (o) => {
    const cur = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const r = compute(acc, cur, op);
      setAcc(r);
      setDisplay(String(+r.toFixed(10)));
    } else setAcc(cur);
    setOp(o);
    setFresh(true);
  };
  const equals = () => {
    if (acc === null || !op) return;
    const cur = parseFloat(display);
    const r = compute(acc, cur, op);
    setHistory((h) => [{ expr: `${acc} ${op} ${cur}`, res: +r.toFixed(10) }, ...h].slice(0, 5));
    setDisplay(String(+r.toFixed(10)));
    setAcc(null);
    setOp(null);
    setFresh(true);
  };
  const clear = () => {
    setDisplay("0");
    setAcc(null);
    setOp(null);
    setFresh(true);
  };
  const Btn = ({ label, onClick, cls = "", span }) => /* @__PURE__ */ jsx(
    motion.button,
    {
      onClick,
      whileTap: { scale: 0.88 },
      className: `h-16 rounded-full text-xl font-medium shadow-lg ${span ? "col-span-2" : ""} ${cls}`,
      children: label
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-slate-950 to-black text-white flex flex-col p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col justify-end items-end gap-1.5 pb-4 overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { children: history.map((h, i) => /* @__PURE__ */ jsxs(
      motion.p,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1 - i * 0.18, y: 0 },
        className: "text-white/40 text-sm tabular-nums",
        children: [
          h.expr,
          " = ",
          h.res
        ]
      },
      i
    )) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "text-right text-[64px] font-thin truncate px-2 pb-6 tabular-nums leading-none",
        children: display
      },
      display
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-3 pb-12", children: [
      /* @__PURE__ */ jsx(Btn, { label: "AC", onClick: clear, cls: "bg-slate-600 text-white" }),
      /* @__PURE__ */ jsx(Btn, { label: "\xB1", onClick: () => setDisplay(String(-parseFloat(display))), cls: "bg-slate-600 text-white" }),
      /* @__PURE__ */ jsx(Btn, { label: "%", onClick: () => setDisplay(String(parseFloat(display) / 100)), cls: "bg-slate-600 text-white" }),
      /* @__PURE__ */ jsx(Btn, { label: "\xF7", onClick: () => setOperation("\xF7"), cls: op === "\xF7" ? "bg-white text-orange-600 font-bold" : "bg-orange-600" }),
      ["7", "8", "9"].map((d) => /* @__PURE__ */ jsx(Btn, { label: d, onClick: () => inputDigit(d), cls: "bg-slate-800 ring-1 ring-white/5" }, d)),
      /* @__PURE__ */ jsx(Btn, { label: "\xD7", onClick: () => setOperation("\xD7"), cls: op === "\xD7" ? "bg-white text-orange-600 font-bold" : "bg-orange-600" }),
      ["4", "5", "6"].map((d) => /* @__PURE__ */ jsx(Btn, { label: d, onClick: () => inputDigit(d), cls: "bg-slate-800 ring-1 ring-white/5" }, d)),
      /* @__PURE__ */ jsx(Btn, { label: "\u2212", onClick: () => setOperation("\u2212"), cls: op === "\u2212" ? "bg-white text-orange-600 font-bold" : "bg-orange-600" }),
      ["1", "2", "3"].map((d) => /* @__PURE__ */ jsx(Btn, { label: d, onClick: () => inputDigit(d), cls: "bg-slate-800 ring-1 ring-white/5" }, d)),
      /* @__PURE__ */ jsx(Btn, { label: "+", onClick: () => setOperation("+"), cls: op === "+" ? "bg-white text-orange-600 font-bold" : "bg-orange-600" }),
      /* @__PURE__ */ jsx(Btn, { label: "0", onClick: () => inputDigit("0"), cls: "bg-slate-800 ring-1 ring-white/5", span: true }),
      /* @__PURE__ */ jsx(Btn, { label: ".", onClick: () => {
        if (!display.includes(".")) {
          setDisplay(display + ".");
          setFresh(false);
        }
      }, cls: "bg-slate-800 ring-1 ring-white/5" }),
      /* @__PURE__ */ jsx(Btn, { label: "=", onClick: equals, cls: "bg-gradient-to-br from-orange-500 to-amber-600" })
    ] })
  ] });
}
const STORE_APPS = [
  { id: "tube", name: "TubeVideo", dev: "VibeSoft", rating: 4.7, size: "42 MB", cat: "Social", icon: I.tube, bg: "linear-gradient(135deg,#ef4444,#b91c1c)", desc: "Watch, upload and share videos with the world." },
  { id: "maps", name: "Maps", dev: "VibeSoft", rating: 4.5, size: "68 MB", cat: "Navigation", icon: I.maps, bg: "linear-gradient(135deg,#86efac,#22c55e)", desc: "Find your way anywhere on Earth." },
  { id: "weather", name: "Weather", dev: "VibeSoft", rating: 4.3, size: "12 MB", cat: "Utilities", icon: I.weather, bg: "linear-gradient(135deg,#60a5fa,#1d4ed8)", desc: "Beautiful forecasts with live conditions." },
  { id: "music", name: "Music", dev: "VibeSoft", rating: 4.8, size: "35 MB", cat: "Entertainment", icon: I.music, bg: "linear-gradient(135deg,#f472b6,#db2777)", desc: "Stream millions of songs ad-free." },
  { id: "mail", name: "Mail", dev: "VibeSoft", rating: 4.1, size: "20 MB", cat: "Productivity", icon: I.mail, bg: "linear-gradient(135deg,#fca5a5,#dc2626)", desc: "Fast, clean email for everyone." },
  { id: "browser", name: "Browser", dev: "VibeSoft", rating: 4.4, size: "28 MB", cat: "Utilities", icon: I.browser, bg: "linear-gradient(135deg,#a5b4fc,#4f46e5)", desc: "Private browsing with lightning speed." },
  { id: "games", name: "Arcade", dev: "VibeSoft", rating: 4.9, size: "55 MB", cat: "Entertainment", icon: "\u{1F579}\uFE0F", bg: "linear-gradient(135deg,#7c3aed,#4c1d95)", desc: "Snake, Memory & Tic-Tac-Toe in one pack!" }
];
function AppStore({ installed, setInstalled, notify, openApp }) {
  const [tab, setTab] = useState("featured");
  const [installing, setInstalling] = useState({});
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const install = (a) => {
    if (installed.includes(a.id) || installing[a.id]) return;
    setInstalling((s) => ({ ...s, [a.id]: true }));
    setTimeout(() => {
      setInstalled((prev) => prev.includes(a.id) ? prev : [...prev, a.id]);
      setInstalling((s) => {
        const n = { ...s };
        delete n[a.id];
        return n;
      });
      notify("\u{1F6CD}\uFE0F", "App installed", `${a.name} is now on your home screen!`);
    }, 1800);
  };
  const list = STORE_APPS.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
  const InstallBtn = ({ a }) => {
    if (installed.includes(a.id)) return /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: (event) => {
      event.stopPropagation();
      openApp(a.id);
    }, className: "px-5 py-1.5 rounded-full bg-white/10 text-blue-300 text-xs font-bold", children: "Open" });
    if (installing[a.id]) return /* @__PURE__ */ jsx("div", { className: "w-20 flex justify-center", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: { rotate: 360 },
        transition: { repeat: Infinity, duration: 1, ease: "linear" },
        className: "w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent"
      }
    ) });
    return /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.9 },
        onClick: (event) => {
          event.stopPropagation();
          install(a);
        },
        className: "px-5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/40",
        children: "Get"
      }
    );
  };
  if (detail) {
    const a = detail;
    return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-16", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setDetail(null), className: "px-5 pt-4 text-blue-400 text-lg", children: "\u2039" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0.6, rotate: -10 },
            animate: { scale: 1, rotate: 0 },
            className: "w-24 h-24 rounded-[1.8rem] flex items-center justify-center text-5xl shadow-2xl ring-1 ring-white/20",
            style: { background: a.bg },
            children: a.icon
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: a.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-white/50", children: a.dev }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/40 mt-1", children: [
            "\u2605 ",
            a.rating,
            " \xB7 ",
            a.size
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-5", children: /* @__PURE__ */ jsx(InstallBtn, { a }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 px-5 mt-5 leading-relaxed", children: a.desc }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 px-5 mt-6", children: [["Ratings", `${a.rating} \u2605`], ["Age", "4+"], ["Category", a.cat]].map(([l, v]) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 ring-1 ring-white/10 rounded-2xl p-3 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/40 uppercase tracking-wide", children: l }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mt-1", children: v })
      ] }, l)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 px-5 space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase text-white/40 font-bold", children: "What people say" }),
        [["\u2B50\u2B50\u2B50\u2B50\u2B50", "Best app ever, super smooth!"], ["\u2B50\u2B50\u2B50\u2B50", "Really nice, love the design."]].map(([s, r]) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-3 ring-1 ring-white/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs", children: s }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/60 mt-1", children: r })
        ] }, r))
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-3 pb-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold pb-3 bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent", children: "App Store" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "\u{1F50D}  Search apps\u2026",
          className: "w-full px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 placeholder-white/40 outline-none text-sm focus:ring-blue-500 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-6 px-5 text-sm border-b border-white/10", children: ["featured", "categories"].map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setTab(t),
        className: `pb-2 capitalize font-semibold ${tab === t ? "text-blue-400 border-b-2 border-blue-400" : "text-white/40"}`,
        children: t
      },
      t
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar px-4 py-2 pb-16", children: tab === "featured" ? list.map((a) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        className: "w-full flex items-center gap-3 py-3.5 border-b border-white/5",
        children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setDetail(a), className: "flex flex-1 min-w-0 items-center gap-3 text-left", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ring-1 ring-white/20",
                style: { background: a.bg },
                children: a.icon
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: a.name }),
              /* @__PURE__ */ jsx("p", { className: "text-white/50 text-xs truncate", children: a.desc }),
              /* @__PURE__ */ jsxs("p", { className: "text-white/40 text-[10px] mt-0.5", children: [
                "\u2605 ",
                a.rating,
                " \xB7 ",
                a.size
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(InstallBtn, { a })
        ]
      },
      a.id
    )) : ["Social", "Navigation", "Utilities", "Entertainment", "Productivity"].map((c) => /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white/50 uppercase tracking-wider mb-2", children: c }),
      list.filter((a) => a.cat === c).map((a) => /* @__PURE__ */ jsxs("div", { onClick: () => setDetail(a), className: "flex items-center gap-3 py-2.5 cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-11 h-11 rounded-xl flex items-center justify-center text-lg shadow ring-1 ring-white/20",
            style: { background: a.bg },
            children: a.icon
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm", children: a.name }),
        /* @__PURE__ */ jsx(InstallBtn, { a })
      ] }, a.id))
    ] }, c)) })
  ] });
}
function TubeApp({ videos, setVideos, notify }) {
  const [view, setView] = useState("feed");
  const [current, setCurrent] = useState(null);
  const [likes, setLikes] = useState({});
  const addVideo = (v) => {
    setVideos((prev) => [{ ...v, views: 0, date: "Just now" }, ...prev]);
    setView("feed");
    notify("\u25B6\uFE0F", "Video published", `"${v.title}" is now live!`);
  };
  const watch = (v) => {
    setCurrent(v);
    setView("watch");
    setVideos((prev) => prev.map((x) => x.id === v.id ? { ...x, views: x.views + 1 } : x));
  };
  const like = (id) => setLikes((l) => ({ ...l, [id]: (l[id] || 0) + 1 }));
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    view === "feed" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 pt-3 pb-3 sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-white/5", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-xl font-extrabold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-sm shadow-lg", children: "\u25B6" }),
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent", children: "TubeVideo" })
        ] }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.9 },
            onClick: () => setView("upload"),
            className: "px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-lg shadow-red-600/40",
            children: "+ Upload"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: videos.length === 0 ? /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "pt-28 text-center px-10 text-white/40", children: [
        /* @__PURE__ */ jsx("p", { className: "text-6xl mb-4", children: "\u{1F3AC}" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-white/80 text-lg", children: "No videos yet" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2", children: [
          "Tap ",
          /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold", children: "+ Upload" }),
          " to post your first video!"
        ] })
      ] }) : videos.map((v, i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          onClick: () => watch(v),
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          className: "block w-full text-left active:scale-[0.98] transition",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative bg-slate-900 aspect-video overflow-hidden", children: [
              /* @__PURE__ */ jsx("video", { src: v.url, className: "w-full h-full object-cover", muted: true, preload: "metadata" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" }),
              /* @__PURE__ */ jsxs("span", { className: "absolute bottom-2 right-2 bg-black/70 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold", children: [
                "\u25B6 ",
                v.views
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 p-3.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow", children: v.channel[0] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm leading-tight line-clamp-2", children: v.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/40 mt-1", children: [
                  v.channel,
                  " \xB7 ",
                  v.views,
                  " views \xB7 ",
                  v.date
                ] })
              ] })
            ] })
          ]
        },
        v.id
      )) })
    ] }),
    view === "upload" && /* @__PURE__ */ jsx(TubeUpload, { onUpload: addVideo, onCancel: () => setView("feed") }),
    view === "watch" && current && /* @__PURE__ */ jsx(WatchView, { video: videos.find((v) => v.id === current.id) || current, onBack: () => setView("feed"), like, likes })
  ] });
}
function TubeUpload({ onUpload, onCancel }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("My Channel");
  const [desc, setDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const pick = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile({ file: f, url: URL.createObjectURL(f), name: f.name });
  };
  const submit = () => {
    if (!file || !title.trim()) return;
    setUploading(true);
    setTimeout(() => onUpload({
      id: Date.now(),
      title: title.trim(),
      channel: channel.trim() || "My Channel",
      desc: desc.trim(),
      url: file.url
    }), 1200);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar p-5 pb-16 text-white bg-slate-950", children: [
    /* @__PURE__ */ jsx("button", { onClick: onCancel, className: "text-sm text-white/50 mb-5", children: "\u2039 Back" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold mb-5", children: "Upload a video" }),
    /* @__PURE__ */ jsxs("label", { className: "block border-2 border-dashed border-white/20 rounded-3xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition mb-5 bg-white/5", children: [
      file ? /* @__PURE__ */ jsx("video", { src: file.url, className: "w-full h-full object-cover rounded-3xl", controls: true }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(motion.span, { animate: { y: [0, -6, 0] }, transition: { repeat: Infinity, duration: 2 }, className: "text-5xl mb-2", children: "\u{1F4FC}" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-white/50", children: "Tap to select a video" })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "file", accept: "video/*", onChange: pick, className: "hidden" })
    ] }),
    ["Title (required)", "Channel name"].map((ph, i) => /* @__PURE__ */ jsx(
      "input",
      {
        value: i === 0 ? title : channel,
        onChange: (e) => i === 0 ? setTitle(e.target.value) : setChannel(e.target.value),
        placeholder: ph,
        className: "w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm mb-3 outline-none focus:ring-red-500 transition placeholder-white/30"
      },
      ph
    )),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value: desc,
        onChange: (e) => setDesc(e.target.value),
        placeholder: "Description",
        rows: 3,
        className: "w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm mb-5 outline-none focus:ring-red-500 transition resize-none placeholder-white/30"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.97 },
        onClick: submit,
        disabled: !file || !title.trim() || uploading,
        className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold disabled:opacity-40 shadow-lg shadow-red-600/40",
        children: uploading ? "Uploading\u2026" : "\u{1F680} Publish Video"
      }
    )
  ] });
}
function WatchView({ video, onBack, like, likes }) {
  const [subscribed, setSubscribed] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16 bg-slate-950 text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-black aspect-video", children: /* @__PURE__ */ jsx("video", { src: video.url, className: "w-full h-full", controls: true, autoPlay: true }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-base leading-snug", children: video.title }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/40 mt-1", children: [
        video.views,
        " views \xB7 ",
        video.date
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-4", children: [["\u{1F44D}", `${likes[video.id] || 0}`, () => like(video.id)], ["\u{1F44E}", "", null], ["\u2197", "Share", null], ["\u{1F4AC}", "12", null]].map(([ic, txt, fn], i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.9 },
          onClick: fn,
          className: "flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-xs font-semibold",
          children: [
            ic,
            " ",
            txt
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-4 pt-4 border-t border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold shadow", children: video.channel[0] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: video.channel }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40", children: "1.2K subscribers" })
        ] }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.9 },
            onClick: () => setSubscribed((s) => !s),
            className: `px-4 py-2 rounded-full text-xs font-bold transition ${subscribed ? "bg-white/10 text-white/60" : "bg-white text-black"}`,
            children: subscribed ? "\u2713 Subscribed" : "Subscribe"
          }
        )
      ] }),
      video.desc && /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60 mt-4 p-3 rounded-2xl bg-white/5 ring-1 ring-white/10", children: video.desc }),
      /* @__PURE__ */ jsx("button", { onClick: onBack, className: "mt-6 text-sm text-red-400 font-semibold", children: "\u2039 Back to feed" })
    ] })
  ] });
}
function Gallery({ gallery, setGallery }) {
  const [view, setView] = useState("grid");
  const [current, setCurrent] = useState(null);
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState("all");
  const pick = (e) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map((f) => ({
      id: Date.now() + Math.random(),
      type: f.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(f),
      name: f.name
    }));
    setGallery((prev) => [...newItems, ...prev]);
  };
  const shown = tab === "all" ? gallery : gallery.filter((i) => i.type === (tab === "photos" ? "image" : "video"));
  const cur = shown[idx] || current;
  return /* @__PURE__ */ jsx("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: view === "grid" ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 pt-3 pb-3 border-b border-white/5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-extrabold bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent", children: "\u{1F5BC} Gallery" }),
      /* @__PURE__ */ jsxs("label", { className: "px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-black text-xs font-bold cursor-pointer shadow-lg shadow-pink-500/30", children: [
        "+ Add",
        /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,video/*", multiple: true, onChange: pick, className: "hidden" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-5 px-5 text-xs pb-3", children: ["all", "photos", "videos"].map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setTab(t),
        className: `pb-1.5 capitalize font-semibold ${tab === t ? "text-pink-400 border-b-2 border-pink-400" : "text-white/40"}`,
        children: t
      },
      t
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar p-1 pb-16", children: shown.length === 0 ? /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "pt-28 text-center text-white/40 px-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-6xl mb-4", children: "\u{1F5BC}\uFE0F" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        "No media yet \u2014 tap ",
        /* @__PURE__ */ jsx("b", { className: "text-pink-400", children: "+ Add" }),
        " or use the Camera."
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 p-2", children: shown.map((it, i) => /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.03 },
        onClick: () => {
          setCurrent(it);
          setIdx(i);
          setView("single");
        },
        className: "aspect-square bg-slate-800 overflow-hidden rounded-xl relative ring-1 ring-white/10 active:scale-95 transition",
        children: [
          it.type === "image" ? /* @__PURE__ */ jsx("img", { src: it.url, className: "w-full h-full object-cover", alt: it.name }) : /* @__PURE__ */ jsx("video", { src: it.url, className: "w-full h-full object-cover", muted: true, preload: "metadata" }),
          it.type === "video" && /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 bg-black/50 backdrop-blur px-1.5 rounded-md text-[10px]", children: "\u{1F3AC}" })
        ]
      },
      it.id
    )) }) })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col bg-black", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setView("grid"), className: "text-sm text-pink-400 font-semibold", children: "\u2039 Gallery" }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/40 tabular-nums", children: [
        idx + 1,
        " / ",
        shown.length
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setGallery((prev) => prev.filter((x) => x.id !== current.id));
            setView("grid");
          },
          className: "text-sm text-red-400 font-semibold",
          children: "\u{1F5D1}"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center justify-center p-2 relative", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
          className: "max-w-full max-h-full flex items-center justify-center",
          children: current.type === "image" ? /* @__PURE__ */ jsx("img", { src: current.url, className: "max-w-full max-h-[500px] object-contain rounded-2xl", alt: current.name }) : /* @__PURE__ */ jsx("video", { src: current.url, className: "max-w-full max-h-[500px] rounded-2xl", controls: true, autoPlay: true })
        },
        current.id
      ) }),
      shown.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const n = (idx - 1 + shown.length) % shown.length;
              setCurrent(shown[n]);
              setIdx(n);
            },
            className: "absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur text-white",
            children: "\u2039"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              const n = (idx + 1) % shown.length;
              setCurrent(shown[n]);
              setIdx(n);
            },
            className: "absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur text-white",
            children: "\u203A"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-white/30 pb-10 truncate px-6", children: current.name })
  ] }) });
}
function PhoneApp() {
  const [tab, setTab] = useState("keypad");
  const [number, setNumber] = useState("");
  const [inCall, setInCall] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [recents, setRecents] = useState([]);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Mom \u2764\uFE0F", num: "0912 000 1111" },
    { id: 2, name: "Dad", num: "0913 000 2222" },
    { id: 3, name: "Best Friend", num: "0935 000 3333" },
    { id: 4, name: "Pizza \u{1F355}", num: "021 88 99 77" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  useEffect(() => {
    if (inCall === null) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1e3);
    return () => clearInterval(t);
  }, [inCall]);
  const press = (k) => setNumber((n) => n.length < 14 ? n + k : n);
  const call = (num) => {
    if (!num.trim()) return;
    setSeconds(0);
    setInCall(num);
  };
  const end = () => {
    setRecents((r) => [{ num: inCall, dur: seconds, date: "Just now" }, ...r]);
    setInCall(null);
    setNumber("");
  };
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const addContact = () => {
    if (!newName.trim() || !newNum.trim()) return;
    setContacts((c) => [...c, { id: Date.now(), name: newName.trim(), num: newNum.trim() }]);
    setNewName("");
    setNewNum("");
  };
  if (inCall !== null) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "h-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white flex flex-col items-center justify-center gap-8",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { scale: [1, 1.05, 1] },
              transition: { repeat: Infinity, duration: 2 },
              className: "w-28 h-28 rounded-full bg-emerald-500/30 ring-2 ring-emerald-400/50 flex items-center justify-center text-5xl",
              children: "\u{1F464}"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-semibold", children: inCall }),
            /* @__PURE__ */ jsx(motion.p, { className: "text-emerald-300 text-lg mt-2 tabular-nums", children: fmt(seconds) }, seconds),
            /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs mt-1", children: "calling\u2026" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-5", children: [["\u{1F507}", "mute"], ["\u2328\uFE0F", "keypad"], ["\u{1F50A}", "speaker"]].map(([ic, l]) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsx("button", { className: "w-14 h-14 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-xl", children: ic }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] text-white/40 capitalize", children: l })
          ] }, l)) }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              whileTap: { scale: 0.85 },
              onClick: end,
              className: "w-[70px] h-[70px] rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl shadow-lg shadow-red-600/40",
              children: "\u{1F4F5}"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-around pt-4 pb-2 text-xs border-b border-white/10", children: ["keypad", "recents", "contacts"].map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setTab(t),
        className: `pb-2 capitalize font-semibold ${tab === t ? "text-emerald-400 border-b-2 border-emerald-400" : "text-white/40"}`,
        children: t
      },
      t
    )) }),
    tab === "keypad" && /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-6 gap-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-3xl tabular-nums h-10 tracking-wider font-light", children: number }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4", children: [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]].map(([d, s]) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.85 },
          onClick: () => press(d),
          className: "w-[68px] h-[68px] rounded-full bg-white/10 ring-1 ring-white/10 flex flex-col items-center justify-center active:bg-white/20",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-light", children: d }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] text-white/40 tracking-widest", children: s })
          ]
        },
        d
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsx("span", { className: "w-[68px]" }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.85 },
            onClick: () => call(number),
            disabled: !number,
            className: "w-[68px] h-[68px] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl disabled:opacity-30 shadow-lg shadow-emerald-600/40",
            children: "\u{1F4DE}"
          }
        ),
        /* @__PURE__ */ jsx("button", { onClick: () => setNumber((n) => n.slice(0, -1)), className: "w-[68px] h-[68px] text-white/50 text-xl", children: "\u232B" })
      ] })
    ] }),
    tab === "recents" && /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar p-4 pb-16", children: recents.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-white/30 text-sm pt-24", children: "No recent calls" }) : recents.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-3.5 border-b border-white/5", children: [
      /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs", children: "\u2197" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: r.num }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/40", children: [
          r.date,
          " \xB7 ",
          fmt(r.dur)
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => call(r.num), className: "w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center", children: "\u{1F4DE}" })
    ] }, i)) }),
    tab === "contacts" && /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar p-4 pb-16", children: [
      contacts.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-3.5 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center font-semibold shadow", children: c.name[0] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: c.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40 tabular-nums", children: c.num })
        ] }),
        /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => call(c.num), className: "w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-sm", children: "\u{1F4DE}" })
      ] }, c.id)),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: newName,
            onChange: (e) => setNewName(e.target.value),
            placeholder: "Name",
            className: "flex-1 px-3 py-2.5 rounded-xl bg-white/10 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-500 placeholder-white/30"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: newNum,
            onChange: (e) => setNewNum(e.target.value),
            placeholder: "Number",
            className: "flex-1 px-3 py-2.5 rounded-xl bg-white/10 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-500 placeholder-white/30"
          }
        ),
        /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: addContact, className: "px-4 rounded-xl bg-emerald-600 font-bold shadow-lg shadow-emerald-600/40", children: "+" })
      ] })
    ] })
  ] });
}
const CHAT_STYLES = {
  1: { hi: ["Sweetheart! How are you? \u2764\uFE0F", "Hi honey! Did you eat?"], bye: ["Okay honey, be safe! \u2764\uFE0F", "Night night! \u{1F319}"], food: ["I made your favorite! Come home \u{1F372}", "Dinner's almost ready!"], love: ["Love you more! \u2764\uFE0F", "Aww my baby \u{1F979}"], generic: ["Okay honey \u{1F60A}", "That's nice dear!", "Call me when you can \u2764\uFE0F", "I worry about you, you know!"] },
  2: { hi: ["YOOO what's up!! \u{1F92A}", "BRO finally you text!"], bye: ["ight peace \u270C\uFE0F", "later bro! \u{1F60E}"], food: ["FOOD YES let's gooo \u{1F354}", "I'm always down for food \u{1F924}"], funny: ["BRO I'M CRYING \u{1F480}\u{1F480}", "LMAOO you're unreal \u{1F62D}"], generic: ["bro same \u{1F4AF}", "no wayyy \u{1F633}", "fr fr", "bet \u{1F60E}", "you're insane bro \u{1F602}", "that's crazyyy", "ok ok hear me out\u2026", "type shi \u{1F624}", "nah you cooked there \u{1F525}"] },
  3: { hi: ["Hello! Thanks for choosing PizzaPal! \u{1F355}"], generic: ["Your order will arrive in 15 minutes \u{1F6F5}", "Would you like extra cheese? \u{1F9C0}", "Thanks for your order! \u{1F525}", "Don't forget to rate us 5 stars! \u2B50"] },
  4: { hi: ["Hey champ! \u{1F44B}", "Hello son!"], bye: ["Take care, champ.", "Alright, talk later."], generic: ["Good to hear.", "That's my boy! \u{1F44F}", "Proud of you, son.", "Remember: work hard! \u{1F4AA}", "Ha! Classic."] },
  5: { hi: ["Heyyy! \u{1F604}", "Hii! How are you? \u{1F380}"], music: ["OMG I love that song!! \u{1F3B6}", "Send me your playlist!! \u{1F3A7}"], love: ["Stop it, you're making me blush \u{1F970}"], generic: ["Ooh tell me more! \u{1F440}", "That's so cool! \u2728", "Hahaha you're the best \u{1F604}", "We should hang out soon! \u{1F495}"] },
  6: { hi: ["Hello! Hope work is going well."], work: ["Great initiative! Keep it up! \u{1F44F}", "Let's discuss in tomorrow's meeting."], generic: ["Noted, thank you.", "Well done! I'll forward this to the team.", "Good to know. Keep me posted!"] },
  7: { hi: ["YEAH BUDDY! \u{1F4AA}", "Ready to get SWOLE? \u{1F624}"], sport: ["LIGHT WEIGHT BABY! \u{1F525}", "One more set, let's GO \u{1F3CB}\uFE0F", "No excuses! \u{1F4AA}"], generic: ["Protein first, questions later \u{1F964}", "Do you even lift? \u{1F602}", "Rest day? Never heard of it \u{1F480}", "GET AFTER IT! \u{1F525}"] },
  8: { hi: ["Yo! \u{1F60E}", "sup"], generic: ["nice nice", "lol true", "wanna hang out?", "bet", "haha yeah", "I'm down \u{1F919}"] }
};
function MessagesApp({ notify }) {
  const CHATS0 = [
    { id: 1, name: "Mom \u2764\uFE0F", emoji: "\u{1F469}", color: "from-rose-400 to-red-600", pinned: true, unread: 1, msgs: [{ me: false, t: "Where are you?", time: "18:02" }, { me: true, t: "Coming home soon!", time: "18:05" }] },
    { id: 2, name: "Best Friend", emoji: "\u{1F92A}", color: "from-violet-400 to-purple-600", pinned: true, unread: 2, msgs: [{ me: false, t: "Did you see the new phone app? \u{1F62E}", time: "17:40" }] },
    { id: 3, name: "Pizza \u{1F355}", emoji: "\u{1F355}", color: "from-orange-400 to-red-500", pinned: false, unread: 0, msgs: [{ me: false, t: "Your order is on the way \u{1F6F5}", time: "16:20" }] },
    { id: 4, name: "Dad", emoji: "\u{1F468}", color: "from-slate-400 to-slate-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Don't forget to call your mom.", time: "14:11" }] },
    { id: 5, name: "Sara", emoji: "\u{1F469}\u200D\u{1F3A4}", color: "from-pink-400 to-fuchsia-600", pinned: false, unread: 1, msgs: [{ me: false, t: "Are we still on for the concert Friday? \u{1F3A4}", time: "13:55" }] },
    { id: 6, name: "Boss \u{1F4BC}", emoji: "\u{1F9D1}\u200D\u{1F4BC}", color: "from-blue-400 to-indigo-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Great work on the project! \u{1F44F}", time: "11:30" }] },
    { id: 7, name: "Gym Buddy \u{1F4AA}", emoji: "\u{1F3CB}\uFE0F", color: "from-emerald-400 to-green-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Leg day tomorrow. No excuses! \u{1F9B5}", time: "09:15" }] },
    { id: 8, name: "Alex", emoji: "\u{1F9D1}", color: "from-cyan-400 to-sky-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Yo! You free this weekend?", time: "Yesterday" }] }
  ];
  const [chats, setChats] = useState(CHATS0);
  const [openChat, setOpenChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [newChat, setNewChat] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [quick, setQuick] = useState(null);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, openChat, typing, quick]);
  const stamp = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const GENERIC_REPLIES = {
    hi: ["Hey! How's it going? \u{1F60A}", "Heyyy! \u{1F44B} What's up?", "Hello! Long time no talk \u{1F604}", "Hi! How have you been?", "Yo!! Good to hear from you \u{1F60E}", "Hiii! I was just thinking about you \u{1F914}", "Hey there! What's new?", "Oh hey! Perfect timing, I was about to text you!"],
    thanks: ["Anytime! \u{1F338}", "No problem at all \u{1F60A}", "You're welcome! \u{1F64C}", "Of course! That's what friends are for \u{1F604}", "Don't mention it! \u{1F60A}", "Aww, you're too kind! \u{1F499}", "Happy to help, always! \u2728", "Anytime, that's what I'm here for!"],
    bye: ["Talk soon! \u{1F44B}", "Aww okay, bye! Take care \u{1F499}", "Later! Catch you soon \u{1F60E}", "Good night! Sleep well \u{1F319}", "Byeee! Don't be a stranger \u{1F44B}", "Okay gtg too, talk later! \u{1F4A8}", "See you soon! \u{1F91D}", "Bye! Text me when you're free \u{1F60A}"],
    ok: ["\u{1F44C}", "Cool cool \u{1F604}", "Awesome!", "Great, glad we're on the same page \u{1F44D}", "Perfect! \u{1F60E}", "Sounds good to me!", "Alrighty! \u{1F44C}", "Cool beans \u{1F60E}"],
    funny: ["\u{1F602}\u{1F602} I know right!", "Hahaha glad you found that funny \u{1F604}", "LMAO I'm dying \u{1F480}", "Haha you're hilarious \u{1F606}", "LOL I can't breathe \u{1F602}", "Hahaha stop it! \u{1F923}", "That actually made my day \u{1F602}", "I'm wheezing LMAOO \u{1F635}"],
    sorry: ["No worries at all! \u{1F60A}", "It's totally fine, don't stress \u{1F499}", "Hey, it happens! No big deal \u{1F44D}", "Aww don't apologize! \u{1F917}", "Forgotten already! \u{1F604}", "Don't even worry about it \u{1F4AA}", "We're good, promise! \u{1F91D}"],
    love: ["Aww, miss you too! \u2764\uFE0F", "You're the best \u{1F970}", "Sending love right back! \u{1F495}", "Aww stop, you'll make me cry \u{1F979}", "Love you too! \u2764\uFE0F", "Big virtual hug! \u{1F917}", "You always know what to say \u{1F970}"],
    food: ["Ooh I'm getting hungry just thinking about it \u{1F355}", "Yes please! I could totally go for that \u{1F60B}", "Coffee sounds perfect right now \u2615", "My treat next time! \u{1F354}", "Don't talk about food, I'm starving \u{1F629}", "Pizza is always the answer \u{1F355}", "I know this great place we should try! \u{1F37D}", "Okay now I NEED fries \u{1F35F}"],
    plans: ["Ooh yes, count me in! \u{1F3AC}", "I've been meaning to watch that!", "Sounds like a plan! \u{1F3AE}", "Let's do it this weekend \u{1F389}", "I'm so down! \u{1F64C}", "Only if there are snacks \u{1F604}\u{1F37F}", "Best idea I've heard all day! \u{1F4AF}", "Wait, I'm free Friday! Let's go! \u{1F38A}"],
    sad: ["Aww no! What happened? \u{1F499}", "Sending you a big hug \u{1F917} It'll be okay!", "That sounds rough\u2026 I'm here if you need to talk \u{1F499}", "Aww, take a rest! You deserve it \u{1F634}", "Tomorrow will be better, promise! \u{1F305}", "Want me to bring you food? \u{1F36B}", "I'm sorry you're feeling that way \u{1F499} hang in there!", "Ugh, those days are the worst. Chin up! \u{1F4AA}"],
    good: ["YESSS that's amazing! \u{1F389}", "So happy for you! \u{1F973}", "Wow, congrats!! \u{1F38A}", "That's fantastic news! \u{1F604}", "Ooh exciting! Tell me everything! \u{1F440}", "Love that for you! \u{1F4AA}", "Great things keep happening to you! \u2728", "Celebration time! \u{1F973}"],
    work: ["Ugh work\u2026 I feel you \u{1F629}", "You've got this! \u{1F4AA}", "Good luck!! You'll do great \u{1F340}", "Deadlines are the worst \u{1F62D}", "Take a break, you've earned it! \u2615", "You're so hardworking, honestly \u{1F44F}", "One day at a time! We'll get through it \u{1F4AA}"],
    music: ["Ooh send me the song! \u{1F3B5}", "I've had that stuck in my head all week \u{1F3B6}", "Music makes everything better \u{1F3A7}", "Adding that to my playlist right now! \u2728", "We have such similar taste \u{1F604}", "Turn it up! \u{1F50A}"],
    sport: ["No pain no gain! \u{1F4AA}", "I should really go to the gym too \u{1F605}", "Did you see the game last night?? \u{1F3DF}", "Respect for actually working out \u{1F647}", "One more rep! You got this \u{1F525}", "I'll just watch from the couch honestly \u{1F602}"],
    weather: ["I know right, the weather is crazy! \u{1F326}", "Perfect day to stay in with hot chocolate \u2615", "Rainy days are honestly the coziest \u{1F327}", "Can't decide if it's too hot or too cold \u{1F605}", "At least it's sunny for once! \u2600\uFE0F"],
    question: ["Hmm, I think so \u{1F914}", "Honestly not sure!", "Yeah, definitely \u{1F44D}", "Good question \u2014 what do you think?", "Let me get back to you on that", "Hmm, maybe? Ask me again later \u{1F605}", "100% yes! \u{1F4AF}", "Nope, sorry!", "Ooh tough one\u2026 I'd say yes?", "Honestly? No idea \u{1F602}", "That's a great question! Hmm\u2026", "Depends! Tell me more \u{1F914}"],
    generic: ["Oh interesting!", "Same here \u{1F604}", "I was just thinking that", "LOL \u{1F602}", "No way, seriously?", "Anyway, what's new with you?", "Makes sense", "Tell me more!", "That's awesome! \u{1F389}", "Wow, I didn't know that!", "Haha you always know what to say \u{1F604}", "I feel exactly the same way", "Ooh, keep going \u{1F440}", "Really? That's wild \u{1F633}", "Nice one! \u{1F44F}", "I'm listening, go on\u2026", "You're full of surprises! \u{1F604}", "Hmm, never thought of it that way \u{1F914}", "That's actually genius \u{1F4A1}", "Okay okay, and then what? \u{1F440}", "I'm invested in this story now \u{1F37F}", "Big mood honestly \u{1F624}", "Same energy! \u2728", "Wait what?? Tell me everything! \u{1F631}", "Honestly relatable \u{1F62E}\u200D\u{1F4A8}", "Aww that's sweet \u{1F979}", "That's kinda iconic ngl \u{1F60E}", "Hmm interesting, keep talking \u{1F442}", "Okay that's a whole plot twist \u{1F633}", "I'm nodding aggressively rn \u{1F602}", "Facts. Pure facts. \u{1F4C8}", "You never disappoint \u{1F604}"]
  };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const categorize = (m) => {
    if (/\b(hi|hello|hey|yo|sup|what'?s up)\b/.test(m)) return "hi";
    if (/\b(thanks|thank you|thx|ty|appreciate)\b/.test(m)) return "thanks";
    if (/\b(bye|goodbye|cya|gtg|later|good ?night)\b/.test(m)) return "bye";
    if (/\b(ok|okay|k|sure|cool|alright|fine)\b/.test(m)) return "ok";
    if (/\b(haha|lol|lmao|😂|🤣|funny|joke)\b/.test(m)) return "funny";
    if (/\b(sorry|my bad|apolog)/.test(m)) return "sorry";
    if (/\b(love|miss you|❤️|😍|hug)\b/.test(m)) return "love";
    if (/\b(food|hungry|eat|pizza|dinner|lunch|coffee|burger|cake)\b/.test(m)) return "food";
    if (/\b(movie|game|play|watch|netflix|weekend|party|concert)\b/.test(m)) return "plans";
    if (/\b(sad|tired|exhausted|stressed|bad day|awful)\b/.test(m)) return "sad";
    if (/\b(good|great|awesome|amazing|happy|excited|won)\b/.test(m)) return "good";
    if (/\b(work|school|homework|exam|study|project|meeting)\b/.test(m)) return "work";
    if (/\b(music|song|sing|playlist|spotify)\b/.test(m)) return "music";
    if (/\b(sport|football|soccer|basketball|gym|run|workout)\b/.test(m)) return "sport";
    if (/\b(weather|rain|snow|hot|cold|sunny)\b/.test(m)) return "weather";
    if (m.includes("?")) return "question";
    return "generic";
  };
  const send = (override) => {
    const text = (override ?? draft).trim();
    if (!text) return;
    const chat2 = chats.find((c) => c.id === openChat);
    setChats((cs) => cs.map((c) => c.id === openChat ? { ...c, msgs: [...c.msgs, { me: true, t: text, time: stamp() }] } : c));
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const cat = categorize(text.toLowerCase());
      const style = CHAT_STYLES[chat2.id];
      let reply;
      if (style && style[cat]) reply = pick(style[cat]);
      else reply = pick(GENERIC_REPLIES[cat]);
      setChats((cs) => cs.map((c) => c.id === openChat ? { ...c, msgs: [...c.msgs, { me: false, t: reply, time: stamp() }] } : c));
      setTyping(false);
      setQuick(pick([["\u{1F602} Haha", "\u{1F44D} OK", "\u2764\uFE0F"], ["Hmm\u2026", "Tell me more!", "Nice!"], ["That's great! \u{1F389}", "For real?", "Love it!"]]));
    }, 900 + Math.random() * 900);
  };
  const createChat = () => {
    if (!newChat.trim()) return;
    const c = { id: Date.now(), name: newChat.trim(), emoji: "\u{1F4AC}", color: "from-blue-400 to-indigo-600", pinned: false, unread: 0, msgs: [] };
    setChats((cs) => [c, ...cs]);
    setNewChat("");
    setOpenChat(c.id);
  };
  const togglePin = (id) => setChats((cs) => cs.map((c) => c.id === id ? { ...c, pinned: !c.pinned } : c));
  const chat = chats.find((c) => c.id === openChat);
  const shown = [...chats].sort((a, b) => b.pinned - a.pinned).filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.msgs.some((m) => m.t.toLowerCase().includes(search.toLowerCase())));
  const QUICK_CHIPS = ["\u{1F602}", "\u2764\uFE0F", "\u{1F44D}", "\u{1F62E}", "\u{1F622}", "\u{1F525}"];
  return /* @__PURE__ */ jsx("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: openChat === null ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-3 pb-3 border-b border-white/5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-3", children: "Messages" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "\u{1F50D} Search chats & messages\u2026",
          className: "w-full px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm placeholder-white/30 outline-none focus:ring-blue-500 transition mb-2.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: newChat,
          onChange: (e) => setNewChat(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && createChat(),
          placeholder: "New chat name\u2026 (press Enter)",
          className: "w-full px-4 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 text-sm placeholder-white/25 outline-none focus:ring-indigo-500 transition"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: [
      shown.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-white/30 text-sm pt-20", children: "No chats found" }),
      shown.map((c) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          layout: true,
          whileTap: { scale: 0.98 },
          onClick: () => {
            setOpenChat(c.id);
            setChats((cs) => cs.map((x) => x.id === c.id ? { ...x, unread: 0 } : x));
            setQuick(null);
          },
          className: "w-full flex items-center gap-3.5 p-4 border-b border-white/5 text-left",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xl shadow`, children: c.emoji || c.name[0] }),
              /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold flex items-center gap-1.5", children: [
                  c.name,
                  c.pinned && /* @__PURE__ */ jsx("span", { className: "text-[9px]", children: "\u{1F4CC}" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/30", children: c.msgs[c.msgs.length - 1]?.time || "" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
                /* @__PURE__ */ jsx("p", { className: `text-xs truncate mt-0.5 ${c.unread ? "text-white/80 font-semibold" : "text-white/40"}`, children: c.msgs[c.msgs.length - 1]?.t || "No messages" }),
                c.unread > 0 && /* @__PURE__ */ jsx("span", { className: "shrink-0 w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center", children: c.unread })
              ] })
            ] })
          ]
        },
        c.id
      ))
    ] })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3.5 border-b border-white/10 bg-slate-950/90 backdrop-blur sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setOpenChat(null), className: "text-blue-400 text-xl", children: "\u2039" }),
      /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-lg`, children: chat.emoji || chat.name[0] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: chat.name }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-400", children: typing ? "typing\u2026" : "\u25CF online" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => togglePin(chat.id), className: `text-lg ${chat.pinned ? "opacity-100" : "opacity-40"}`, children: "\u{1F4CC}" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-2.5", children: [
      chat.msgs.map((m, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          className: `max-w-[75%] px-4 py-2.5 text-sm shadow ${m.me ? "bg-gradient-to-br from-blue-500 to-indigo-600 self-end rounded-3xl rounded-br-md" : "bg-white/10 self-start rounded-3xl rounded-bl-md"}`,
          children: [
            /* @__PURE__ */ jsx("p", { children: m.t }),
            /* @__PURE__ */ jsxs("p", { className: `text-[9px] mt-1 ${m.me ? "text-white/60" : "text-white/40"} flex items-center gap-1 ${m.me ? "justify-end" : ""}`, children: [
              m.time,
              " ",
              m.me && /* @__PURE__ */ jsx("span", { className: "text-sky-200", children: "\u2713\u2713" })
            ] })
          ]
        },
        i
      )),
      typing && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "bg-white/10 self-start rounded-3xl rounded-bl-md px-4 py-3 flex gap-1.5",
          children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
            motion.span,
            {
              animate: { y: [0, -4, 0] },
              transition: { repeat: Infinity, duration: 0.8, delay: i * 0.15 },
              className: "w-1.5 h-1.5 rounded-full bg-white/60"
            },
            i
          ))
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: endRef })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-3.5 pt-1 flex gap-2", children: [
      QUICK_CHIPS.map((e) => /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.8 },
          onClick: () => send(e),
          className: "w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-base",
          children: e
        },
        e
      )),
      quick && quick.map((q) => /* @__PURE__ */ jsx(
        motion.button,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          whileTap: { scale: 0.9 },
          onClick: () => send(q),
          className: "px-3 h-9 rounded-full bg-blue-500/15 ring-1 ring-blue-400/30 text-xs text-blue-200 font-medium",
          children: q
        },
        q
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-3.5 flex gap-2.5 border-t border-white/10 bg-slate-950", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: draft,
          onChange: (e) => setDraft(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && send(),
          placeholder: "Message\u2026",
          className: "flex-1 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-blue-500 placeholder-white/30"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.85 },
          onClick: () => send(),
          className: "w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/40",
          children: "\u27A4"
        }
      )
    ] })
  ] }) });
}
function CameraApp({ setGallery, notify }) {
  const [mode, setMode] = useState("photo");
  const [shot, setShot] = useState(null);
  const [flash, setFlash] = useState(false);
  const [hue, setHue] = useState(20);
  const canvasRef = useRef(null);
  useEffect(() => {
    const t = setInterval(() => setHue((h) => (h + 2) % 360), 50);
    return () => clearInterval(t);
  }, []);
  const takeShot = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, c.height);
    g.addColorStop(0, `hsl(${hue},70%,60%)`);
    g.addColorStop(1, `hsl(${(hue + 120) % 360},70%,35%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffdd55";
    ctx.beginPath();
    ctx.arc(c.width * 0.7, c.height * 0.3, 40, 0, 7);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    ctx.lineTo(c.width * 0.35, c.height * 0.55);
    ctx.lineTo(c.width * 0.65, c.height);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(c.width * 0.4, c.height);
    ctx.lineTo(c.width * 0.75, c.height * 0.45);
    ctx.lineTo(c.width, c.height);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(mode === "video" ? "\u25B6 VibeCam REC" : "\u{1F4F7} VibeCam", 20, 40);
    const url = c.toDataURL("image/png");
    setShot(url);
    setGallery((prev) => [{ id: Date.now(), type: "image", url, name: `shot-${Date.now()}.png` }, ...prev]);
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-black relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex-1 m-2 rounded-[1.8rem] overflow-hidden relative ring-1 ring-white/10",
          style: { background: `linear-gradient(160deg, hsl(${hue},70%,55%), hsl(${(hue + 120) % 360},70%,30%))` },
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { scale: [1, 1.05, 1] },
                transition: { repeat: Infinity, duration: 4 },
                className: "absolute bottom-8 right-8 w-24 h-24 rounded-full bg-yellow-400/90 blur-[1px] shadow-[0_0_40px_rgba(250,204,21,0.6)]"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute bottom-0 left-0 right-0 h-1/3 bg-slate-900/50",
                style: { clipPath: "polygon(0 100%, 35% 20%, 65% 100%, 100% 35%)" }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-1/3 w-px bg-white/20" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-2/3 w-px bg-white/20" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/3 h-px bg-white/20" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-2/3 h-px bg-white/20" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 text-white/80 text-xs flex gap-3 items-center", children: [
              mode === "video" && /* @__PURE__ */ jsx(motion.span, { animate: { opacity: [1, 0.3, 1] }, transition: { repeat: Infinity, duration: 1 }, className: "text-red-500 font-bold", children: "\u25CF REC" }),
              /* @__PURE__ */ jsx("span", { className: "bg-black/30 backdrop-blur px-2 py-1 rounded-lg", children: "VibeCam" })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: shot && /* @__PURE__ */ jsx(
              motion.img,
              {
                src: shot,
                alt: "last",
                initial: { scale: 0.5, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.5, opacity: 0 },
                className: "absolute bottom-4 right-4 w-16 h-16 rounded-xl object-cover border-2 border-white/80 shadow-xl cursor-pointer"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "pb-14 pt-4 flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 bg-white/10 backdrop-blur rounded-full px-2 py-1.5 ring-1 ring-white/10", children: ["photo", "video"].map((m) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMode(m),
            className: `px-5 py-1.5 rounded-full text-xs capitalize font-semibold transition-all ${mode === m ? "bg-yellow-400 text-black shadow" : "text-white/60"}`,
            children: m
          },
          m
        )) }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.85 },
            onClick: takeShot,
            className: "w-[74px] h-[74px] rounded-full border-[5px] border-white/90 flex items-center justify-center shadow-xl",
            children: /* @__PURE__ */ jsx("span", { className: `rounded-full ${mode === "video" ? "w-7 h-7 bg-red-500" : "w-[56px] h-[56px] bg-white"}` })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: flash && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0.9 }, animate: { opacity: 0 }, className: "absolute inset-0 bg-white pointer-events-none z-20" }) }),
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, width: 640, height: 480, className: "hidden" })
  ] });
}
function ClockApp({ secondFlash }) {
  const [tab, setTab] = useState("clock");
  const [time, setTime] = useState(/* @__PURE__ */ new Date());
  const [sw, setSw] = useState(0);
  const [swRun, setSwRun] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRun, setTimerRun] = useState(false);
  const [alarm, setAlarm] = useState("");
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    const t = setInterval(() => setTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!swRun) return;
    const t = setInterval(() => setSw((s) => s + 0.1), 100);
    return () => clearInterval(t);
  }, [swRun]);
  useEffect(() => {
    if (!timerRun || timer <= 0) return;
    const t = setInterval(() => setTimer((v) => Math.max(0, v - 1)), 1e3);
    return () => clearInterval(t);
  }, [timerRun, timer]);
  const fmtSw = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}.${String(Math.floor(s % 1 * 10))}`;
  const fmtT = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const secAngle = time.getSeconds() * 6, minAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1, hrAngle = time.getHours() % 12 * 30 + time.getMinutes() * 0.5;
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-slate-900 to-black text-white flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-around pt-4 pb-2 text-xs border-b border-white/10", children: ["clock", "stopwatch", "timer", "alarm"].map((t) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setTab(t),
        className: `pb-2 capitalize font-semibold ${tab === t ? "text-orange-400 border-b-2 border-orange-400" : "text-white/40"}`,
        children: t
      },
      t
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-6 p-6", children: [
      tab === "clock" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-52 h-52 rounded-full bg-white/5 ring-2 ring-white/10 shadow-2xl", children: [
          Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { transform: `rotate(${i * 30}deg)` }, children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 top-1.5 w-0.5 h-2.5 bg-white/40 rounded" }) }, i)),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "absolute w-1 h-16 bg-white rounded-full origin-bottom -translate-y-8", style: { transform: `translateY(-2rem) rotate(${hrAngle}deg)`, transformOrigin: "bottom center", position: "absolute", bottom: "50%" } }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { transform: `rotate(${minAngle}deg)` }, children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-6 w-[3px] h-[70px] -translate-x-1/2 bg-white/90 rounded-full" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { transform: `rotate(${secAngle}deg)` }, children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-4 w-[1.5px] h-[80px] -translate-x-1/2 bg-orange-500 rounded-full" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-4xl font-extralight tabular-nums", children: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-white/50 text-sm mt-1", children: time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) })
        ] })
      ] }),
      tab === "stopwatch" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-6xl font-extralight tabular-nums", children: fmtSw(sw) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => setSwRun(true), className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-sm font-bold shadow-lg shadow-emerald-700/40", children: "Start" }),
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
            if (swRun) setLaps((l) => [fmtSw(sw), ...l]);
          }, className: "px-6 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm", children: "Lap" }),
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
            setSwRun(false);
            setSw(0);
            setLaps([]);
          }, className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-sm font-bold shadow-lg shadow-red-700/40", children: "Reset" })
        ] }),
        laps.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-sm text-white/60 max-h-36 overflow-y-auto no-scrollbar w-48 space-y-2", children: laps.map((l, i) => /* @__PURE__ */ jsxs("p", { className: "tabular-nums flex justify-between border-b border-white/10 pb-1.5", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-white/40", children: [
            "Lap ",
            laps.length - i
          ] }),
          l
        ] }, i)) })
      ] }),
      tab === "timer" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-44 h-44", children: [
          /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 -rotate-90", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "rgba(255,255,255,0.1)", strokeWidth: "6" }),
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "46",
                fill: "none",
                stroke: "#fb923c",
                strokeWidth: "6",
                strokeLinecap: "round",
                strokeDasharray: 289,
                strokeDashoffset: 289 - (timer > 0 ? 289 * (timer % 60 / 60 || 1) : 0),
                className: "transition-all duration-1000"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "absolute inset-0 flex items-center justify-center text-3xl font-extralight tabular-nums", children: fmtT(timer) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [60, 300, 600].map((s) => /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileTap: { scale: 0.9 },
            onClick: () => {
              setTimer(s);
              setTimerRun(false);
            },
            className: "px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/10 text-sm font-medium",
            children: [
              s / 60,
              " min"
            ]
          },
          s
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => setTimerRun(true), className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-sm font-bold", children: "Start" }),
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => setTimerRun(false), className: "px-6 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm", children: "Pause" }),
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
            setTimerRun(false);
            setTimer(0);
          }, className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-sm font-bold", children: "Reset" })
        ] }),
        timerRun && timer === 0 && /* @__PURE__ */ jsx(motion.p, { animate: { scale: [1, 1.15, 1] }, transition: { repeat: Infinity }, className: "text-orange-400 font-bold text-lg", children: "\u23F0 Time's up!" })
      ] }),
      tab === "alarm" && /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-5", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "time",
              value: alarm,
              onChange: (e) => setAlarm(e.target.value),
              className: "flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 outline-none focus:ring-orange-500 tabular-nums"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              whileTap: { scale: 0.9 },
              onClick: () => {
                if (alarm) {
                  setAlarms((a) => [...a, alarm]);
                  setAlarm("");
                }
              },
              className: "px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 font-bold text-sm shadow-lg shadow-orange-600/40",
              children: "Add"
            }
          )
        ] }),
        alarms.map((a, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { x: -30, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            className: "flex items-center justify-between py-4 px-4 mb-2 rounded-2xl bg-white/5 ring-1 ring-white/10",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "text-2xl tabular-nums font-light", children: [
                "\u23F0 ",
                a
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setAlarms((prev) => prev.filter((_, j) => j !== i)), className: "text-red-400 text-sm font-semibold", children: "Remove" })
            ]
          },
          a + i
        ))
      ] })
    ] })
  ] });
}
function NotesApp() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome \u{1F389}", body: "Welcome to Notes! Everything auto-saves.\nUse + to add a new note.", date: "Today" },
    { id: 2, title: "Shopping list", body: "\u2022 Milk\n\u2022 Bread\n\u2022 Coffee \u2615", date: "Today" }
  ]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const note = notes.find((n) => n.id === editing);
  const save = (title, body) => setNotes((ns) => ns.map((n) => n.id === editing ? { ...n, title, body, date: "Today" } : n));
  const add = () => {
    const n = { id: Date.now(), title: "New Note", body: "", date: "Today" };
    setNotes((ns) => [n, ...ns]);
    setEditing(n.id);
  };
  const del = (id) => {
    setNotes((ns) => ns.filter((n) => n.id !== id));
    setEditing(null);
  };
  const shown = notes.filter((n) => (n.title + n.body).toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-b from-amber-50 to-orange-50 text-slate-900 flex flex-col", children: editing === null ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 pt-3 pb-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent", children: "Notes" }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.9 },
          onClick: add,
          className: "px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/40",
          children: "+ New"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 pb-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "\u{1F50D} Search notes\u2026",
        className: "w-full px-4 py-2.5 rounded-2xl bg-amber-100 ring-1 ring-amber-200 text-sm outline-none placeholder-amber-700/40 focus:ring-amber-500"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar px-5 pb-16 grid grid-cols-2 gap-3 content-start", children: /* @__PURE__ */ jsx(AnimatePresence, { children: shown.map((n) => /* @__PURE__ */ jsxs(
      motion.button,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        onClick: () => setEditing(n.id),
        className: "text-left p-4 rounded-3xl bg-white shadow-md shadow-amber-900/5 ring-1 ring-amber-100 active:scale-95 transition",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-sm line-clamp-1", children: n.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1.5 line-clamp-5 whitespace-pre-wrap", children: n.body || "No content" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-2", children: n.date })
        ]
      },
      n.id
    )) }) })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3.5 border-b border-amber-200 bg-white/70 backdrop-blur", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), className: "text-amber-700 text-xl", children: "\u2039" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: note.title,
          onChange: (e) => save(e.target.value, note.body),
          className: "flex-1 font-bold outline-none bg-transparent text-lg"
        }
      ),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => del(note.id), className: "text-red-500 text-lg", children: "\u{1F5D1}" })
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value: note.body,
        onChange: (e) => save(note.title, e.target.value),
        autoFocus: true,
        className: "flex-1 p-5 bg-amber-50/50 outline-none resize-none text-sm leading-relaxed",
        placeholder: "Start writing\u2026"
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-slate-400 pb-9", children: "\u2713 Changes save automatically" })
  ] }) });
}
const SONGS = [
  { id: 1, title: "Neon Dreams", artist: "Synthwave", dur: 30, color: "linear-gradient(135deg,#f472b6,#db2777)", emoji: "\u{1F319}" },
  { id: 2, title: "Midnight Drive", artist: "Retrowave", dur: 30, color: "linear-gradient(135deg,#818cf8,#4f46e5)", emoji: "\u{1F303}" },
  { id: 3, title: "Summer Vibes", artist: "Chill Co.", dur: 30, color: "linear-gradient(135deg,#fbbf24,#f97316)", emoji: "\u{1F31E}" },
  { id: 4, title: "Rainy Day", artist: "Lo-Fi Beats", dur: 30, color: "linear-gradient(135deg,#34d399,#059669)", emoji: "\u{1F327}" }
];
function MusicApp() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  useEffect(() => {
    if (!playing || !current) return;
    const t = setInterval(() => {
      setPos((p) => {
        if (p + 1 >= current.dur) {
          const idx = SONGS.findIndex((s) => s.id === current.id);
          setCurrent(SONGS[(idx + 1) % SONGS.length]);
          return 0;
        }
        return p + 1;
      });
    }, 1e3);
    return () => clearInterval(t);
  }, [playing, current]);
  const play = (s) => {
    setCurrent(s);
    setPlaying(true);
    setPos(0);
  };
  const toggle = () => setPlaying((p) => !p);
  const skip = (d) => {
    const idx = SONGS.findIndex((s) => s.id === current.id);
    const n = SONGS[(idx + d + SONGS.length) % SONGS.length];
    setCurrent(n);
    setPos(0);
  };
  const fmt = (s) => `0:${String(s).padStart(2, "0")}`;
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "px-5 pt-4 pb-2", children: /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent", children: "\u{1F3B5} Music" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar px-5 pb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2", children: "Library" }),
      SONGS.map((s) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.97 },
          onClick: () => play(s),
          className: `w-full flex items-center gap-3.5 py-3 px-3 rounded-2xl text-left transition ${current?.id === s.id ? "bg-white/10 ring-1 ring-pink-500/50" : ""}`,
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: playing && current?.id === s.id ? { scale: [1, 1.08, 1] } : {},
                transition: { repeat: Infinity, duration: 0.8 },
                className: "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg",
                style: { background: s.color },
                children: s.emoji
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: `text-sm font-semibold truncate ${current?.id === s.id ? "text-pink-400" : ""}`, children: s.title }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/40", children: [
                s.artist,
                " \xB7 0:30"
              ] })
            ] }),
            current?.id === s.id && playing && /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 items-end h-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
              motion.span,
              {
                animate: { height: [4, 12, 6, 14, 4] },
                transition: { repeat: Infinity, duration: 1, delay: i * 0.2 },
                className: "w-0.5 bg-pink-400 rounded"
              },
              i
            )) })
          ]
        },
        s.id
      ))
    ] }),
    current && /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: playing ? { rotate: 360 } : {},
          transition: { repeat: playing ? Infinity : 0, duration: 8, ease: "linear" },
          className: "w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ring-2 ring-white/20",
          style: { background: current.color },
          children: current.emoji
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold truncate", children: current.title }),
        /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-full bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-full",
            animate: { width: `${pos / current.dur * 100}%` },
            transition: { duration: 0.5 }
          }
        ) }),
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-white/40 mt-1 tabular-nums", children: [
          fmt(pos),
          " / ",
          fmt(current.dur)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.8 }, onClick: () => skip(-1), className: "text-white/70 text-lg", children: "\u23EE" }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.8 },
            onClick: toggle,
            className: "w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-600/40 text-lg",
            children: playing ? "\u23F8" : "\u25B6"
          }
        ),
        /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.8 }, onClick: () => skip(1), className: "text-white/70 text-lg", children: "\u23ED" })
      ] })
    ] }) })
  ] });
}
function WeatherApp() {
  const cities = [
    { name: "Tehran", temp: 19, cond: "Sunny", icon: "\u2600\uFE0F", hi: 24, lo: 11, hum: 32 },
    { name: "Istanbul", temp: 16, cond: "Cloudy", icon: "\u2601\uFE0F", hi: 18, lo: 12, hum: 68 },
    { name: "London", temp: 11, cond: "Rain", icon: "\u{1F327}\uFE0F", hi: 13, lo: 8, hum: 85 },
    { name: "Dubai", temp: 34, cond: "Clear", icon: "\u{1F324}\uFE0F", hi: 38, lo: 26, hum: 40 },
    { name: "Tokyo", temp: 21, cond: "Partly Cloudy", icon: "\u26C5", hi: 23, lo: 17, hum: 60 }
  ];
  const [idx, setIdx] = useState(0);
  const c = cities[idx];
  const hours = Array.from({ length: 8 }, (_, i) => ({
    h: ((/* @__PURE__ */ new Date()).getHours() + i + 1) % 24,
    temp: Math.round(c.temp + Math.sin(i) * 3),
    icon: ["\u2600\uFE0F", "\u26C5", "\u2601\uFE0F", "\u{1F327}\uFE0F"][i % 4]
  }));
  const bg = c.cond === "Rain" ? "linear-gradient(180deg,#1e3a5f,#0f172a)" : c.cond === "Sunny" || c.cond === "Clear" ? "linear-gradient(180deg,#3b82f6,#1e40af)" : "linear-gradient(180deg,#475569,#1e293b)";
  return /* @__PURE__ */ jsxs("div", { className: "h-full overflow-y-auto no-scrollbar text-white", style: { background: bg }, children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 px-4 pt-4 overflow-x-auto no-scrollbar pb-2", children: cities.map((ci, i) => /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.9 },
        onClick: () => setIdx(i),
        className: `px-4 py-1.5 rounded-full text-xs shrink-0 font-semibold transition ${i === idx ? "bg-white text-slate-900 shadow-lg" : "bg-white/20 backdrop-blur"}`,
        children: ci.name
      },
      ci.name
    )) }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "text-center pt-6 pb-8", children: [
      /* @__PURE__ */ jsx(motion.p, { animate: { y: [0, -8, 0] }, transition: { repeat: Infinity, duration: 3 }, className: "text-[80px] leading-none", children: c.icon }),
      /* @__PURE__ */ jsxs("p", { className: "text-[76px] font-extralight leading-none mt-2", children: [
        c.temp,
        "\xB0"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl font-medium mt-2", children: c.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-sm", children: [
        c.cond,
        " \xB7 H ",
        c.hi,
        "\xB0 L ",
        c.lo,
        "\xB0"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-3 mt-3", children: [["\u{1F4A7}", `${c.hum}%`], ["\u{1F32C}", "12 km/h"], ["\u2600", "UV 5"]].map(([ic, v]) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs", children: [
        ic,
        " ",
        v
      ] }, v)) })
    ] }, c.name) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-4 bg-white/10 backdrop-blur rounded-3xl p-4 ring-1 ring-white/10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-white/50 font-bold tracking-wider mb-3", children: "Hourly Forecast" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: hours.map((h, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          className: "flex flex-col items-center gap-1.5 shrink-0 px-1",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-white/50 tabular-nums", children: [
              h.h,
              ":00"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: h.icon }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold", children: [
              h.temp,
              "\xB0"
            ] })
          ]
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "m-4 bg-white/10 backdrop-blur rounded-3xl p-4 ring-1 ring-white/10 mb-20", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-white/50 font-bold tracking-wider mb-2", children: "7-Day Forecast" }),
      [["Mon", "\u2600\uFE0F"], ["Tue", "\u26C5"], ["Wed", "\u{1F327}\uFE0F"], ["Thu", "\u2600\uFE0F"], ["Fri", "\u{1F324}\uFE0F"], ["Sat", "\u2601\uFE0F"], ["Sun", "\u2600\uFE0F"]].map(([d, ic], i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -15 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.05 },
          className: "flex items-center justify-between py-2.5 border-b border-white/10 last:border-0",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm w-12 font-medium", children: d }),
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: ic }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-white/50 tabular-nums", children: [
                c.lo,
                "\xB0"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-14 h-1 rounded-full bg-white/20 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 rounded-full bg-gradient-to-r from-sky-300 to-orange-400", style: { left: "20%", right: "20%" } }) }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold tabular-nums", children: [
                c.hi,
                "\xB0"
              ] })
            ] })
          ]
        },
        d
      ))
    ] })
  ] });
}
function MapsApp() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  const [mode, setMode] = useState("car");
  const dist = from && to ? Math.max(1, (from.length + to.length) * 7 % 40) + 3 : null;
  const speeds = { car: 1, bike: 4, walk: 12 };
  const search = () => {
    if (!from.trim() || !to.trim()) return;
    setRoute({ from: from.trim(), to: to.trim(), dist });
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex-1 m-2.5 rounded-[1.8rem] relative overflow-hidden ring-1 ring-white/10",
        style: { background: "linear-gradient(135deg,#14532d,#166534)" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 inset-x-0 h-3.5 bg-slate-300/25" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-2/3 inset-x-0 h-2.5 bg-slate-300/15" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/4 inset-y-0 w-3.5 bg-slate-300/25" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-2/3 inset-y-0 w-2.5 bg-slate-300/15" }),
          [[8, 40], [30, 42], [42, 70], [72, 38]].map(([x, y], i) => /* @__PURE__ */ jsx("div", { className: "absolute w-16 h-16 rounded-lg bg-emerald-800/40 ring-1 ring-white/5", style: { left: `${x}%`, top: `${y}%` } }, i)),
          /* @__PURE__ */ jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx("path", { d: "M0 50 C 30 60, 55 35, 100 45", stroke: "#38bdf8", strokeWidth: "3", fill: "none", opacity: "0.5" }) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: route && /* @__PURE__ */ jsx(motion.svg, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "absolute inset-0 w-full h-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx(
            motion.path,
            {
              d: "M25 25 C 45 15, 55 60, 75 65",
              stroke: "#60a5fa",
              strokeWidth: "2.5",
              fill: "none",
              strokeLinecap: "round",
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 1.2 }
            }
          ) }) }),
          /* @__PURE__ */ jsx(
            motion.span,
            {
              animate: route ? { left: ["20%", "73%"], top: ["20%", "63%"] } : {},
              transition: { duration: 1.2 },
              className: "absolute left-[20%] top-[20%] text-xl drop-shadow-lg",
              style: { position: "absolute" },
              children: "\u{1F697}"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[20%] top-[20%] text-sm", children: "\u{1F3E0}" }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-[75%] top-[65%] text-sm", children: "\u{1F3AF}" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2.5 pb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: from,
            onChange: (e) => setFrom(e.target.value),
            placeholder: "From (e.g. Home)",
            className: "flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-emerald-500 placeholder-white/40 transition"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: to,
            onChange: (e) => setTo(e.target.value),
            placeholder: "To (e.g. Office)",
            className: "flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-emerald-500 placeholder-white/40 transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        [["car", "\u{1F697}"], ["bike", "\u{1F6B4}"], ["walk", "\u{1F6B6}"]].map(([m, ic]) => /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.9 },
            onClick: () => setMode(m),
            className: `px-4 py-2 rounded-full text-sm transition ${mode === m ? "bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold shadow-lg shadow-emerald-700/40" : "bg-white/10"}`,
            children: ic
          },
          m
        )),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.95 },
            onClick: search,
            className: "flex-1 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-sm shadow-lg shadow-emerald-700/40",
            children: "Route"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: route && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          className: "bg-gradient-to-r from-emerald-900/60 to-slate-900/60 backdrop-blur rounded-2xl p-4 ring-1 ring-emerald-500/30",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold flex items-center gap-2", children: [
              "\u{1F9ED} ",
              route.from,
              " \u2192 ",
              route.to
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-emerald-300/80 text-xs mt-1.5", children: [
              route.dist,
              " km \xB7 ~",
              Math.max(1, Math.round(route.dist / 10 * speeds[mode] / 6)),
              " min by ",
              mode
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
function MailApp({ notify }) {
  const [mails, setMails] = useState([
    { id: 1, from: "Vibe Team", subj: "Welcome to Mail! \u{1F389}", body: "Thanks for using VibeMail. You can read, reply, and compose new emails here.", date: "09:12", read: false },
    { id: 2, from: "App Store", subj: "Your download finished", body: "TubeVideo has been installed on your phone.", date: "08:45", read: false },
    { id: 3, from: "Alex", subj: "Lunch tomorrow?", body: "Hey! Want to grab lunch tomorrow at 1pm? There's a new pizza place nearby.", date: "Yesterday", read: true },
    { id: 4, from: "Newsletter", subj: "Weekly digest", body: "Top 10 stories from this week, curated just for you.", date: "Monday", read: true }
  ]);
  const [open, setOpen] = useState(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ to: "", subj: "", body: "" });
  const [sent, setSent] = useState([]);
  const read = (m) => {
    setMails((ms) => ms.map((x) => x.id === m.id ? { ...x, read: true } : x));
    setOpen(m);
  };
  const send = () => {
    if (!draft.to.trim()) return;
    setSent((s) => [{ id: Date.now(), ...draft, date: "Now" }, ...s]);
    setComposing(false);
    setDraft({ to: "", subj: "", body: "" });
    notify("\u2709\uFE0F", "Email sent", "Your message was delivered successfully!");
  };
  return /* @__PURE__ */ jsx("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: open ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3.5 border-b border-white/10", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(null), className: "text-red-400 text-xl", children: "\u2039" }),
      /* @__PURE__ */ jsx("p", { className: "flex-1 font-semibold text-sm truncate", children: open.subj }),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => {
        setMails((ms) => ms.filter((x) => x.id !== open.id));
        setOpen(null);
      }, className: "text-red-400", children: "\u{1F5D1}" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-red-400 to-red-700 flex items-center justify-center font-bold shadow", children: open.from[0] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: open.from }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40", children: open.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mt-4", children: open.subj }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70 mt-3 leading-relaxed", children: open.body })
    ] })
  ] }) : composing ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3.5 border-b border-white/10", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setComposing(false), className: "text-red-400 text-xl", children: "\u2039" }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "New Email" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 p-5 space-y-2.5 pb-16", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: draft.to,
          onChange: (e) => setDraft({ ...draft, to: e.target.value }),
          placeholder: "To",
          className: "w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 placeholder-white/30 transition"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: draft.subj,
          onChange: (e) => setDraft({ ...draft, subj: e.target.value }),
          placeholder: "Subject",
          className: "w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 placeholder-white/30 transition"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: draft.body,
          onChange: (e) => setDraft({ ...draft, body: e.target.value }),
          rows: 6,
          placeholder: "Write your email\u2026",
          className: "w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 resize-none placeholder-white/30 transition"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.97 },
          onClick: send,
          className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold shadow-lg shadow-red-600/40",
          children: "\u{1F4E8} Send"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 pt-3 pb-3 border-b border-white/5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent", children: "\u2709\uFE0F Mail" }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.9 },
          onClick: () => setComposing(true),
          className: "px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-lg shadow-red-600/40",
          children: "\u270F\uFE0F Compose"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: [
      sent.length > 0 && /* @__PURE__ */ jsx("p", { className: "px-5 pt-3 text-[10px] uppercase font-bold text-white/40 tracking-wider", children: "Sent" }),
      sent.map((m) => /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 border-b border-white/5 bg-white/[0.03]", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold", children: [
          "To: ",
          m.to
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-white/50 truncate", children: m.subj || "(no subject)" })
      ] }, m.id)),
      /* @__PURE__ */ jsx("p", { className: "px-5 pt-3 text-[10px] uppercase font-bold text-white/40 tracking-wider", children: "Inbox" }),
      mails.map((m) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.98 },
          onClick: () => read(m),
          className: "w-full text-left px-5 py-3.5 border-b border-white/5 flex gap-3",
          children: [
            /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-transparent" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"}` }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("p", { className: `text-sm truncate ${m.read ? "font-normal text-white/60" : "font-bold"}`, children: m.from }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/30", children: m.date })
              ] }),
              /* @__PURE__ */ jsx("p", { className: `text-xs truncate mt-0.5 ${m.read ? "text-white/40" : "text-white/80 font-medium"}`, children: m.subj }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-white/30 truncate", children: m.body })
            ] })
          ]
        },
        m.id
      ))
    ] })
  ] }) });
}
function BrowserApp() {
  const [history, setHistory] = useState([]);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const go = (u) => {
    const clean = u.trim().replace(/^https?:\/\//, "");
    if (!clean) return;
    setLoading(true);
    setTimeout(() => {
      setPage(clean);
      setHistory((h) => [clean, ...h.filter((x) => x !== clean)]);
      setUrl("");
      setLoading(false);
    }, 600);
  };
  const LINKS = {
    "vibenews.com": { title: "VibeNews", color: "#ef4444", lines: ["Breaking: New smartphone simulator goes viral \u{1F680}", "Tech: Instant app bundles are here", "Sports: Local team wins championship \u{1F3C6}", "Weather: Sunny week ahead"] },
    "vibegames.com": { title: "VibeGames \u{1F3AE}", color: "#8b5cf6", lines: ["\u{1F40D} Play Snake", "\u{1F9E9} Play Puzzle Blocks", "\u{1F3CE}\uFE0F Play Racer X", "\u{1F3C6} Leaderboards"] },
    "vibewiki.com": { title: "VibeWiki", color: "#3b82f6", lines: ["Article of the day: Smartphones", "Featured: History of the App Store", "Did you know? The first calculator weighed 60kg!", "Random: Video sharing platforms"] }
  };
  const known = Object.keys(LINKS).find((k) => page?.includes(k.split(".")[0]));
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-3 border-b border-white/10 flex gap-2.5 items-center sticky top-0 bg-slate-950/90 backdrop-blur z-10", children: [
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => setPage(null), disabled: !page, className: "text-indigo-400 disabled:text-white/20 text-xl", children: "\u2039" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: url,
            onChange: (e) => setUrl(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && go(url),
            placeholder: "Search or type a URL\u2026",
            className: "w-full px-4 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-indigo-500 placeholder-white/30 transition"
          }
        ),
        loading && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "absolute inset-0 rounded-full bg-slate-950/60 backdrop-blur flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { rotate: 360 },
              transition: { repeat: Infinity, duration: 0.8, ease: "linear" },
              className: "w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/60", children: "Loading\u2026" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.9 },
          onClick: () => go(url),
          className: "px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-xs font-bold shadow-lg shadow-indigo-600/40",
          children: "Go"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: !page ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx(motion.p, { animate: { rotate: [0, 10, -10, 0] }, transition: { repeat: Infinity, duration: 4 }, className: "text-6xl mb-6", children: "\u{1F310}" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-white/50 mb-5", children: "Search anything, or try visiting:" }),
      Object.entries(LINKS).map(([k, v], i) => /* @__PURE__ */ jsx(
        motion.button,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.1 },
          whileTap: { scale: 0.95 },
          onClick: () => go(k),
          className: "block w-full py-3.5 mx-auto max-w-xs rounded-2xl mb-2.5 text-white font-bold text-sm shadow-lg active:scale-95",
          style: { background: v.color },
          children: k
        },
        k
      )),
      history.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-white/40 mt-8 font-bold", children: "Recent" }),
        history.slice(0, 5).map((h) => /* @__PURE__ */ jsx("button", { onClick: () => setPage(h), className: "block mx-auto text-xs text-indigo-400 py-1.5", children: h }, h))
      ] })
    ] }) : known ? /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 text-white", style: { background: LINKS[known].color }, children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-extrabold", children: LINKS[known].title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs opacity-70 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: "\u{1F512}" }),
          page
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 space-y-3", children: LINKS[known].lines.map((l, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -15 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.08 },
          className: "p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 text-sm hover:bg-white/10 transition cursor-pointer",
          children: l
        },
        i
      )) })
    ] }, page) }) : /* @__PURE__ */ jsx(GoogleResults, { query: page, onGo: go }) })
  ] });
}
function GoogleResults({ query, onGo }) {
  const TEMPLATES = [
    (q) => ({ site: `www.${q.replace(/\s+/g, "")}guide.com`, title: `${cap(q)} \u2014 Complete Guide & Everything You Need to Know`, snippet: `Looking for ${q}? Here's a detailed guide covering all the basics, tips, examples, and frequently asked questions about ${q}.` }),
    (q) => ({ site: `${q.replace(/\s+/g, "")}.org`, title: `What is ${cap(q)}? Definition and Meaning`, snippet: `${cap(q)} explained simply. Learn what ${q} means, how it works, and why it matters \u2014 with examples and expert insights.` }),
    (q) => ({ site: `blog.${q.replace(/\s+/g, "")}hub.net`, title: `Top 10 ${cap(q)} Tips for 2026`, snippet: `Discover the best ${q} tips and tricks that actually work. Ranked and reviewed by our editors, updated this week.` }),
    (q) => ({ site: `forum.${q.replace(/\s+/g, "")}talk.io`, title: `${cap(q)} \u2014 discussion thread`, snippet: `Community discussion about ${q}. 342 replies \xB7 latest answer 2 hours ago \xB7 "I've been into ${q} for years, here's my take\u2026"` }),
    (q) => ({ site: `news.${q.replace(/\s+/g, "")}daily.com`, title: `Breaking: Latest news about ${cap(q)}`, snippet: `Stay updated with the latest ${q} news, analysis, and developments from around the world. Live coverage.` }),
    (q) => ({ site: `shop.${q.replace(/\s+/g, "")}store.com`, title: `Best ${cap(q)} products \u2014 Compare & Buy`, snippet: `Shop the top-rated ${q} products. Free shipping, 4.8\u2605 average rating, 30-day returns. Prices from $19.99.` })
  ];
  const results = TEMPLATES.map((t) => t(query));
  return /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "bg-white text-slate-800 min-h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-5 pb-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-medium tracking-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#4285F4]", children: "G" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#EA4335]", children: "o" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#FBBC05]", children: "o" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#4285F4]", children: "g" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#34A853]", children: "l" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#EA4335]", children: "e" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full ring-1 ring-slate-300 shadow-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-sm truncate flex-1", children: query }),
        /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "\u2715" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-2 text-xs text-slate-500 border-b border-slate-200", children: [
      "About ",
      (query.length * 12457).toLocaleString(),
      " results (0.",
      Math.max(20, query.length * 7),
      " seconds)"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 space-y-5", children: [
      results.map((r, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          className: "cursor-pointer active:opacity-60 transition",
          onClick: () => onGo(r.site),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px]", children: r.site[0].toUpperCase() }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-600", children: [
                /* @__PURE__ */ jsx("p", { className: "leading-tight", children: r.site.split(".")[1] }),
                /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[10px]", children: [
                  "https://",
                  r.site
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[17px] text-[#1a0dab] font-medium mt-1 leading-snug hover:underline", children: r.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-600 mt-0.5 leading-snug", children: r.snippet })
          ]
        },
        i
      )),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5 },
          className: "rounded-2xl ring-1 ring-slate-200 overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("p", { className: "px-4 pt-3 pb-1 text-lg font-medium", children: "People also ask" }),
            [`Is ${query} worth it?`, `How do I start with ${query}?`, `${cap(query)} for beginners?`].map((q, i) => /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-t border-slate-100 text-sm flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { children: q }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-lg", children: "+" })
            ] }, i))
          ]
        }
      )
    ] })
  ] });
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function GamesApp() {
  const [game, setGame] = useState(null);
  const [best, setBest] = useState({ snake: 0, memory: 0 });
  if (game) {
    const Back = () => /* @__PURE__ */ jsx("button", { onClick: () => setGame(null), className: "text-violet-300 text-lg font-bold", children: "\u2039 Arcade" });
    return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-violet-950 to-slate-950 text-white overflow-y-auto no-scrollbar", children: [
      game === "snake" && /* @__PURE__ */ jsx(Snake, { Back, best: best.snake, setBest: (s) => setBest((b) => ({ ...b, snake: Math.max(b.snake, s) })) }),
      game === "memory" && /* @__PURE__ */ jsx(Memory, { Back, best: best.memory, setBest: (s) => setBest((b) => ({ ...b, memory: Math.min(b.memory || 999, s) })) }),
      game === "ttt" && /* @__PURE__ */ jsx(TicTacToe, { Back })
    ] });
  }
  const GAMES = [
    { id: "snake", name: "Snake", icon: "\u{1F40D}", desc: "Eat, grow, don't crash!", bg: "linear-gradient(135deg,#22c55e,#158038)" },
    { id: "memory", name: "Memory Match", icon: "\u{1F0CF}", desc: "Find all the pairs", bg: "linear-gradient(135deg,#f59e0b,#b45309)" },
    { id: "ttt", name: "Tic-Tac-Toe", icon: "\u274C\u2B55", desc: "Beat the AI", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-violet-950 to-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 pb-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent", children: "\u{1F579}\uFE0F Arcade" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40 mt-1", children: "3 games \xB7 high scores saved" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 space-y-3 pb-16", children: [
      GAMES.map((g, i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.1 },
          whileTap: { scale: 0.96 },
          onClick: () => setGame(g.id),
          className: "w-full flex items-center gap-4 p-4 rounded-3xl ring-1 ring-white/10 shadow-xl text-left active:scale-[0.98] transition",
          style: { background: g.bg },
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl", children: g.icon }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-lg", children: g.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: g.desc })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-white/60 text-xl", children: "\u203A" })
          ]
        },
        g.id
      )),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-3xl bg-white/5 ring-1 ring-white/10", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-white/40 font-bold tracking-wider mb-2", children: "\u{1F3C6} High Scores" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          "\u{1F40D} Snake: ",
          /* @__PURE__ */ jsx("b", { className: "text-emerald-400", children: best.snake })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          "\u{1F0CF} Memory: ",
          /* @__PURE__ */ jsx("b", { className: "text-amber-400", children: best.memory || best.memory === 0 ? `${best.memory} moves` : "\u2014" })
        ] })
      ] })
    ] })
  ] });
}
function Snake({ Back, best, setBest }) {
  const SIZE = 15, CELL = 20;
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSnake((s) => {
        const d = dirRef.current;
        const head = { x: s[0].x + d.x, y: s[0].y + d.y };
        if (head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE || s.some((p) => p.x === head.x && p.y === head.y)) {
          setDead(true);
          setRunning(false);
          setScore((sc) => {
            setBest(sc);
            return sc;
          });
          return s;
        }
        const ns = [head, ...s];
        if (head.x === food.x && head.y === food.y) {
          setScore((sc) => sc + 1);
          let nf;
          do {
            nf = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
          } while (ns.some((p) => p.x === nf.x && p.y === nf.y));
          setFood(nf);
        } else ns.pop();
        return ns;
      });
    }, 220);
    return () => clearInterval(t);
  }, [running, food]);
  const turn = (x, y) => {
    const d = dirRef.current;
    if (d.x === -x && d.y === -y) return;
    setDir({ x, y });
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx(Back, {}),
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold", children: [
        "\u{1F40D} Score: ",
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: score }),
        " \xB7 Best: ",
        best
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative rounded-2xl ring-2 ring-white/20 overflow-hidden shadow-2xl bg-slate-900",
        style: { width: SIZE * CELL, height: SIZE * CELL },
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { scale: [1, 1.3, 1] },
              transition: { repeat: Infinity, duration: 0.7 },
              className: "absolute rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]",
              style: { left: food.x * CELL + 2, top: food.y * CELL + 2, width: CELL - 4, height: CELL - 4 }
            }
          ),
          snake.map((p, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute rounded-[4px]",
              style: {
                left: p.x * CELL + 1,
                top: p.y * CELL + 1,
                width: CELL - 2,
                height: CELL - 2,
                background: i === 0 ? "#4ade80" : `rgba(34,197,94,${Math.max(0.25, 1 - i * 0.05)})`,
                boxShadow: i === 0 ? "0 0 8px rgba(74,222,128,0.8)" : "none"
              }
            },
            i
          )),
          (!running || dead) && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold", children: dead ? "\u{1F480} Game Over!" : "\u{1F40D} Snake" }),
            dead && /* @__PURE__ */ jsxs("p", { className: "text-sm text-white/60", children: [
              "Score: ",
              score
            ] }),
            /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
              setSnake([{ x: 7, y: 7 }]);
              setDir({ x: 1, y: 0 });
              dirRef.current = { x: 1, y: 0 };
              setFood({ x: 3, y: 3 });
              setScore(0);
              setDead(false);
              setRunning(true);
            }, className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold shadow-lg", children: dead ? "Play Again" : "Start" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mt-2", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => turn(0, -1), className: "w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl", children: "\u2191" }),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => turn(-1, 0), className: "w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl", children: "\u2190" }),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => {
        setRunning((r) => !r);
      }, className: "w-14 h-12 rounded-xl bg-emerald-600/40 ring-1 ring-emerald-500/40 text-lg", children: running ? "\u23F8" : "\u25B6" }),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => turn(1, 0), className: "w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl", children: "\u2192" }),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.85 }, onClick: () => turn(0, 1), className: "w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl", children: "\u2193" }),
      /* @__PURE__ */ jsx("span", {})
    ] })
  ] });
}
function Memory({ Back, best, setBest }) {
  const EMOJI = ["\u{1F355}", "\u{1F680}", "\u{1F431}", "\u{1F308}", "\u{1F3B8}", "\u26BD", "\u{1F984}", "\u{1F369}"];
  const [cards, setCards] = useState(() => [...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, e, open: false, done: false })));
  const [sel, setSel] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const flip = (c) => {
    if (c.done || c.open || sel.length === 2) return;
    const ns = cards.map((x) => x.id === c.id ? { ...x, open: true } : x);
    setCards(ns);
    const nSel = [...sel, c];
    setSel(nSel);
    if (nSel.length === 2) {
      setMoves((m) => m + 1);
      if (nSel[0].e === nSel[1].e) {
        setTimeout(() => {
          setCards((cs) => cs.map((x) => x.e === nSel[0].e ? { ...x, done: true, open: true } : x));
          setSel([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((cs) => cs.map((x) => x.id === nSel[0].id || x.id === nSel[1].id ? { ...x, open: false } : x));
          setSel([]);
        }, 700);
      }
    }
  };
  const doneCount = cards.filter((c) => c.done).length;
  useEffect(() => {
    if (doneCount === cards.length && cards.length > 0 && !won) {
      setWon(true);
      setBest(moves + 1);
    }
  }, [doneCount]);
  return /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx(Back, {}),
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold", children: [
        "\u{1F0CF} Moves: ",
        /* @__PURE__ */ jsx("span", { className: "text-amber-400", children: moves }),
        best ? ` \xB7 Best: ${best}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2.5", children: cards.map((c) => /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.9 },
        onClick: () => flip(c),
        className: "w-[62px] h-[62px] rounded-2xl perspective-1000",
        style: { opacity: c.done ? 0.35 : 1 },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            animate: { rotateY: c.open ? 180 : 0 },
            transition: { duration: 0.3 },
            className: "w-full h-full flex items-center justify-center text-2xl rounded-2xl",
            style: {
              background: c.open || c.done ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "linear-gradient(135deg,#312e81,#4338ca)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            },
            children: /* @__PURE__ */ jsx("span", { style: { transform: c.open ? "rotateY(180deg)" : "none", display: "inline-block" }, children: c.open || c.done ? c.e : "\u2753" })
          }
        )
      },
      c.id
    )) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: won && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-50",
        children: [
          /* @__PURE__ */ jsx(
            motion.p,
            {
              animate: { rotate: [0, 10, -10, 0] },
              transition: { repeat: Infinity, duration: 0.8 },
              className: "text-6xl",
              children: "\u{1F389}"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold", children: "You Win!" }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-sm", children: [
            "Completed in ",
            moves,
            " moves"
          ] }),
          /* @__PURE__ */ jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
            setCards([...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, e, open: false, done: false })));
            setSel([]);
            setMoves(0);
            setWon(false);
          }, className: "mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 font-bold shadow-lg", children: "Play Again" })
        ]
      }
    ) })
  ] });
}
function TicTacToe({ Back }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({ w: 0, l: 0, d: 0 });
  const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const checkWin = (b) => {
    for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    return b.every((x) => x) ? "draw" : null;
  };
  const aiMove = (b) => {
    const tryLine = (p) => {
      for (const [a, c, d] of LINES) {
        const line = [a, c, d];
        const vals = line.map((i) => b[i]);
        if (vals.filter((v) => v === p).length === 2 && vals.includes(null)) return line[vals.indexOf(null)];
      }
      return null;
    };
    return tryLine("O") ?? tryLine("X") ?? (b[4] === null ? 4 : [0, 2, 6, 8, 1, 3, 5, 7].find((i) => b[i] === null));
  };
  const play = (i) => {
    if (board[i] || winner) return;
    const nb = [...board];
    nb[i] = "X";
    let w = checkWin(nb);
    if (!w) {
      const ai = aiMove(nb);
      if (ai !== void 0 && ai !== null) nb[ai] = "O";
      w = checkWin(nb);
    }
    setBoard(nb);
    if (w) {
      setWinner(w);
      if (w === "X") setStats((s) => ({ ...s, w: s.w + 1 }));
      else if (w === "O") setStats((s) => ({ ...s, l: s.l + 1 }));
      else setStats((s) => ({ ...s, d: s.d + 1 }));
    }
  };
  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx(Back, {}),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/50", children: [
        "You: ",
        /* @__PURE__ */ jsxs("b", { className: "text-blue-400", children: [
          stats.w,
          "W"
        ] }),
        " \xB7 AI: ",
        /* @__PURE__ */ jsxs("b", { className: "text-red-400", children: [
          stats.l,
          "L"
        ] }),
        " \xB7 ",
        stats.d,
        "D"
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: winner === "draw" ? "\u{1F91D} It's a draw!" : winner === "X" ? "\u{1F389} You win!" : winner === "O" ? "\u{1F916} AI wins!" : turn === "X" ? "Your turn (X)" : "AI thinking\u2026" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2.5", children: board.map((c, i) => /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.88 },
        onClick: () => play(i),
        className: "w-[86px] h-[86px] rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-4xl font-black shadow-lg",
        style: { color: c === "X" ? "#60a5fa" : "#f87171" },
        children: c && /* @__PURE__ */ jsx(motion.span, { initial: { scale: 0, rotate: -30 }, animate: { scale: 1, rotate: 0 }, transition: { type: "spring", stiffness: 300 }, children: c })
      },
      i
    )) }),
    (winner || board.every((x) => x)) && /* @__PURE__ */ jsx(
      motion.button,
      {
        whileTap: { scale: 0.9 },
        onClick: reset,
        className: "px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 font-bold shadow-lg",
        children: "Play Again"
      }
    )
  ] });
}
function AssistantApp({ openApp, notify }) {
  const [msgs, setMsgs] = useState([
    { me: false, t: `Hi! I'm Vibe AI \u2728 \u2014 your phone's assistant. Try:
\u2022 "open calculator"
\u2022 "what's 25 \xD7 4"
\u2022 "what time is it"
\u2022 "tell me a joke"` }
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);
  const respond = (q) => {
    const m = q.toLowerCase();
    const openMatch = m.match(/\b(?:open|launch|start|go to)\s+(.+)/);
    if (openMatch) {
      const target = openMatch[1].trim();
      const app = APPS.find((a) => target.includes(a.name.toLowerCase()) || target.includes(a.id));
      if (app) {
        setTimeout(() => {
          notify("\u2728", "Vibe AI", `Opening ${app.name}\u2026`);
          openApp(app.id);
        }, 900);
        return `Opening ${app.name} ${app.icon}\u2026`;
      }
      return `Hmm, I couldn't find an app called "${target}". Try "open settings" or "open arcade".`;
    }
    const mathMatch = m.match(/(?:what'?s|calculate|compute)?\s*(-?[\d.]+)\s*([+\-×x*÷/]+)\s*(-?[\d.]+)/);
    if (mathMatch && /(what'?s|calculate|compute|\d\s*[+\-×x*÷/])/.test(m)) {
      const a = parseFloat(mathMatch[1]), b = parseFloat(mathMatch[3]);
      const o = mathMatch[2];
      const r = o === "+" ? a + b : o === "-" ? a - b : o === "\xD7" || o === "x" || o === "*" ? a * b : b === 0 ? "undefined (division by zero!)" : +(a / b).toFixed(6);
      return `\u{1F9EE} ${a} ${o} ${b} = ${r}`;
    }
    if (/\b(time|clock)\b/.test(m)) return `\u{1F550} It's ${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`;
    if (/\b(date|today)\b/.test(m)) return `\u{1F4C5} Today is ${(/* @__PURE__ */ new Date()).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}.`;
    if (/\b(joke|funny)\b/.test(m)) {
      const jokes = ["Why do programmers prefer dark mode? Because light attracts bugs! \u{1F41B}", "I told my phone a joke about airplane mode\u2026 it didn't respond. \u2708\uFE0F", "Why did the smartphone go to therapy? Too many hang-ups! \u{1F4F1}", "There are 10 types of people: those who understand binary and those who don't. \u{1F604}"];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (/\b(weather)\b/.test(m)) return "\u26C5 Today in Tehran: 19\xB0 and sunny. Open the Weather app for the full forecast!";
    if (/\b(battery)\b/.test(m)) return "\u{1F50B} Battery is at 83%. Should easily last the whole day!";
    if (/\b(hi|hello|hey)\b/.test(m)) return "Hey! \u{1F44B} What can I do for you?";
    if (/\b(who are you|your name)\b/.test(m)) return "I'm Vibe AI, the assistant built into your phone \u2728. I can open apps, do math, tell jokes, and more!";
    if (/\b(thanks|thank you)\b/.test(m)) return "Anytime! \u{1F338}";
    const fallback = ["Interesting! Tell me more.", `I'm not sure about that one \u2014 try "open settings" or ask me some math!`, "Hmm \u{1F914} could you rephrase that?", "I can open apps, do math, tell the time, or crack a joke \u2014 what'll it be?"];
    return fallback[Math.floor(Math.random() * fallback.length)];
  };
  const send = (override) => {
    const q = (override ?? draft).trim();
    if (!q) return;
    setMsgs((ms) => [...ms, { me: true, t: q }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((ms) => [...ms, { me: false, t: respond(q) }]);
      setThinking(false);
    }, 900);
  };
  const QUICK = ["\u{1F558} What time is it?", "\u{1F9EE} What's 12 \xD7 12?", "\u{1F604} Tell me a joke", "\u2699\uFE0F Open settings"];
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-gradient-to-b from-teal-950 via-slate-950 to-black text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 pb-3 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { scale: thinking ? [1, 1.1, 1] : [1, 1.04, 1] },
          transition: { repeat: Infinity, duration: thinking ? 0.8 : 3 },
          className: "w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-cyan-700 flex items-center justify-center text-3xl shadow-xl shadow-teal-500/30 ring-2 ring-teal-400/40",
          children: "\u2728"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "font-extrabold text-lg mt-2 bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent", children: "Vibe AI" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar px-4 flex flex-col gap-2.5", children: [
      msgs.map((m, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: `max-w-[82%] px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${m.me ? "bg-gradient-to-br from-teal-500 to-cyan-700 self-end rounded-3xl rounded-br-md shadow-lg" : "bg-white/10 self-start rounded-3xl rounded-bl-md ring-1 ring-white/10"}`,
          children: m.t
        },
        i
      )),
      thinking && /* @__PURE__ */ jsx("div", { className: "bg-white/10 self-start rounded-3xl rounded-bl-md px-4 py-3 flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
        motion.span,
        {
          animate: { y: [0, -4, 0] },
          transition: { repeat: Infinity, duration: 0.8, delay: i * 0.15 },
          className: "w-1.5 h-1.5 rounded-full bg-teal-300"
        },
        i
      )) }),
      /* @__PURE__ */ jsx("div", { ref: endRef })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3 pb-3 flex gap-2 overflow-x-auto no-scrollbar", children: QUICK.map((q) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => send(q.slice(2)),
        className: "shrink-0 px-3.5 py-1.5 rounded-full bg-teal-500/15 ring-1 ring-teal-400/30 text-xs text-teal-200 font-medium active:scale-95 transition",
        children: q
      },
      q
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "p-3.5 flex gap-2.5 border-t border-white/10", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: draft,
          onChange: (e) => setDraft(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && send(),
          placeholder: "Ask me anything\u2026",
          className: "flex-1 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-teal-500 placeholder-white/30"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileTap: { scale: 0.85 },
          onClick: send,
          className: "w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-700 flex items-center justify-center shadow-lg shadow-teal-500/40",
          children: "\u27A4"
        }
      )
    ] })
  ] });
}
function SettingsApp({ installed, setInstalled, wallpaper, setWallpaper, notify }) {
  const [tab, setTab] = useState("main");
  const [brightness, setBrightness] = useState(85);
  const [darkMode, setDarkMode] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [battery, setBattery] = useState(83);
  const coreApps = ["store", "settings", "assistant"];
  const uninstallable = installed.filter((id) => !coreApps.includes(id));
  const Row = ({ icon, label, value, onClick, danger }) => /* @__PURE__ */ jsxs(
    motion.button,
    {
      whileTap: { scale: 0.98 },
      onClick,
      className: `w-full flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5 text-left ${danger ? "text-red-400" : ""}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl w-8 text-center", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 text-sm font-medium", children: label }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-white/40", children: value }),
        /* @__PURE__ */ jsx("span", { className: "text-white/30", children: "\u203A" })
      ]
    }
  );
  const Toggle = ({ on, set }) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => set(!on),
      className: `w-12 h-7 rounded-full transition relative ${on ? "bg-blue-600" : "bg-white/15"}`,
      children: /* @__PURE__ */ jsx(
        motion.span,
        {
          layout: true,
          transition: { type: "spring", stiffness: 500, damping: 30 },
          className: `absolute top-0.5 w-6 h-6 rounded-full bg-white shadow ${on ? "right-0.5" : "left-0.5"}`
        }
      )
    }
  );
  if (tab === "wallpaper") {
    return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setTab("main"), className: "text-blue-400 text-xl", children: "\u2039" }),
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Wallpaper" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto no-scrollbar p-4 grid grid-cols-2 gap-3 pb-16", children: WALLPAPERS.map((w, i) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.93 },
          onClick: () => {
            setWallpaper(i);
            notify("\u2699\uFE0F", "Settings", `Wallpaper set to ${w.name}`);
          },
          className: "relative h-40 rounded-3xl overflow-hidden ring-2 transition",
          style: { background: w.css, boxShadow: wallpaper === i ? "0 0 0 3px #3b82f6" : "none" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl", style: { background: w.blob[0] } }),
            /* @__PURE__ */ jsx("p", { className: "absolute bottom-3 left-4 text-sm font-bold drop-shadow", children: w.name }),
            wallpaper === i && /* @__PURE__ */ jsx("span", { className: "absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs", children: "\u2713" })
          ]
        },
        w.name
      )) })
    ] });
  }
  if (tab === "apps") {
    return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setTab("main"), className: "text-blue-400 text-xl", children: "\u2039" }),
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Manage Apps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: [
        /* @__PURE__ */ jsx("p", { className: "px-5 pt-3 text-[10px] uppercase text-white/40 font-bold", children: "Installed apps" }),
        uninstallable.map((id) => {
          const a = APPS.find((x) => x.id === id);
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow", style: { background: a.bg }, children: a.icon }),
            /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm font-medium", children: a.name }),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                whileTap: { scale: 0.85 },
                onClick: () => {
                  setInstalled((prev) => prev.filter((x) => x !== id));
                  notify("\u2699\uFE0F", "Settings", `${a.name} was uninstalled`);
                },
                className: "px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-bold ring-1 ring-red-500/30",
                children: "Uninstall"
              }
            )
          ] }, id);
        }),
        /* @__PURE__ */ jsx("p", { className: "px-5 py-4 text-[11px] text-white/30", children: "Core apps (App Store, Settings, Vibe AI) can't be uninstalled. Reinstall any app from the App Store." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-full bg-slate-950 text-white flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 pb-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-extrabold", children: "Settings" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-3 p-4 rounded-3xl bg-gradient-to-r from-blue-600/30 to-violet-600/30 ring-1 ring-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-violet-700 flex items-center justify-center text-xl font-bold shadow-lg", children: "\u{1F464}" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: "User" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/50", children: [
            "Vibe Account \xB7 ",
            installed.length,
            " apps installed"
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold", children: "PRO" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar pb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "px-5 pt-2 pb-1 text-[10px] uppercase text-white/40 font-bold", children: "Appearance" }),
      /* @__PURE__ */ jsx(Row, { icon: "\u{1F5BC}\uFE0F", label: "Wallpaper", value: WALLPAPERS[wallpaper]?.name, onClick: () => setTab("wallpaper") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl w-8 text-center", children: "\u2600\uFE0F" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Brightness" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "30",
              max: "100",
              value: brightness,
              onChange: (e) => setBrightness(+e.target.value),
              className: "w-full mt-2 accent-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/40 w-8", children: [
          brightness,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl w-8 text-center", children: "\u{1F319}" }),
        /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm font-medium", children: "Dark Mode" }),
        /* @__PURE__ */ jsx(Toggle, { on: darkMode, set: setDarkMode })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "px-5 pt-3 pb-1 text-[10px] uppercase text-white/40 font-bold", children: "General" }),
      /* @__PURE__ */ jsx(Row, { icon: "\u{1F4E6}", label: "Manage Apps", value: `${installed.length} installed`, onClick: () => setTab("apps") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl w-8 text-center", children: "\u{1F50B}" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Battery" }),
          /* @__PURE__ */ jsx("div", { className: "h-1.5 mt-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { animate: { width: `${battery}%` }, className: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500" }) })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-400", children: [
          battery,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl w-8 text-center", children: "\u{1F319}" }),
        /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm font-medium", children: "Do Not Disturb" }),
        /* @__PURE__ */ jsx(Toggle, { on: dnd, set: (v) => {
          setDnd(v);
          notify("\u2699\uFE0F", "Settings", v ? "Do Not Disturb is ON" : "Do Not Disturb is OFF");
        } })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "px-5 pt-3 pb-1 text-[10px] uppercase text-white/40 font-bold", children: "About" }),
      /* @__PURE__ */ jsx(Row, { icon: "\u{1F4F1}", label: "VibeOS", value: "Version 3.0", onClick: () => notify("\u{1F4F1}", "VibeOS", "You're on the latest version! \u{1F389}") }),
      /* @__PURE__ */ jsx(Row, { icon: "\u2139\uFE0F", label: "Storage", value: "18.4 GB / 64 GB", onClick: () => {
      } }),
      /* @__PURE__ */ jsx("div", { className: "p-5 text-center text-[10px] text-white/25", children: "Smartphone Simulator Pro \u{1F680}" })
    ] })
  ] });
}
export {
  App as default
};
