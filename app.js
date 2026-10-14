// Smartphone Simulator Pro — app.js
// React / ReactDOM / framer-motion are loaded as globals from index.html
const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.Motion;


// ============================= ICONS =============================
const I = {
  phone: "📞", messages: "💬", camera: "📷", photos: "🖼️",
  store: "🛍️", tube: "▶️", calc: "🧮", clock: "🕐", notes: "📝", music: "🎵",
  maps: "🗺️", weather: "⛅", mail: "✉️", browser: "🌐",
};

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ============================= PHONE =============================
function App() {
  const [locked, setLocked] = useState(true);
  const [screen, setScreen] = useState("home");
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(["phone", "messages", "camera", "photos", "calc", "clock", "notes", "store", "tube", "games", "assistant", "settings"]);
  const [wallpaper, setWallpaper] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [notif, setNotif] = useState(null); // banner notification
  const [time, setTime] = useState(now());
  const [secondFlash, setSecondFlash] = useState(0);
  useEffect(() => { const t = setInterval(() => { setTime(now()); setSecondFlash(s => s + 1); }, 1000); return () => clearInterval(t); }, []);

  const [fit, setFit] = useState(1);
  useEffect(() => {
    const calc = () => setFit(Math.min(1, (window.innerHeight - 56) / 800, (window.innerWidth - 16) / 390));
    calc(); window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const open = (id) => { setApp(id); setScreen("app"); };
  const goHome = () => setScreen("home");

  const allApps = APPS.filter(a => installed.includes(a.id));
  const currentApp = APPS.find(a => a.id === app);

  const notify = (icon, title, body) => {
    setNotif({ icon, title, body });
    setTimeout(() => setNotif(null), 3200);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0614] overflow-hidden">
      {/* ambient glow background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" />

      <p className="mb-4 text-white/40 text-xs tracking-widest uppercase font-semibold">Smartphone Simulator Pro</p>

      {/* Phone frame */}
      <div style={{ transform: `scale(${fit})`, transformOrigin: "center center", flexShrink: 0 }} className="relative w-[390px] h-[800px] rounded-[3.4rem] p-[3px] bg-gradient-to-b from-slate-500 via-slate-800 to-slate-600 shadow-[0_0_60px_-10px_rgba(147,51,234,0.6)]">
        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-[#1a1a1f] bg-black overflow-hidden">
          {/* Side buttons */}
          <div className="absolute -right-[13px] top-24 w-[3px] h-16 bg-slate-700 rounded-r" />
          <div className="absolute -right-[13px] top-44 w-[3px] h-8 bg-slate-700 rounded-r" />
          <div className="absolute -left-[13px] top-32 w-[3px] h-10 bg-slate-700 rounded-l" />

          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 z-[60] flex justify-between items-center px-8 pt-3.5 text-white text-xs font-semibold pointer-events-none">
            <span className="tabular-nums">{time}</span>
            <span className="flex gap-1.5 items-center text-[10px]">
              <span>📶</span><span>📶</span><span>🔋</span><span className="text-emerald-300">83%</span>
            </span>
          </div>
          {/* Dynamic island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-[26px] bg-black rounded-full z-[70] border border-white/5 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-800 ring-1 ring-slate-700" />
          </div>

          {/* Notification banner */}
          <AnimatePresence>
            {notif && (
              <motion.div
                initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute top-12 left-3 right-3 z-[65] rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-3 flex items-center gap-3 shadow-xl cursor-pointer"
                onClick={() => setNotif(null)}>
                <span className="text-2xl">{notif.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white">{notif.title}</p>
                  <p className="text-[11px] text-white/60 truncate">{notif.body}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="absolute inset-0 pt-12 overflow-hidden">
            <AnimatePresence mode="wait">
              {locked ? (
                <motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="h-full"><LockScreen time={time} onUnlock={() => setLocked(false)} /></motion.div>
              ) : screen === "home" ? (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="h-full"><HomeScreen apps={allApps} onOpen={open} wallpaper={wallpaper} /></motion.div>
              ) : (
                <motion.div key={app} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="h-full">
                  <AppScreen id={app} onHome={goHome} installed={installed} setInstalled={setInstalled}
                    gallery={gallery} setGallery={setGallery} videos={videos} setVideos={setVideos}
                    notify={notify} secondFlash={secondFlash}
                    wallpaper={wallpaper} setWallpaper={setWallpaper} openApp={open} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home bar */}
          {!locked && (
            <motion.button onClick={goHome} whileTap={{ scale: 0.85 }}
              className="absolute bottom-2 left-0 right-0 mx-auto w-36 h-[5px] bg-white/80 rounded-full z-[60] shadow" aria-label="home" />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================= LOCK SCREEN =============================
function LockScreen({ time, onUnlock }) {
  const date = new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  return (
    <div className="h-full flex flex-col items-center relative bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#0c0a1f] overflow-hidden">
      {/* decorative stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="absolute rounded-full bg-white/40"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 80}%`, width: 2, height: 2, opacity: 0.2 + (i % 5) * 0.12 }} />
      ))}
      {/* moon */}
      <div className="absolute top-24 right-14 w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 shadow-[0_0_40px_rgba(255,255,255,0.4)]" />

      <div className="pt-16 text-center text-white">
        <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-[76px] font-extralight leading-none tabular-nums tracking-tight">{time}</motion.p>
        <p className="text-sm text-white/60 mt-2">{date}</p>
      </div>

      <div className="mt-10 space-y-2 w-full px-4">
        {[["💬", "Messages", "Mom ❤️: Coming home soon?"], ["✉️", "Mail", "Vibe Team: Welcome to Mail!"]].map(([ic, t, b], i) => (
          <motion.div key={t} initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10">
            <span className="text-xl">{ic}</span>
            <div className="min-w-0"><p className="text-xs font-bold">{t}</p><p className="text-[11px] text-white/60 truncate">{b}</p></div>
          </motion.div>
        ))}
      </div>

      <motion.button onClick={onUnlock} whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="mt-auto mb-10 px-8 py-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold">
        ⇡ Swipe up to unlock
      </motion.button>
    </div>
  );
}

// ============================= HOME SCREEN =============================
const WALLPAPERS = [
  { name: "Nebula", css: "linear-gradient(135deg,#141428,#2a1a4a,#0c0a1f)", blob: ["rgba(147,51,234,0.4)", "rgba(37,99,235,0.3)", "rgba(219,39,119,0.25)"] },
  { name: "Sunset", css: "linear-gradient(135deg,#7c2d12,#9a3412,#1c1917)", blob: ["rgba(249,115,22,0.4)", "rgba(234,88,12,0.3)", "rgba(239,68,68,0.25)"] },
  { name: "Ocean", css: "linear-gradient(135deg,#0c4a6e,#075985,#082f49)", blob: ["rgba(56,189,248,0.4)", "rgba(14,165,233,0.3)", "rgba(6,182,212,0.25)"] },
  { name: "Forest", css: "linear-gradient(135deg,#14532d,#166534,#052e16)", blob: ["rgba(74,222,128,0.35)", "rgba(34,197,94,0.3)", "rgba(16,185,129,0.25)"] },
  { name: "Mono", css: "linear-gradient(135deg,#1f2937,#374151,#111827)", blob: ["rgba(148,163,184,0.25)", "rgba(100,116,139,0.25)", "rgba(203,213,225,0.15)"] },
  { name: "Candy", css: "linear-gradient(135deg,#831843,#9d174d,#500724)", blob: ["rgba(244,114,182,0.4)", "rgba(251,146,60,0.3)", "rgba(168,85,247,0.25)"] },
];

function HomeScreen({ apps, onOpen, wallpaper }) {
  const [page, setPage] = useState(0);
  const perPage = 16;
  const pages = Math.ceil(apps.length / perPage) || 1;
  const pageApps = apps.slice(page * perPage, (page + 1) * perPage);
  const dock = ["phone", "messages", "camera", "store"].filter(id => apps.some(a => a.id === id));
  const wp = WALLPAPERS[wallpaper] || WALLPAPERS[0];

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: wp.css }}>
      {/* wallpaper blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl" style={{ background: wp.blob[0] }} />
      <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full blur-3xl" style={{ background: wp.blob[1] }} />
      <div className="absolute -bottom-24 right-10 w-72 h-72 rounded-full blur-3xl" style={{ background: wp.blob[2] }} />

      {/* swipe page */}
      <div className="flex-1 px-6 pt-6 relative">
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
            className="grid grid-cols-4 gap-x-5 gap-y-7">
            {pageApps.map((a, i) => (
              <motion.button key={a.id} onClick={() => onOpen(a.id)}
                whileTap={{ scale: 0.82 }} className="flex flex-col items-center gap-1.5">
                <div className="w-[60px] h-[60px] rounded-[1.35rem] flex items-center justify-center text-[28px] shadow-lg shadow-black/40 ring-1 ring-white/20"
                  style={{ background: a.bg }}>{a.icon}</div>
                <span className="text-[10px] text-white/90 font-medium drop-shadow">{a.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 pb-4 relative">
        {Array.from({ length: pages }).map((_, i) => (
          <motion.button key={i} onClick={() => setPage(i)} whileTap={{ scale: 1.5 }}
            className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-white" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>

      <div className="mx-4 mb-10 px-4 py-3.5 rounded-[2.2rem] bg-white/10 backdrop-blur-2xl border border-white/15 flex justify-around shadow-xl">
        {dock.map(id => {
          const a = apps.find(x => x.id === id);
          return (
            <motion.button key={id} onClick={() => onOpen(id)} whileTap={{ scale: 0.8 }}
              className="w-[54px] h-[54px] rounded-[1.3rem] flex items-center justify-center text-2xl shadow-lg shadow-black/30 ring-1 ring-white/20"
              style={{ background: a.bg }}>{a.icon}</motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ============================= APP ROUTER =============================
function AppScreen({ id, installed, setInstalled, gallery, setGallery, videos, setVideos, notify, secondFlash, wallpaper, setWallpaper, openApp }) {
  switch (id) {
    case "calc": return <Calculator />;
    case "store": return <AppStore installed={installed} setInstalled={setInstalled} notify={notify} />;
    case "tube": return <TubeApp videos={videos} setVideos={setVideos} notify={notify} />;
    case "photos": return <Gallery gallery={gallery} setGallery={setGallery} />;
    case "phone": return <PhoneApp />;
    case "messages": return <MessagesApp notify={notify} />;
    case "camera": return <CameraApp setGallery={setGallery} notify={notify} />;
    case "clock": return <ClockApp secondFlash={secondFlash} />;
    case "notes": return <NotesApp />;
    case "music": return <MusicApp />;
    case "weather": return <WeatherApp />;
    case "maps": return <MapsApp />;
    case "mail": return <MailApp notify={notify} />;
    case "browser": return <BrowserApp />;
    case "games": return <GamesApp />;
    case "assistant": return <AssistantApp openApp={openApp} notify={notify} />;
    case "settings": return <SettingsApp installed={installed} setInstalled={setInstalled} wallpaper={wallpaper} setWallpaper={setWallpaper} notify={notify} />;
    default: return (
      <div className="h-full flex flex-col items-center justify-center gap-3 bg-slate-950 text-white">
        <div className="text-5xl">{APPS.find(a => a.id === id)?.icon}</div>
        <p className="text-lg font-semibold">{APPS.find(a => a.id === id)?.name}</p>
      </div>
    );
  }
}

// ============================= APP REGISTRY =============================
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
  { id: "games", name: "Arcade", icon: "🕹️", bg: "linear-gradient(135deg,#7c3aed,#4c1d95)" },
  { id: "assistant", name: "Vibe AI", icon: "✨", bg: "linear-gradient(135deg,#2dd4bf,#0e7490)" },
  { id: "settings", name: "Settings", icon: "⚙️", bg: "linear-gradient(135deg,#94a3b8,#475569)" },
];

// ============================= SHARED UI =============================
const Header = ({ icon, title, right, accent = "text-white" }) => (
  <div className="flex items-center justify-between px-5 pt-3 pb-3 sticky top-0 z-10 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
    <h1 className={`text-xl font-bold flex items-center gap-2 ${accent}`}>{icon} {title}</h1>
    {right}
  </div>
);

// ============================= CALCULATOR =============================
function Calculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(true);
  const [history, setHistory] = useState([]);

  const inputDigit = (d) => {
    if (fresh) { setDisplay(d); setFresh(false); }
    else setDisplay(display === "0" ? d : display.length < 12 ? display + d : display);
  };
  const compute = (a, b, o) => ({ "+": a + b, "−": a - b, "×": a * b, "÷": b === 0 ? NaN : a / b }[o]);
  const setOperation = (o) => {
    const cur = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const r = compute(acc, cur, op);
      setAcc(r); setDisplay(String(+r.toFixed(10)));
    } else setAcc(cur);
    setOp(o); setFresh(true);
  };
  const equals = () => {
    if (acc === null || !op) return;
    const cur = parseFloat(display);
    const r = compute(acc, cur, op);
    setHistory(h => [{ expr: `${acc} ${op} ${cur}`, res: +r.toFixed(10) }, ...h].slice(0, 5));
    setDisplay(String(+r.toFixed(10)));
    setAcc(null); setOp(null); setFresh(true);
  };
  const clear = () => { setDisplay("0"); setAcc(null); setOp(null); setFresh(true); };

  const Btn = ({ label, onClick, cls = "", span }) => (
    <motion.button onClick={onClick} whileTap={{ scale: 0.88 }}
      className={`h-16 rounded-full text-xl font-medium shadow-lg ${span ? "col-span-2" : ""} ${cls}`}>{label}</motion.button>
  );

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 to-black text-white flex flex-col p-4">
      <div className="flex-1 flex flex-col justify-end items-end gap-1.5 pb-4 overflow-hidden">
        <AnimatePresence>
          {history.map((h, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1 - i * 0.18, y: 0 }}
              className="text-white/40 text-sm tabular-nums">{h.expr} = {h.res}</motion.p>
          ))}
        </AnimatePresence>
      </div>
      <div className="text-right text-[64px] font-thin truncate px-2 pb-6 tabular-nums leading-none"
        key={display}
      >{display}</div>
      <div className="grid grid-cols-4 gap-3 pb-12">
        <Btn label="AC" onClick={clear} cls="bg-slate-600 text-white" />
        <Btn label="±" onClick={() => setDisplay(String(-parseFloat(display)))} cls="bg-slate-600 text-white" />
        <Btn label="%" onClick={() => setDisplay(String(parseFloat(display) / 100))} cls="bg-slate-600 text-white" />
        <Btn label="÷" onClick={() => setOperation("÷")} cls={op === "÷" ? "bg-white text-orange-600 font-bold" : "bg-orange-600"} />
        {["7", "8", "9"].map(d => <Btn key={d} label={d} onClick={() => inputDigit(d)} cls="bg-slate-800 ring-1 ring-white/5" />)}
        <Btn label="×" onClick={() => setOperation("×")} cls={op === "×" ? "bg-white text-orange-600 font-bold" : "bg-orange-600"} />
        {["4", "5", "6"].map(d => <Btn key={d} label={d} onClick={() => inputDigit(d)} cls="bg-slate-800 ring-1 ring-white/5" />)}
        <Btn label="−" onClick={() => setOperation("−")} cls={op === "−" ? "bg-white text-orange-600 font-bold" : "bg-orange-600"} />
        {["1", "2", "3"].map(d => <Btn key={d} label={d} onClick={() => inputDigit(d)} cls="bg-slate-800 ring-1 ring-white/5" />)}
        <Btn label="+" onClick={() => setOperation("+")} cls={op === "+" ? "bg-white text-orange-600 font-bold" : "bg-orange-600"} />
        <Btn label="0" onClick={() => inputDigit("0")} cls="bg-slate-800 ring-1 ring-white/5" span />
        <Btn label="." onClick={() => { if (!display.includes(".")) { setDisplay(display + "."); setFresh(false); } }} cls="bg-slate-800 ring-1 ring-white/5" />
        <Btn label="=" onClick={equals} cls="bg-gradient-to-br from-orange-500 to-amber-600" />
      </div>
    </div>
  );
}

// ============================= APP STORE =============================
const STORE_APPS = [
  { id: "tube", name: "TubeVideo", dev: "VibeSoft", rating: 4.7, size: "42 MB", cat: "Social", icon: I.tube, bg: "linear-gradient(135deg,#ef4444,#b91c1c)", desc: "Watch, upload and share videos with the world." },
  { id: "maps", name: "Maps", dev: "VibeSoft", rating: 4.5, size: "68 MB", cat: "Navigation", icon: I.maps, bg: "linear-gradient(135deg,#86efac,#22c55e)", desc: "Find your way anywhere on Earth." },
  { id: "weather", name: "Weather", dev: "VibeSoft", rating: 4.3, size: "12 MB", cat: "Utilities", icon: I.weather, bg: "linear-gradient(135deg,#60a5fa,#1d4ed8)", desc: "Beautiful forecasts with live conditions." },
  { id: "music", name: "Music", dev: "VibeSoft", rating: 4.8, size: "35 MB", cat: "Entertainment", icon: I.music, bg: "linear-gradient(135deg,#f472b6,#db2777)", desc: "Stream millions of songs ad-free." },
  { id: "mail", name: "Mail", dev: "VibeSoft", rating: 4.1, size: "20 MB", cat: "Productivity", icon: I.mail, bg: "linear-gradient(135deg,#fca5a5,#dc2626)", desc: "Fast, clean email for everyone." },
  { id: "browser", name: "Browser", dev: "VibeSoft", rating: 4.4, size: "28 MB", cat: "Utilities", icon: I.browser, bg: "linear-gradient(135deg,#a5b4fc,#4f46e5)", desc: "Private browsing with lightning speed." },
  { id: "games", name: "Arcade", dev: "VibeSoft", rating: 4.9, size: "55 MB", cat: "Entertainment", icon: "🕹️", bg: "linear-gradient(135deg,#7c3aed,#4c1d95)", desc: "Snake, Memory & Tic-Tac-Toe in one pack!" },
];

function AppStore({ installed, setInstalled, notify }) {
  const [tab, setTab] = useState("featured");
  const [installing, setInstalling] = useState({});
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const install = (a) => {
    if (installed.includes(a.id) || installing[a.id]) return;
    setInstalling(s => ({ ...s, [a.id]: true }));
    setTimeout(() => {
      setInstalled(prev => prev.includes(a.id) ? prev : [...prev, a.id]);
      setInstalling(s => { const n = { ...s }; delete n[a.id]; return n; });
      notify("🛍️", "App installed", `${a.name} is now on your home screen!`);
    }, 1800);
  };

  const list = STORE_APPS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const InstallBtn = ({ a }) => {
    if (installed.includes(a.id)) return <button className="px-5 py-1.5 rounded-full bg-white/10 text-white/50 text-xs font-bold" disabled>Open</button>;
    if (installing[a.id]) return (
      <div className="w-20 flex justify-center"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent" /></div>
    );
    return <motion.button whileTap={{ scale: 0.9 }} onClick={() => install(a)}
      className="px-5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/40">Get</motion.button>;
  };

  if (detail) {
    const a = detail;
    return (
      <div className="h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-16">
        <button onClick={() => setDetail(null)} className="px-5 pt-4 text-blue-400 text-lg">‹</button>
        <div className="flex items-center gap-4 p-5">
          <motion.div initial={{ scale: 0.6, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 rounded-[1.8rem] flex items-center justify-center text-5xl shadow-2xl ring-1 ring-white/20"
            style={{ background: a.bg }}>{a.icon}</motion.div>
          <div>
            <p className="text-2xl font-bold">{a.name}</p>
            <p className="text-sm text-white/50">{a.dev}</p>
            <p className="text-xs text-white/40 mt-1">★ {a.rating} · {a.size}</p>
          </div>
        </div>
        <div className="px-5"><InstallBtn a={a} /></div>
        <p className="text-sm text-white/70 px-5 mt-5 leading-relaxed">{a.desc}</p>
        <div className="grid grid-cols-3 gap-3 px-5 mt-6">
          {[["Ratings", `${a.rating} ★`], ["Age", "4+"], ["Category", a.cat]].map(([l, v]) => (
            <div key={l} className="bg-white/5 ring-1 ring-white/10 rounded-2xl p-3 text-center">
              <p className="text-[10px] text-white/40 uppercase tracking-wide">{l}</p>
              <p className="text-sm font-semibold mt-1">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 px-5 space-y-2">
          <p className="text-xs uppercase text-white/40 font-bold">What people say</p>
          {[["⭐⭐⭐⭐⭐", "Best app ever, super smooth!"], ["⭐⭐⭐⭐", "Really nice, love the design."]].map(([s, r]) => (
            <div key={r} className="bg-white/5 rounded-2xl p-3 ring-1 ring-white/10">
              <p className="text-xs">{s}</p><p className="text-xs text-white/60 mt-1">{r}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      <div className="px-5 pt-3 pb-3">
        <h1 className="text-[28px] font-extrabold pb-3 bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">App Store</h1>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search apps…"
          className="w-full px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 placeholder-white/40 outline-none text-sm focus:ring-blue-500 transition" />
      </div>
      <div className="flex gap-6 px-5 text-sm border-b border-white/10">
        {["featured", "categories"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-2 capitalize font-semibold ${tab === t ? "text-blue-400 border-b-2 border-blue-400" : "text-white/40"}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 pb-16">
        {tab === "featured" ? list.map(a => (
          <motion.button key={a.id} onClick={() => setDetail(a)} whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 py-3.5 border-b border-white/5 text-left">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg ring-1 ring-white/20"
              style={{ background: a.bg }}>{a.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{a.name}</p>
              <p className="text-white/50 text-xs truncate">{a.desc}</p>
              <p className="text-white/40 text-[10px] mt-0.5">★ {a.rating} · {a.size}</p>
            </div>
            <InstallBtn a={a} />
          </motion.button>
        )) : ["Social", "Navigation", "Utilities", "Entertainment", "Productivity"].map(c => (
          <div key={c} className="py-2">
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">{c}</p>
            {list.filter(a => a.cat === c).map(a => (
              <div key={a.id} onClick={() => setDetail(a)} className="flex items-center gap-3 py-2.5 cursor-pointer">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shadow ring-1 ring-white/20"
                  style={{ background: a.bg }}>{a.icon}</div>
                <p className="flex-1 text-sm">{a.name}</p>
                <InstallBtn a={a} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================= TUBE (YouTube-like) =============================
function TubeApp({ videos, setVideos, notify }) {
  const [view, setView] = useState("feed");
  const [current, setCurrent] = useState(null);
  const [likes, setLikes] = useState({});

  const addVideo = (v) => {
    setVideos(prev => [{ ...v, views: 0, date: "Just now" }, ...prev]);
    setView("feed");
    notify("▶️", "Video published", `"${v.title}" is now live!`);
  };

  const watch = (v) => { setCurrent(v); setView("watch"); setVideos(prev => prev.map(x => x.id === v.id ? { ...x, views: x.views + 1 } : x)); };
  const like = (id) => setLikes(l => ({ ...l, [id]: (l[id] || 0) + 1 }));

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      {view === "feed" && (
        <>
          <div className="flex items-center justify-between px-4 pt-3 pb-3 sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-white/5">
            <h1 className="text-xl font-extrabold flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-sm shadow-lg">▶</span>
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">TubeVideo</span>
            </h1>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView("upload")}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-lg shadow-red-600/40">+ Upload</motion.button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
            {videos.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-28 text-center px-10 text-white/40">
                <p className="text-6xl mb-4">🎬</p>
                <p className="font-semibold text-white/80 text-lg">No videos yet</p>
                <p className="text-sm mt-2">Tap <span className="text-red-400 font-bold">+ Upload</span> to post your first video!</p>
              </motion.div>
            ) : videos.map((v, i) => (
              <motion.button key={v.id} onClick={() => watch(v)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="block w-full text-left active:scale-[0.98] transition">
                <div className="relative bg-slate-900 aspect-video overflow-hidden">
                  <video src={v.url} className="w-full h-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold">▶ {v.views}</span>
                </div>
                <div className="flex gap-3 p-3.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow">{v.channel[0]}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">{v.title}</p>
                    <p className="text-xs text-white/40 mt-1">{v.channel} · {v.views} views · {v.date}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {view === "upload" && <TubeUpload onUpload={addVideo} onCancel={() => setView("feed")} />}

      {view === "watch" && current && (
        <WatchView video={videos.find(v => v.id === current.id) || current} onBack={() => setView("feed")} like={like} likes={likes} />
      )}
    </div>
  );
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
      id: Date.now(), title: title.trim(), channel: channel.trim() || "My Channel",
      desc: desc.trim(), url: file.url,
    }), 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-16 text-white bg-slate-950">
      <button onClick={onCancel} className="text-sm text-white/50 mb-5">‹ Back</button>
      <h2 className="text-2xl font-extrabold mb-5">Upload a video</h2>
      <label className="block border-2 border-dashed border-white/20 rounded-3xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition mb-5 bg-white/5">
        {file ? <video src={file.url} className="w-full h-full object-cover rounded-3xl" controls />
          : (<><motion.span animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl mb-2">📼</motion.span>
            <span className="text-sm text-white/50">Tap to select a video</span></>)}
        <input type="file" accept="video/*" onChange={pick} className="hidden" />
      </label>
      {["Title (required)", "Channel name"].map((ph, i) => (
        <input key={ph} value={i === 0 ? title : channel} onChange={e => i === 0 ? setTitle(e.target.value) : setChannel(e.target.value)} placeholder={ph}
          className="w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm mb-3 outline-none focus:ring-red-500 transition placeholder-white/30" />
      ))}
      <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3}
        className="w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm mb-5 outline-none focus:ring-red-500 transition resize-none placeholder-white/30" />
      <motion.button whileTap={{ scale: 0.97 }} onClick={submit} disabled={!file || !title.trim() || uploading}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold disabled:opacity-40 shadow-lg shadow-red-600/40">
        {uploading ? "Uploading…" : "🚀 Publish Video"}
      </motion.button>
    </div>
  );
}

function WatchView({ video, onBack, like, likes }) {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-16 bg-slate-950 text-white">
      <div className="bg-black aspect-video"><video src={video.url} className="w-full h-full" controls autoPlay /></div>
      <div className="p-4">
        <h2 className="font-bold text-base leading-snug">{video.title}</h2>
        <p className="text-xs text-white/40 mt-1">{video.views} views · {video.date}</p>
        <div className="flex gap-2 mt-4">
          {[["👍", `${likes[video.id] || 0}`, () => like(video.id)], ["👎", "", null], ["↗", "Share", null], ["💬", "12", null]].map(([ic, txt, fn], i) => (
            <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={fn}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-xs font-semibold">{ic} {txt}</motion.button>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold shadow">{video.channel[0]}</div>
          <div className="flex-1"><p className="text-sm font-semibold">{video.channel}</p><p className="text-xs text-white/40">1.2K subscribers</p></div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSubscribed(s => !s)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${subscribed ? "bg-white/10 text-white/60" : "bg-white text-black"}`}>
            {subscribed ? "✓ Subscribed" : "Subscribe"}
          </motion.button>
        </div>
        {video.desc && <p className="text-sm text-white/60 mt-4 p-3 rounded-2xl bg-white/5 ring-1 ring-white/10">{video.desc}</p>}
        <button onClick={onBack} className="mt-6 text-sm text-red-400 font-semibold">‹ Back to feed</button>
      </div>
    </div>
  );
}

// ============================= GALLERY =============================
function Gallery({ gallery, setGallery }) {
  const [view, setView] = useState("grid");
  const [current, setCurrent] = useState(null);
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState("all");

  const pick = (e) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(f => ({
      id: Date.now() + Math.random(),
      type: f.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(f), name: f.name,
    }));
    setGallery(prev => [...newItems, ...prev]);
  };

  const shown = tab === "all" ? gallery : gallery.filter(i => i.type === (tab === "photos" ? "image" : "video"));
  const cur = shown[idx] || current;

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      {view === "grid" ? (
        <>
          <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-white/5">
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-amber-300 to-pink-500 bg-clip-text text-transparent">🖼 Gallery</h1>
            <label className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-black text-xs font-bold cursor-pointer shadow-lg shadow-pink-500/30">
              + Add<input type="file" accept="image/*,video/*" multiple onChange={pick} className="hidden" />
            </label>
          </div>
          <div className="flex gap-5 px-5 text-xs pb-3">
            {["all", "photos", "videos"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-1.5 capitalize font-semibold ${tab === t ? "text-pink-400 border-b-2 border-pink-400" : "text-white/40"}`}>{t}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-1 pb-16">
            {shown.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 text-center text-white/40 px-10">
                <p className="text-6xl mb-4">🖼️</p>
                <p className="text-sm">No media yet — tap <b className="text-pink-400">+ Add</b> or use the Camera.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-1.5 p-2">
                {shown.map((it, i) => (
                  <motion.button key={it.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                    onClick={() => { setCurrent(it); setIdx(i); setView("single"); }}
                    className="aspect-square bg-slate-800 overflow-hidden rounded-xl relative ring-1 ring-white/10 active:scale-95 transition">
                    {it.type === "image"
                      ? <img src={it.url} className="w-full h-full object-cover" alt={it.name} />
                      : <video src={it.url} className="w-full h-full object-cover" muted preload="metadata" />}
                    {it.type === "video" && <span className="absolute top-1.5 right-1.5 bg-black/50 backdrop-blur px-1.5 rounded-md text-[10px]">🎬</span>}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col bg-black">
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setView("grid")} className="text-sm text-pink-400 font-semibold">‹ Gallery</button>
            <span className="text-xs text-white/40 tabular-nums">{idx + 1} / {shown.length}</span>
            <button onClick={() => { setGallery(prev => prev.filter(x => x.id !== current.id)); setView("grid"); }}
              className="text-sm text-red-400 font-semibold">🗑</button>
          </div>
          <div className="flex-1 flex items-center justify-center p-2 relative">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="max-w-full max-h-full flex items-center justify-center">
                {current.type === "image"
                  ? <img src={current.url} className="max-w-full max-h-[500px] object-contain rounded-2xl" alt={current.name} />
                  : <video src={current.url} className="max-w-full max-h-[500px] rounded-2xl" controls autoPlay />}
              </motion.div>
            </AnimatePresence>
            {shown.length > 1 && (<>
              <button onClick={() => { const n = (idx - 1 + shown.length) % shown.length; setCurrent(shown[n]); setIdx(n); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur text-white">‹</button>
              <button onClick={() => { const n = (idx + 1) % shown.length; setCurrent(shown[n]); setIdx(n); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur text-white">›</button>
            </>)}
          </div>
          <p className="text-center text-xs text-white/30 pb-10 truncate px-6">{current.name}</p>
        </div>
      )}
    </div>
  );
}

// ============================= PHONE =============================
function PhoneApp() {
  const [tab, setTab] = useState("keypad");
  const [number, setNumber] = useState("");
  const [inCall, setInCall] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [recents, setRecents] = useState([]);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Mom ❤️", num: "0912 000 1111" },
    { id: 2, name: "Dad", num: "0913 000 2222" },
    { id: 3, name: "Best Friend", num: "0935 000 3333" },
    { id: 4, name: "Pizza 🍕", num: "021 88 99 77" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  useEffect(() => {
    if (inCall === null) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [inCall]);

  const press = (k) => setNumber(n => (n.length < 14 ? n + k : n));
  const call = (num) => { if (!num.trim()) return; setSeconds(0); setInCall(num); };
  const end = () => {
    setRecents(r => [{ num: inCall, dur: seconds, date: "Just now" }, ...r]);
    setInCall(null); setNumber("");
  };
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const addContact = () => {
    if (!newName.trim() || !newNum.trim()) return;
    setContacts(c => [...c, { id: Date.now(), name: newName.trim(), num: newNum.trim() }]);
    setNewName(""); setNewNum("");
  };

  if (inCall !== null) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="h-full bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white flex flex-col items-center justify-center gap-8">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          className="w-28 h-28 rounded-full bg-emerald-500/30 ring-2 ring-emerald-400/50 flex items-center justify-center text-5xl">👤</motion.div>
        <div className="text-center">
          <p className="text-3xl font-semibold">{inCall}</p>
          <motion.p key={seconds} className="text-emerald-300 text-lg mt-2 tabular-nums">{fmt(seconds)}</motion.p>
          <p className="text-white/40 text-xs mt-1">calling…</p>
        </div>
        <div className="flex gap-5">
          {[["🔇", "mute"], ["⌨️", "keypad"], ["🔊", "speaker"]].map(([ic, l]) => (
            <div key={l} className="flex flex-col items-center gap-1">
              <button className="w-14 h-14 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-xl">{ic}</button>
              <span className="text-[9px] text-white/40 capitalize">{l}</span>
            </div>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.85 }} onClick={end}
          className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-2xl shadow-lg shadow-red-600/40">📵</motion.button>
      </motion.div>
    );
  }

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      <div className="flex justify-around pt-4 pb-2 text-xs border-b border-white/10">
        {["keypad", "recents", "contacts"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-2 capitalize font-semibold ${tab === t ? "text-emerald-400 border-b-2 border-emerald-400" : "text-white/40"}`}>{t}</button>
        ))}
      </div>
      {tab === "keypad" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
          <p className="text-3xl tabular-nums h-10 tracking-wider font-light">{number}</p>
          <div className="grid grid-cols-3 gap-4">
            {[["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]].map(([d, s]) => (
              <motion.button key={d} whileTap={{ scale: 0.85 }} onClick={() => press(d)}
                className="w-[68px] h-[68px] rounded-full bg-white/10 ring-1 ring-white/10 flex flex-col items-center justify-center active:bg-white/20">
                <span className="text-2xl font-light">{d}</span>
                <span className="text-[8px] text-white/40 tracking-widest">{s}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <span className="w-[68px]" />
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => call(number)} disabled={!number}
              className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl disabled:opacity-30 shadow-lg shadow-emerald-600/40">📞</motion.button>
            <button onClick={() => setNumber(n => n.slice(0, -1))} className="w-[68px] h-[68px] text-white/50 text-xl">⌫</button>
          </div>
        </div>
      )}
      {tab === "recents" && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-16">
          {recents.length === 0 ? <p className="text-center text-white/30 text-sm pt-24">No recent calls</p> : recents.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-3.5 border-b border-white/5">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">↗</span>
              <div className="flex-1"><p className="text-sm font-medium">{r.num}</p><p className="text-xs text-white/40">{r.date} · {fmt(r.dur)}</p></div>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => call(r.num)} className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">📞</motion.button>
            </div>
          ))}
        </div>
      )}
      {tab === "contacts" && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-16">
          {contacts.map(c => (
            <div key={c.id} className="flex items-center gap-3 py-3.5 border-b border-white/5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center font-semibold shadow">{c.name[0]}</div>
              <div className="flex-1"><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-white/40 tabular-nums">{c.num}</p></div>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => call(c.num)} className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-sm">📞</motion.button>
            </div>
          ))}
          <div className="flex gap-2 mt-5">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name"
              className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-500 placeholder-white/30" />
            <input value={newNum} onChange={e => setNewNum(e.target.value)} placeholder="Number"
              className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 text-sm outline-none ring-1 ring-white/10 focus:ring-emerald-500 placeholder-white/30" />
            <motion.button whileTap={{ scale: 0.9 }} onClick={addContact} className="px-4 rounded-xl bg-emerald-600 font-bold shadow-lg shadow-emerald-600/40">+</motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================= MESSAGES =============================
// personality-flavored replies per contact
const CHAT_STYLES = {
  1: { hi: ["Sweetheart! How are you? ❤️", "Hi honey! Did you eat?"], bye: ["Okay honey, be safe! ❤️", "Night night! 🌙"], food: ["I made your favorite! Come home 🍲", "Dinner's almost ready!"], love: ["Love you more! ❤️", "Aww my baby 🥹"], generic: ["Okay honey 😊", "That's nice dear!", "Call me when you can ❤️", "I worry about you, you know!"] },
  2: { hi: ["YOOO what's up!! 🤪", "BRO finally you text!"], bye: ["ight peace ✌️", "later bro! 😎"], food: ["FOOD YES let's gooo 🍔", "I'm always down for food 🤤"], funny: ["BRO I'M CRYING 💀💀", "LMAOO you're unreal 😭"], generic: ["bro same 💯", "no wayyy 😳", "fr fr", "bet 😎", "you're insane bro 😂", "that's crazyyy", "ok ok hear me out…", "type shi 😤", "nah you cooked there 🔥"] },
  3: { hi: ["Hello! Thanks for choosing PizzaPal! 🍕"], generic: ["Your order will arrive in 15 minutes 🛵", "Would you like extra cheese? 🧀", "Thanks for your order! 🔥", "Don't forget to rate us 5 stars! ⭐"] },
  4: { hi: ["Hey champ! 👋", "Hello son!"], bye: ["Take care, champ.", "Alright, talk later."], generic: ["Good to hear.", "That's my boy! 👏", "Proud of you, son.", "Remember: work hard! 💪", "Ha! Classic."] },
  5: { hi: ["Heyyy! 😄", "Hii! How are you? 🎀"], music: ["OMG I love that song!! 🎶", "Send me your playlist!! 🎧"], love: ["Stop it, you're making me blush 🥰"], generic: ["Ooh tell me more! 👀", "That's so cool! ✨", "Hahaha you're the best 😄", "We should hang out soon! 💕"] },
  6: { hi: ["Hello! Hope work is going well."], work: ["Great initiative! Keep it up! 👏", "Let's discuss in tomorrow's meeting."], generic: ["Noted, thank you.", "Well done! I'll forward this to the team.", "Good to know. Keep me posted!"] },
  7: { hi: ["YEAH BUDDY! 💪", "Ready to get SWOLE? 😤"], sport: ["LIGHT WEIGHT BABY! 🔥", "One more set, let's GO 🏋️", "No excuses! 💪"], generic: ["Protein first, questions later 🥤", "Do you even lift? 😂", "Rest day? Never heard of it 💀", "GET AFTER IT! 🔥"] },
  8: { hi: ["Yo! 😎", "sup"], generic: ["nice nice", "lol true", "wanna hang out?", "bet", "haha yeah", "I'm down 🤙"] },
};

function MessagesApp({ notify }) {
  const CHATS0 = [
    { id: 1, name: "Mom ❤️", emoji: "👩", color: "from-rose-400 to-red-600", pinned: true, unread: 1, msgs: [{ me: false, t: "Where are you?", time: "18:02" }, { me: true, t: "Coming home soon!", time: "18:05" }] },
    { id: 2, name: "Best Friend", emoji: "🤪", color: "from-violet-400 to-purple-600", pinned: true, unread: 2, msgs: [{ me: false, t: "Did you see the new phone app? 😮", time: "17:40" }] },
    { id: 3, name: "Pizza 🍕", emoji: "🍕", color: "from-orange-400 to-red-500", pinned: false, unread: 0, msgs: [{ me: false, t: "Your order is on the way 🛵", time: "16:20" }] },
    { id: 4, name: "Dad", emoji: "👨", color: "from-slate-400 to-slate-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Don't forget to call your mom.", time: "14:11" }] },
    { id: 5, name: "Sara", emoji: "👩‍🎤", color: "from-pink-400 to-fuchsia-600", pinned: false, unread: 1, msgs: [{ me: false, t: "Are we still on for the concert Friday? 🎤", time: "13:55" }] },
    { id: 6, name: "Boss 💼", emoji: "🧑‍💼", color: "from-blue-400 to-indigo-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Great work on the project! 👏", time: "11:30" }] },
    { id: 7, name: "Gym Buddy 💪", emoji: "🏋️", color: "from-emerald-400 to-green-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Leg day tomorrow. No excuses! 🦵", time: "09:15" }] },
    { id: 8, name: "Alex", emoji: "🧑", color: "from-cyan-400 to-sky-600", pinned: false, unread: 0, msgs: [{ me: false, t: "Yo! You free this weekend?", time: "Yesterday" }] },
  ];
  const [chats, setChats] = useState(CHATS0);
  const [openChat, setOpenChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [newChat, setNewChat] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [quick, setQuick] = useState(null); // suggested quick reply chips
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats, openChat, typing, quick]);

  const stamp = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const GENERIC_REPLIES = {
    hi: ["Hey! How's it going? 😊", "Heyyy! 👋 What's up?", "Hello! Long time no talk 😄", "Hi! How have you been?", "Yo!! Good to hear from you 😎", "Hiii! I was just thinking about you 🤔", "Hey there! What's new?", "Oh hey! Perfect timing, I was about to text you!"],
    thanks: ["Anytime! 🌸", "No problem at all 😊", "You're welcome! 🙌", "Of course! That's what friends are for 😄", "Don't mention it! 😊", "Aww, you're too kind! 💙", "Happy to help, always! ✨", "Anytime, that's what I'm here for!"],
    bye: ["Talk soon! 👋", "Aww okay, bye! Take care 💙", "Later! Catch you soon 😎", "Good night! Sleep well 🌙", "Byeee! Don't be a stranger 👋", "Okay gtg too, talk later! 💨", "See you soon! 🤝", "Bye! Text me when you're free 😊"],
    ok: ["👌", "Cool cool 😄", "Awesome!", "Great, glad we're on the same page 👍", "Perfect! 😎", "Sounds good to me!", "Alrighty! 👌", "Cool beans 😎"],
    funny: ["😂😂 I know right!", "Hahaha glad you found that funny 😄", "LMAO I'm dying 💀", "Haha you're hilarious 😆", "LOL I can't breathe 😂", "Hahaha stop it! 🤣", "That actually made my day 😂", "I'm wheezing LMAOO 😵"],
    sorry: ["No worries at all! 😊", "It's totally fine, don't stress 💙", "Hey, it happens! No big deal 👍", "Aww don't apologize! 🤗", "Forgotten already! 😄", "Don't even worry about it 💪", "We're good, promise! 🤝"],
    love: ["Aww, miss you too! ❤️", "You're the best 🥰", "Sending love right back! 💕", "Aww stop, you'll make me cry 🥹", "Love you too! ❤️", "Big virtual hug! 🤗", "You always know what to say 🥰"],
    food: ["Ooh I'm getting hungry just thinking about it 🍕", "Yes please! I could totally go for that 😋", "Coffee sounds perfect right now ☕", "My treat next time! 🍔", "Don't talk about food, I'm starving 😩", "Pizza is always the answer 🍕", "I know this great place we should try! 🍽", "Okay now I NEED fries 🍟"],
    plans: ["Ooh yes, count me in! 🎬", "I've been meaning to watch that!", "Sounds like a plan! 🎮", "Let's do it this weekend 🎉", "I'm so down! 🙌", "Only if there are snacks 😄🍿", "Best idea I've heard all day! 💯", "Wait, I'm free Friday! Let's go! 🎊"],
    sad: ["Aww no! What happened? 💙", "Sending you a big hug 🤗 It'll be okay!", "That sounds rough… I'm here if you need to talk 💙", "Aww, take a rest! You deserve it 😴", "Tomorrow will be better, promise! 🌅", "Want me to bring you food? 🍫", "I'm sorry you're feeling that way 💙 hang in there!", "Ugh, those days are the worst. Chin up! 💪"],
    good: ["YESSS that's amazing! 🎉", "So happy for you! 🥳", "Wow, congrats!! 🎊", "That's fantastic news! 😄", "Ooh exciting! Tell me everything! 👀", "Love that for you! 💪", "Great things keep happening to you! ✨", "Celebration time! 🥳"],
    work: ["Ugh work… I feel you 😩", "You've got this! 💪", "Good luck!! You'll do great 🍀", "Deadlines are the worst 😭", "Take a break, you've earned it! ☕", "You're so hardworking, honestly 👏", "One day at a time! We'll get through it 💪"],
    music: ["Ooh send me the song! 🎵", "I've had that stuck in my head all week 🎶", "Music makes everything better 🎧", "Adding that to my playlist right now! ✨", "We have such similar taste 😄", "Turn it up! 🔊"],
    sport: ["No pain no gain! 💪", "I should really go to the gym too 😅", "Did you see the game last night?? 🏟", "Respect for actually working out 🙇", "One more rep! You got this 🔥", "I'll just watch from the couch honestly 😂"],
    weather: ["I know right, the weather is crazy! 🌦", "Perfect day to stay in with hot chocolate ☕", "Rainy days are honestly the coziest 🌧", "Can't decide if it's too hot or too cold 😅", "At least it's sunny for once! ☀️"],
    question: ["Hmm, I think so 🤔", "Honestly not sure!", "Yeah, definitely 👍", "Good question — what do you think?", "Let me get back to you on that", "Hmm, maybe? Ask me again later 😅", "100% yes! 💯", "Nope, sorry!", "Ooh tough one… I'd say yes?", "Honestly? No idea 😂", "That's a great question! Hmm…", "Depends! Tell me more 🤔"],
    generic: ["Oh interesting!", "Same here 😄", "I was just thinking that", "LOL 😂", "No way, seriously?", "Anyway, what's new with you?", "Makes sense", "Tell me more!", "That's awesome! 🎉", "Wow, I didn't know that!", "Haha you always know what to say 😄", "I feel exactly the same way", "Ooh, keep going 👀", "Really? That's wild 😳", "Nice one! 👏", "I'm listening, go on…", "You're full of surprises! 😄", "Hmm, never thought of it that way 🤔", "That's actually genius 💡", "Okay okay, and then what? 👀", "I'm invested in this story now 🍿", "Big mood honestly 😤", "Same energy! ✨", "Wait what?? Tell me everything! 😱", "Honestly relatable 😮‍💨", "Aww that's sweet 🥹", "That's kinda iconic ngl 😎", "Hmm interesting, keep talking 👂", "Okay that's a whole plot twist 😳", "I'm nodding aggressively rn 😂", "Facts. Pure facts. 📈", "You never disappoint 😄"],
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
    const chat = chats.find(c => c.id === openChat);
    setChats(cs => cs.map(c => c.id === openChat ? { ...c, msgs: [...c.msgs, { me: true, t: text, time: stamp() }] } : c));
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const cat = categorize(text.toLowerCase());
      // contact personality first, fallback to generic
      const style = CHAT_STYLES[chat.id];
      let reply;
      if (style && style[cat]) reply = pick(style[cat]);
      else reply = pick(GENERIC_REPLIES[cat]);
      setChats(cs => cs.map(c => c.id === openChat ? { ...c, msgs: [...c.msgs, { me: false, t: reply, time: stamp() }] } : c));
      setTyping(false);
      setQuick(pick([["😂 Haha", "👍 OK", "❤️"], ["Hmm…", "Tell me more!", "Nice!"], ["That's great! 🎉", "For real?", "Love it!"]]));
    }, 900 + Math.random() * 900);
  };

  const createChat = () => {
    if (!newChat.trim()) return;
    const c = { id: Date.now(), name: newChat.trim(), emoji: "💬", color: "from-blue-400 to-indigo-600", pinned: false, unread: 0, msgs: [] };
    setChats(cs => [c, ...cs]); setNewChat(""); setOpenChat(c.id);
  };

  const togglePin = (id) => setChats(cs => cs.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c));
  const chat = chats.find(c => c.id === openChat);
  const shown = [...chats].sort((a, b) => b.pinned - a.pinned)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.msgs.some(m => m.t.toLowerCase().includes(search.toLowerCase())));
  const QUICK_CHIPS = ["😂", "❤️", "👍", "😮", "😢", "🔥"];

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      {openChat === null ? (
        <>
          <div className="px-5 pt-3 pb-3 border-b border-white/5">
            <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-3">Messages</h1>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search chats & messages…"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm placeholder-white/30 outline-none focus:ring-blue-500 transition mb-2.5" />
            <input value={newChat} onChange={e => setNewChat(e.target.value)} onKeyDown={e => e.key === "Enter" && createChat()}
              placeholder="New chat name… (press Enter)"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 ring-1 ring-white/10 text-sm placeholder-white/25 outline-none focus:ring-indigo-500 transition" />
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
            {shown.length === 0 && <p className="text-center text-white/30 text-sm pt-20">No chats found</p>}
            {shown.map(c => (
              <motion.button key={c.id} layout whileTap={{ scale: 0.98 }} onClick={() => { setOpenChat(c.id); setChats(cs => cs.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); setQuick(null); }}
                className="w-full flex items-center gap-3.5 p-4 border-b border-white/5 text-left">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-xl shadow`}>{c.emoji || c.name[0]}</div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold flex items-center gap-1.5">{c.name}{c.pinned && <span className="text-[9px]">📌</span>}</p>
                    <span className="text-[10px] text-white/30">{c.msgs[c.msgs.length - 1]?.time || ""}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate mt-0.5 ${c.unread ? "text-white/80 font-semibold" : "text-white/40"}`}>{c.msgs[c.msgs.length - 1]?.t || "No messages"}</p>
                    {c.unread > 0 && <span className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold flex items-center justify-center">{c.unread}</span>}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 p-3.5 border-b border-white/10 bg-slate-950/90 backdrop-blur sticky top-0 z-10">
            <button onClick={() => setOpenChat(null)} className="text-blue-400 text-xl">‹</button>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-lg`}>{chat.emoji || chat.name[0]}</div>
            <div className="flex-1"><p className="font-semibold text-sm">{chat.name}</p><p className="text-[10px] text-emerald-400">{typing ? "typing…" : "● online"}</p></div>
            <button onClick={() => togglePin(chat.id)} className={`text-lg ${chat.pinned ? "opacity-100" : "opacity-40"}`}>📌</button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-2.5">
            {chat.msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[75%] px-4 py-2.5 text-sm shadow ${m.me ? "bg-gradient-to-br from-blue-500 to-indigo-600 self-end rounded-3xl rounded-br-md" : "bg-white/10 self-start rounded-3xl rounded-bl-md"}`}>
                <p>{m.t}</p>
                <p className={`text-[9px] mt-1 ${m.me ? "text-white/60" : "text-white/40"} flex items-center gap-1 ${m.me ? "justify-end" : ""}`}>
                  {m.time} {m.me && <span className="text-sky-200">✓✓</span>}
                </p>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white/10 self-start rounded-3xl rounded-bl-md px-4 py-3 flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-white/60" />
                ))}
              </motion.div>
            )}
            <div ref={endRef} />
          </div>
          {/* emoji quick bar */}
          <div className="px-3.5 pt-1 flex gap-2">
            {QUICK_CHIPS.map(e => (
              <motion.button key={e} whileTap={{ scale: 0.8 }} onClick={() => send(e)}
                className="w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-base">{e}</motion.button>
            ))}
            {quick && quick.map(q => (
              <motion.button key={q} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.9 }} onClick={() => send(q)}
                className="px-3 h-9 rounded-full bg-blue-500/15 ring-1 ring-blue-400/30 text-xs text-blue-200 font-medium">{q}</motion.button>
            ))}
          </div>
          <div className="p-3.5 flex gap-2.5 border-t border-white/10 bg-slate-950">
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Message…" className="flex-1 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-blue-500 placeholder-white/30" />
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => send()}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/40">➤</motion.button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================= CAMERA =============================
function CameraApp({ setGallery, notify }) {
  const [mode, setMode] = useState("photo");
  const [shot, setShot] = useState(null);
  const [flash, setFlash] = useState(false);
  const [hue, setHue] = useState(20);
  const canvasRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setHue(h => (h + 2) % 360), 50);
    return () => clearInterval(t);
  }, []);

  const takeShot = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, c.height);
    g.addColorStop(0, `hsl(${hue},70%,60%)`);
    g.addColorStop(1, `hsl(${(hue + 120) % 360},70%,35%)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#ffdd55";
    ctx.beginPath(); ctx.arc(c.width * 0.7, c.height * 0.3, 40, 0, 7); ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath(); ctx.moveTo(0, c.height); ctx.lineTo(c.width * 0.35, c.height * 0.55); ctx.lineTo(c.width * 0.65, c.height); ctx.fill();
    ctx.beginPath(); ctx.moveTo(c.width * 0.4, c.height); ctx.lineTo(c.width * 0.75, c.height * 0.45); ctx.lineTo(c.width, c.height); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = "bold 20px sans-serif";
    ctx.fillText(mode === "video" ? "▶ VibeCam REC" : "📷 VibeCam", 20, 40);
    const url = c.toDataURL("image/png");
    setShot(url);
    setGallery(prev => [{ id: Date.now(), type: "image", url, name: `shot-${Date.now()}.png` }, ...prev]);
    setFlash(true); setTimeout(() => setFlash(false), 180);
  };

  return (
    <div className="h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 m-2 rounded-[1.8rem] overflow-hidden relative ring-1 ring-white/10"
          style={{ background: `linear-gradient(160deg, hsl(${hue},70%,55%), hsl(${(hue + 120) % 360},70%,30%))` }}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-yellow-400/90 blur-[1px] shadow-[0_0_40px_rgba(250,204,21,0.6)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-900/50"
            style={{ clipPath: "polygon(0 100%, 35% 20%, 65% 100%, 100% 35%)" }} />
          {/* grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-1/3 w-px bg-white/20" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-white/20" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white/20" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white/20" />
          </div>
          <div className="absolute top-4 left-4 text-white/80 text-xs flex gap-3 items-center">
            {mode === "video" && <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-red-500 font-bold">● REC</motion.span>}
            <span className="bg-black/30 backdrop-blur px-2 py-1 rounded-lg">VibeCam</span>
          </div>
          <AnimatePresence>
            {shot && <motion.img src={shot} alt="last" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
              className="absolute bottom-4 right-4 w-16 h-16 rounded-xl object-cover border-2 border-white/80 shadow-xl cursor-pointer" />}
          </AnimatePresence>
        </div>
        <div className="pb-14 pt-4 flex flex-col items-center gap-4">
          <div className="flex gap-2 bg-white/10 backdrop-blur rounded-full px-2 py-1.5 ring-1 ring-white/10">
            {["photo", "video"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-5 py-1.5 rounded-full text-xs capitalize font-semibold transition-all ${mode === m ? "bg-yellow-400 text-black shadow" : "text-white/60"}`}>{m}</button>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.85 }} onClick={takeShot}
            className="w-[74px] h-[74px] rounded-full border-[5px] border-white/90 flex items-center justify-center shadow-xl">
            <span className={`rounded-full ${mode === "video" ? "w-7 h-7 bg-red-500" : "w-[56px] h-[56px] bg-white"}`} />
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {flash && <motion.div initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} className="absolute inset-0 bg-white pointer-events-none z-20" />}
      </AnimatePresence>
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
    </div>
  );
}

// ============================= CLOCK =============================
function ClockApp({ secondFlash }) {
  const [tab, setTab] = useState("clock");
  const [time, setTime] = useState(new Date());
  const [sw, setSw] = useState(0);
  const [swRun, setSwRun] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRun, setTimerRun] = useState(false);
  const [alarm, setAlarm] = useState("");
  const [alarms, setAlarms] = useState([]);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (!swRun) return; const t = setInterval(() => setSw(s => s + 0.1), 100); return () => clearInterval(t); }, [swRun]);
  useEffect(() => { if (!timerRun || timer <= 0) return; const t = setInterval(() => setTimer(v => Math.max(0, v - 1)), 1000); return () => clearInterval(t); }, [timerRun, timer]);

  const fmtSw = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}.${String(Math.floor((s % 1) * 10))}`;
  const fmtT = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const secAngle = time.getSeconds() * 6, minAngle = time.getMinutes() * 6 + time.getSeconds() * 0.1, hrAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 to-black text-white flex flex-col">
      <div className="flex justify-around pt-4 pb-2 text-xs border-b border-white/10">
        {["clock", "stopwatch", "timer", "alarm"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-2 capitalize font-semibold ${tab === t ? "text-orange-400 border-b-2 border-orange-400" : "text-white/40"}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        {tab === "clock" && (
          <>
            {/* analog clock */}
            <div className="relative w-52 h-52 rounded-full bg-white/5 ring-2 ring-white/10 shadow-2xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 30}deg)` }}>
                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-0.5 h-2.5 bg-white/40 rounded" />
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-1 h-16 bg-white rounded-full origin-bottom -translate-y-8" style={{ transform: `translateY(-2rem) rotate(${hrAngle}deg)`, transformOrigin: "bottom center", position: "absolute", bottom: "50%" }} />
              </div>
              <div className="absolute inset-0" style={{ transform: `rotate(${minAngle}deg)` }}>
                <div className="absolute left-1/2 top-6 w-[3px] h-[70px] -translate-x-1/2 bg-white/90 rounded-full" />
              </div>
              <div className="absolute inset-0" style={{ transform: `rotate(${secAngle}deg)` }}>
                <div className="absolute left-1/2 top-4 w-[1.5px] h-[80px] -translate-x-1/2 bg-orange-500 rounded-full" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
            </div>
            <div className="text-center">
              <p className="text-4xl font-extralight tabular-nums">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p>
              <p className="text-white/50 text-sm mt-1">{time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
          </>
        )}
        {tab === "stopwatch" && (
          <>
            <p className="text-6xl font-extralight tabular-nums">{fmtSw(sw)}</p>
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSwRun(true)} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-sm font-bold shadow-lg shadow-emerald-700/40">Start</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { if (swRun) setLaps(l => [fmtSw(sw), ...l]); }} className="px-6 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm">Lap</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setSwRun(false); setSw(0); setLaps([]); }} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-sm font-bold shadow-lg shadow-red-700/40">Reset</motion.button>
            </div>
            {laps.length > 0 && (
              <div className="text-sm text-white/60 max-h-36 overflow-y-auto no-scrollbar w-48 space-y-2">
                {laps.map((l, i) => <p key={i} className="tabular-nums flex justify-between border-b border-white/10 pb-1.5"><span className="text-white/40">Lap {laps.length - i}</span>{l}</p>)}
              </div>
            )}
          </>
        )}
        {tab === "timer" && (
          <>
            <div className="relative w-44 h-44">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#fb923c" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={289} strokeDashoffset={289 - (timer > 0 ? 289 * ((timer % 60) / 60 || 1) : 0)} className="transition-all duration-1000" />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-3xl font-extralight tabular-nums">{fmtT(timer)}</p>
            </div>
            <div className="flex gap-2">
              {[60, 300, 600].map(s => (
                <motion.button whileTap={{ scale: 0.9 }} key={s} onClick={() => { setTimer(s); setTimerRun(false); }}
                  className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/10 text-sm font-medium">{s / 60} min</motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTimerRun(true)} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-sm font-bold">Start</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTimerRun(false)} className="px-6 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm">Pause</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setTimerRun(false); setTimer(0); }} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-sm font-bold">Reset</motion.button>
            </div>
            {timerRun && timer === 0 && <motion.p animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity }} className="text-orange-400 font-bold text-lg">⏰ Time's up!</motion.p>}
          </>
        )}
        {tab === "alarm" && (
          <div className="w-full">
            <div className="flex gap-2 mb-5">
              <input type="time" value={alarm} onChange={e => setAlarm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 outline-none focus:ring-orange-500 tabular-nums" />
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { if (alarm) { setAlarms(a => [...a, alarm]); setAlarm(""); } }}
                className="px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 font-bold text-sm shadow-lg shadow-orange-600/40">Add</motion.button>
            </div>
            {alarms.map((a, i) => (
              <motion.div key={a + i} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="flex items-center justify-between py-4 px-4 mb-2 rounded-2xl bg-white/5 ring-1 ring-white/10">
                <span className="text-2xl tabular-nums font-light">⏰ {a}</span>
                <button onClick={() => setAlarms(prev => prev.filter((_, j) => j !== i))} className="text-red-400 text-sm font-semibold">Remove</button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================= NOTES =============================
function NotesApp() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome 🎉", body: "Welcome to Notes! Everything auto-saves.\nUse + to add a new note.", date: "Today" },
    { id: 2, title: "Shopping list", body: "• Milk\n• Bread\n• Coffee ☕", date: "Today" },
  ]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const note = notes.find(n => n.id === editing);
  const save = (title, body) => setNotes(ns => ns.map(n => n.id === editing ? { ...n, title, body, date: "Today" } : n));
  const add = () => { const n = { id: Date.now(), title: "New Note", body: "", date: "Today" }; setNotes(ns => [n, ...ns]); setEditing(n.id); };
  const del = (id) => { setNotes(ns => ns.filter(n => n.id !== id)); setEditing(null); };
  const shown = notes.filter(n => (n.title + n.body).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-orange-50 text-slate-900 flex flex-col">
      {editing === null ? (
        <>
          <div className="flex items-center justify-between px-5 pt-3 pb-3">
            <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Notes</h1>
            <motion.button whileTap={{ scale: 0.9 }} onClick={add}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/40">+ New</motion.button>
          </div>
          <div className="px-5 pb-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search notes…"
              className="w-full px-4 py-2.5 rounded-2xl bg-amber-100 ring-1 ring-amber-200 text-sm outline-none placeholder-amber-700/40 focus:ring-amber-500" />
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-16 grid grid-cols-2 gap-3 content-start">
            <AnimatePresence>
              {shown.map(n => (
                <motion.button key={n.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setEditing(n.id)}
                  className="text-left p-4 rounded-3xl bg-white shadow-md shadow-amber-900/5 ring-1 ring-amber-100 active:scale-95 transition">
                  <p className="font-bold text-sm line-clamp-1">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-5 whitespace-pre-wrap">{n.body || "No content"}</p>
                  <p className="text-[10px] text-slate-400 mt-2">{n.date}</p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 p-3.5 border-b border-amber-200 bg-white/70 backdrop-blur">
            <button onClick={() => setEditing(null)} className="text-amber-700 text-xl">‹</button>
            <input value={note.title} onChange={e => save(e.target.value, note.body)}
              className="flex-1 font-bold outline-none bg-transparent text-lg" />
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => del(note.id)} className="text-red-500 text-lg">🗑</motion.button>
          </div>
          <textarea value={note.body} onChange={e => save(note.title, e.target.value)} autoFocus
            className="flex-1 p-5 bg-amber-50/50 outline-none resize-none text-sm leading-relaxed"
            placeholder="Start writing…" />
          <p className="text-center text-[10px] text-slate-400 pb-9">✓ Changes save automatically</p>
        </>
      )}
    </div>
  );
}

// ============================= MUSIC =============================
const SONGS = [
  { id: 1, title: "Neon Dreams", artist: "Synthwave", dur: 30, color: "linear-gradient(135deg,#f472b6,#db2777)", emoji: "🌙" },
  { id: 2, title: "Midnight Drive", artist: "Retrowave", dur: 30, color: "linear-gradient(135deg,#818cf8,#4f46e5)", emoji: "🌃" },
  { id: 3, title: "Summer Vibes", artist: "Chill Co.", dur: 30, color: "linear-gradient(135deg,#fbbf24,#f97316)", emoji: "🌞" },
  { id: 4, title: "Rainy Day", artist: "Lo-Fi Beats", dur: 30, color: "linear-gradient(135deg,#34d399,#059669)", emoji: "🌧" },
];

function MusicApp() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!playing || !current) return;
    const t = setInterval(() => {
      setPos(p => {
        if (p + 1 >= current.dur) {
          const idx = SONGS.findIndex(s => s.id === current.id);
          setCurrent(SONGS[(idx + 1) % SONGS.length]);
          return 0;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [playing, current]);

  const play = (s) => { setCurrent(s); setPlaying(true); setPos(0); };
  const toggle = () => setPlaying(p => !p);
  const skip = (d) => {
    const idx = SONGS.findIndex(s => s.id === current.id);
    const n = SONGS[(idx + d + SONGS.length) % SONGS.length];
    setCurrent(n); setPos(0);
  };
  const fmt = (s) => `0:${String(s).padStart(2, "0")}`;

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white flex flex-col">
      <div className="px-5 pt-4 pb-2"><h1 className="text-[28px] font-extrabold bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent">🎵 Music</h1></div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-16">
        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Library</p>
        {SONGS.map(s => (
          <motion.button key={s.id} whileTap={{ scale: 0.97 }} onClick={() => play(s)}
            className={`w-full flex items-center gap-3.5 py-3 px-3 rounded-2xl text-left transition ${current?.id === s.id ? "bg-white/10 ring-1 ring-pink-500/50" : ""}`}>
            <motion.div animate={playing && current?.id === s.id ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg" style={{ background: s.color }}>{s.emoji}</motion.div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${current?.id === s.id ? "text-pink-400" : ""}`}>{s.title}</p>
              <p className="text-xs text-white/40">{s.artist} · 0:30</p>
            </div>
            {current?.id === s.id && playing && (
              <div className="flex gap-0.5 items-end h-4">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ height: [4, 12, 6, 14, 4] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-0.5 bg-pink-400 rounded" />
                ))}
              </div>
            )}
          </motion.button>
        ))}
      </div>
      {/* Player */}
      {current && (
        <div className="p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
          <div className="flex items-center gap-3.5">
            <motion.div animate={playing ? { rotate: 360 } : {}} transition={{ repeat: playing ? Infinity : 0, duration: 8, ease: "linear" }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ring-2 ring-white/20"
              style={{ background: current.color }}>{current.emoji}</motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{current.title}</p>
              <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-full"
                  animate={{ width: `${(pos / current.dur) * 100}%` }} transition={{ duration: 0.5 }} />
              </div>
              <p className="text-[10px] text-white/40 mt-1 tabular-nums">{fmt(pos)} / {fmt(current.dur)}</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => skip(-1)} className="text-white/70 text-lg">⏮</motion.button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={toggle}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-600/40 text-lg">
                {playing ? "⏸" : "▶"}
              </motion.button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => skip(1)} className="text-white/70 text-lg">⏭</motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================= WEATHER =============================
function WeatherApp() {
  const cities = [
    { name: "Tehran", temp: 19, cond: "Sunny", icon: "☀️", hi: 24, lo: 11, hum: 32 },
    { name: "Istanbul", temp: 16, cond: "Cloudy", icon: "☁️", hi: 18, lo: 12, hum: 68 },
    { name: "London", temp: 11, cond: "Rain", icon: "🌧️", hi: 13, lo: 8, hum: 85 },
    { name: "Dubai", temp: 34, cond: "Clear", icon: "🌤️", hi: 38, lo: 26, hum: 40 },
    { name: "Tokyo", temp: 21, cond: "Partly Cloudy", icon: "⛅", hi: 23, lo: 17, hum: 60 },
  ];
  const [idx, setIdx] = useState(0);
  const c = cities[idx];
  const hours = Array.from({ length: 8 }, (_, i) => ({
    h: (new Date().getHours() + i + 1) % 24,
    temp: Math.round(c.temp + Math.sin(i) * 3),
    icon: ["☀️", "⛅", "☁️", "🌧️"][i % 4],
  }));
  const bg = c.cond === "Rain" ? "linear-gradient(180deg,#1e3a5f,#0f172a)"
    : (c.cond === "Sunny" || c.cond === "Clear") ? "linear-gradient(180deg,#3b82f6,#1e40af)"
    : "linear-gradient(180deg,#475569,#1e293b)";

  return (
    <div className="h-full overflow-y-auto no-scrollbar text-white" style={{ background: bg }}>
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto no-scrollbar pb-2">
        {cities.map((ci, i) => (
          <motion.button key={ci.name} whileTap={{ scale: 0.9 }} onClick={() => setIdx(i)}
            className={`px-4 py-1.5 rounded-full text-xs shrink-0 font-semibold transition ${i === idx ? "bg-white text-slate-900 shadow-lg" : "bg-white/20 backdrop-blur"}`}>{ci.name}</motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center pt-6 pb-8">
          <motion.p animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-[80px] leading-none">{c.icon}</motion.p>
          <p className="text-[76px] font-extralight leading-none mt-2">{c.temp}°</p>
          <p className="text-xl font-medium mt-2">{c.name}</p>
          <p className="text-white/60 text-sm">{c.cond} · H {c.hi}° L {c.lo}°</p>
          <div className="flex justify-center gap-3 mt-3">
            {[["💧", `${c.hum}%`], ["🌬", "12 km/h"], ["☀", "UV 5"]].map(([ic, v]) => (
              <span key={v} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs">{ic} {v}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mx-4 bg-white/10 backdrop-blur rounded-3xl p-4 ring-1 ring-white/10">
        <p className="text-[10px] uppercase text-white/50 font-bold tracking-wider mb-3">Hourly Forecast</p>
        <div className="flex justify-between">
          {hours.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5 shrink-0 px-1">
              <span className="text-[10px] text-white/50 tabular-nums">{h.h}:00</span>
              <span className="text-xl">{h.icon}</span>
              <span className="text-xs font-bold">{h.temp}°</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="m-4 bg-white/10 backdrop-blur rounded-3xl p-4 ring-1 ring-white/10 mb-20">
        <p className="text-[10px] uppercase text-white/50 font-bold tracking-wider mb-2">7-Day Forecast</p>
        {[["Mon", "☀️"], ["Tue", "⛅"], ["Wed", "🌧️"], ["Thu", "☀️"], ["Fri", "🌤️"], ["Sat", "☁️"], ["Sun", "☀️"]].map(([d, ic], i) => (
          <motion.div key={d} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
            <span className="text-sm w-12 font-medium">{d}</span>
            <span className="text-lg">{ic}</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50 tabular-nums">{c.lo}°</span>
              <div className="w-14 h-1 rounded-full bg-white/20 relative">
                <div className="absolute inset-y-0 rounded-full bg-gradient-to-r from-sky-300 to-orange-400" style={{ left: "20%", right: "20%" }} />
              </div>
              <span className="font-bold tabular-nums">{c.hi}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================= MAPS =============================
function MapsApp() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  const [mode, setMode] = useState("car");

  const dist = from && to ? Math.max(1, (from.length + to.length) * 7 % 40) + 3 : null;
  const speeds = { car: 1, bike: 4, walk: 12 };

  const search = () => { if (!from.trim() || !to.trim()) return; setRoute({ from: from.trim(), to: to.trim(), dist }); };

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      <div className="flex-1 m-2.5 rounded-[1.8rem] relative overflow-hidden ring-1 ring-white/10"
        style={{ background: "linear-gradient(135deg,#14532d,#166534)" }}>
        {/* roads */}
        <div className="absolute top-1/3 inset-x-0 h-3.5 bg-slate-300/25" />
        <div className="absolute top-2/3 inset-x-0 h-2.5 bg-slate-300/15" />
        <div className="absolute left-1/4 inset-y-0 w-3.5 bg-slate-300/25" />
        <div className="absolute left-2/3 inset-y-0 w-2.5 bg-slate-300/15" />
        {/* blocks */}
        {[[8, 40], [30, 42], [42, 70], [72, 38]].map(([x, y], i) => (
          <div key={i} className="absolute w-16 h-16 rounded-lg bg-emerald-800/40 ring-1 ring-white/5" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 C 30 60, 55 35, 100 45" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.5" />
        </svg>
        <AnimatePresence>
          {route && (
            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path d="M25 25 C 45 15, 55 60, 75 65" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
            </motion.svg>
          )}
        </AnimatePresence>
        <motion.span animate={route ? { left: ["20%", "73%"], top: ["20%", "63%"] } : {}} transition={{ duration: 1.2 }}
          className="absolute left-[20%] top-[20%] text-xl drop-shadow-lg" style={{ position: "absolute" }}>🚗</motion.span>
        <span className="absolute left-[20%] top-[20%] text-sm">🏠</span>
        <span className="absolute left-[75%] top-[65%] text-sm">🎯</span>
      </div>
      <div className="p-4 space-y-2.5 pb-12">
        <div className="flex gap-2">
          <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From (e.g. Home)"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-emerald-500 placeholder-white/40 transition" />
          <input value={to} onChange={e => setTo(e.target.value)} placeholder="To (e.g. Office)"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-emerald-500 placeholder-white/40 transition" />
        </div>
        <div className="flex gap-2">
          {[["car", "🚗"], ["bike", "🚴"], ["walk", "🚶"]].map(([m, ic]) => (
            <motion.button key={m} whileTap={{ scale: 0.9 }} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-sm transition ${mode === m ? "bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold shadow-lg shadow-emerald-700/40" : "bg-white/10"}`}>{ic}</motion.button>
          ))}
          <motion.button whileTap={{ scale: 0.95 }} onClick={search}
            className="flex-1 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold text-sm shadow-lg shadow-emerald-700/40">Route</motion.button>
        </div>
        <AnimatePresence>
          {route && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-gradient-to-r from-emerald-900/60 to-slate-900/60 backdrop-blur rounded-2xl p-4 ring-1 ring-emerald-500/30">
              <p className="font-bold flex items-center gap-2">🧭 {route.from} → {route.to}</p>
              <p className="text-emerald-300/80 text-xs mt-1.5">{route.dist} km · ~{Math.max(1, Math.round(route.dist / 10 * speeds[mode] / 6))} min by {mode}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================= MAIL =============================
function MailApp({ notify }) {
  const [mails, setMails] = useState([
    { id: 1, from: "Vibe Team", subj: "Welcome to Mail! 🎉", body: "Thanks for using VibeMail. You can read, reply, and compose new emails here.", date: "09:12", read: false },
    { id: 2, from: "App Store", subj: "Your download finished", body: "TubeVideo has been installed on your phone.", date: "08:45", read: false },
    { id: 3, from: "Alex", subj: "Lunch tomorrow?", body: "Hey! Want to grab lunch tomorrow at 1pm? There's a new pizza place nearby.", date: "Yesterday", read: true },
    { id: 4, from: "Newsletter", subj: "Weekly digest", body: "Top 10 stories from this week, curated just for you.", date: "Monday", read: true },
  ]);
  const [open, setOpen] = useState(null);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ to: "", subj: "", body: "" });
  const [sent, setSent] = useState([]);

  const read = (m) => { setMails(ms => ms.map(x => x.id === m.id ? { ...x, read: true } : x)); setOpen(m); };
  const send = () => {
    if (!draft.to.trim()) return;
    setSent(s => [{ id: Date.now(), ...draft, date: "Now" }, ...s]);
    setComposing(false); setDraft({ to: "", subj: "", body: "" });
    notify("✉️", "Email sent", "Your message was delivered successfully!");
  };

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      {open ? (
        <>
          <div className="flex items-center gap-2 p-3.5 border-b border-white/10">
            <button onClick={() => setOpen(null)} className="text-red-400 text-xl">‹</button>
            <p className="flex-1 font-semibold text-sm truncate">{open.subj}</p>
            <motion.button whileTap={{ scale: 0.85 }} onClick={() => { setMails(ms => ms.filter(x => x.id !== open.id)); setOpen(null); }} className="text-red-400">🗑</motion.button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-5">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-400 to-red-700 flex items-center justify-center font-bold shadow">{open.from[0]}</div>
              <div><p className="text-sm font-bold">{open.from}</p><p className="text-xs text-white/40">{open.date}</p></div>
            </div>
            <h2 className="text-lg font-bold mt-4">{open.subj}</h2>
            <p className="text-sm text-white/70 mt-3 leading-relaxed">{open.body}</p>
          </div>
        </>
      ) : composing ? (
        <>
          <div className="flex items-center gap-2 p-3.5 border-b border-white/10">
            <button onClick={() => setComposing(false)} className="text-red-400 text-xl">‹</button>
            <p className="font-semibold text-sm">New Email</p>
          </div>
          <div className="flex-1 p-5 space-y-2.5 pb-16">
            <input value={draft.to} onChange={e => setDraft({ ...draft, to: e.target.value })} placeholder="To"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 placeholder-white/30 transition" />
            <input value={draft.subj} onChange={e => setDraft({ ...draft, subj: e.target.value })} placeholder="Subject"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 placeholder-white/30 transition" />
            <textarea value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} rows={6} placeholder="Write your email…"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-red-500 resize-none placeholder-white/30 transition" />
            <motion.button whileTap={{ scale: 0.97 }} onClick={send}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold shadow-lg shadow-red-600/40">📨 Send</motion.button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-white/5">
            <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">✉️ Mail</h1>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setComposing(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-lg shadow-red-600/40">✏️ Compose</motion.button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
            {sent.length > 0 && <p className="px-5 pt-3 text-[10px] uppercase font-bold text-white/40 tracking-wider">Sent</p>}
            {sent.map(m => (
              <div key={m.id} className="px-5 py-3 border-b border-white/5 bg-white/[0.03]">
                <p className="text-sm font-semibold">To: {m.to}</p>
                <p className="text-xs text-white/50 truncate">{m.subj || "(no subject)"}</p>
              </div>
            ))}
            <p className="px-5 pt-3 text-[10px] uppercase font-bold text-white/40 tracking-wider">Inbox</p>
            {mails.map(m => (
              <motion.button key={m.id} whileTap={{ scale: 0.98 }} onClick={() => read(m)}
                className="w-full text-left px-5 py-3.5 border-b border-white/5 flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-transparent" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between"><p className={`text-sm truncate ${m.read ? "font-normal text-white/60" : "font-bold"}`}>{m.from}</p><span className="text-[10px] text-white/30">{m.date}</span></div>
                  <p className={`text-xs truncate mt-0.5 ${m.read ? "text-white/40" : "text-white/80 font-medium"}`}>{m.subj}</p>
                  <p className="text-xs text-white/30 truncate">{m.body}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================= BROWSER =============================
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
      setHistory(h => [clean, ...h.filter(x => x !== clean)]);
      setUrl(""); setLoading(false);
    }, 600);
  };

  const LINKS = {
    "vibenews.com": { title: "VibeNews", color: "#ef4444", lines: ["Breaking: New smartphone simulator goes viral 🚀", "Tech: Instant app bundles are here", "Sports: Local team wins championship 🏆", "Weather: Sunny week ahead"] },
    "vibegames.com": { title: "VibeGames 🎮", color: "#8b5cf6", lines: ["🐍 Play Snake", "🧩 Play Puzzle Blocks", "🏎️ Play Racer X", "🏆 Leaderboards"] },
    "vibewiki.com": { title: "VibeWiki", color: "#3b82f6", lines: ["Article of the day: Smartphones", "Featured: History of the App Store", "Did you know? The first calculator weighed 60kg!", "Random: Video sharing platforms"] },
  };
  const known = Object.keys(LINKS).find(k => page?.includes(k.split(".")[0]));

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      <div className="p-3 border-b border-white/10 flex gap-2.5 items-center sticky top-0 bg-slate-950/90 backdrop-blur z-10">
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => setPage(null)} disabled={!page} className="text-indigo-400 disabled:text-white/20 text-xl">‹</motion.button>
        <div className="flex-1 relative">
          <input value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && go(url)}
            placeholder="Search or type a URL…"
            className="w-full px-4 py-2.5 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-indigo-500 placeholder-white/30 transition" />
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 rounded-full bg-slate-950/60 backdrop-blur flex items-center justify-center gap-2">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent" />
              <span className="text-[10px] text-white/60">Loading…</span>
            </motion.div>
          )}
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => go(url)}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-xs font-bold shadow-lg shadow-indigo-600/40">Go</motion.button>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
        {!page ? (
          <div className="p-8 text-center">
            <motion.p animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-6xl mb-6">🌐</motion.p>
            <p className="text-sm text-white/50 mb-5">Search anything, or try visiting:</p>
            {Object.entries(LINKS).map(([k, v], i) => (
              <motion.button key={k} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileTap={{ scale: 0.95 }}
                onClick={() => go(k)}
                className="block w-full py-3.5 mx-auto max-w-xs rounded-2xl mb-2.5 text-white font-bold text-sm shadow-lg active:scale-95"
                style={{ background: v.color }}>{k}</motion.button>
            ))}
            {history.length > 0 && (
              <>
                <p className="text-[10px] uppercase text-white/40 mt-8 font-bold">Recent</p>
                {history.slice(0, 5).map(h => (
                  <button key={h} onClick={() => setPage(h)} className="block mx-auto text-xs text-indigo-400 py-1.5">{h}</button>
                ))}
              </>
            )}
          </div>
        ) : known ? (
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <div className="px-5 py-4 text-white" style={{ background: LINKS[known].color }}>
                <p className="text-xl font-extrabold">{LINKS[known].title}</p>
                <p className="text-xs opacity-70 flex items-center gap-1"><span className="text-emerald-300">🔒</span>{page}</p>
              </div>
              <div className="p-4 space-y-3">
                {LINKS[known].lines.map((l, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 text-sm hover:bg-white/10 transition cursor-pointer">{l}</motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <GoogleResults query={page} onGo={go} />
        )}
      </div>
    </div>
  );
}

// ============================= GOOGLE-STYLE RESULTS =============================
function GoogleResults({ query, onGo }) {
  const TEMPLATES = [
    (q) => ({ site: `www.${q.replace(/\s+/g, "")}guide.com`, title: `${cap(q)} — Complete Guide & Everything You Need to Know`, snippet: `Looking for ${q}? Here's a detailed guide covering all the basics, tips, examples, and frequently asked questions about ${q}.` }),
    (q) => ({ site: `${q.replace(/\s+/g, "")}.org`, title: `What is ${cap(q)}? Definition and Meaning`, snippet: `${cap(q)} explained simply. Learn what ${q} means, how it works, and why it matters — with examples and expert insights.` }),
    (q) => ({ site: `blog.${q.replace(/\s+/g, "")}hub.net`, title: `Top 10 ${cap(q)} Tips for 2026`, snippet: `Discover the best ${q} tips and tricks that actually work. Ranked and reviewed by our editors, updated this week.` }),
    (q) => ({ site: `forum.${q.replace(/\s+/g, "")}talk.io`, title: `${cap(q)} — discussion thread`, snippet: `Community discussion about ${q}. 342 replies · latest answer 2 hours ago · "I've been into ${q} for years, here's my take…"` }),
    (q) => ({ site: `news.${q.replace(/\s+/g, "")}daily.com`, title: `Breaking: Latest news about ${cap(q)}`, snippet: `Stay updated with the latest ${q} news, analysis, and developments from around the world. Live coverage.` }),
    (q) => ({ site: `shop.${q.replace(/\s+/g, "")}store.com`, title: `Best ${cap(q)} products — Compare & Buy`, snippet: `Shop the top-rated ${q} products. Free shipping, 4.8★ average rating, 30-day returns. Prices from $19.99.` }),
  ];
  const results = TEMPLATES.map(t => t(query));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white text-slate-800 min-h-full">
      {/* Google header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        <p className="text-2xl font-medium tracking-tight"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></p>
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full ring-1 ring-slate-300 shadow-sm">
          <span className="text-slate-500 text-sm truncate flex-1">{query}</span>
          <span className="text-slate-400">✕</span>
        </div>
      </div>
      <div className="px-5 pb-2 text-xs text-slate-500 border-b border-slate-200">
        About {(query.length * 12457).toLocaleString()} results (0.{Math.max(20, query.length * 7)} seconds)
      </div>
      {/* Results */}
      <div className="px-5 py-3 space-y-5">
        {results.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="cursor-pointer active:opacity-60 transition" onClick={() => onGo(r.site)}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">{r.site[0].toUpperCase()}</div>
              <div className="text-xs text-slate-600"><p className="leading-tight">{r.site.split(".")[1]}</p><p className="text-slate-400 text-[10px]">https://{r.site}</p></div>
            </div>
            <p className="text-[17px] text-[#1a0dab] font-medium mt-1 leading-snug hover:underline">{r.title}</p>
            <p className="text-[13px] text-slate-600 mt-0.5 leading-snug">{r.snippet}</p>
          </motion.div>
        ))}
        {/* People also ask */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="rounded-2xl ring-1 ring-slate-200 overflow-hidden">
          <p className="px-4 pt-3 pb-1 text-lg font-medium">People also ask</p>
          {[`Is ${query} worth it?`, `How do I start with ${query}?`, `${cap(query)} for beginners?`].map((q, i) => (
            <div key={i} className="px-4 py-3 border-t border-slate-100 text-sm flex justify-between items-center">
              <span>{q}</span><span className="text-slate-400 text-lg">+</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ============================= ARCADE (GAMES) =============================
function GamesApp() {
  const [game, setGame] = useState(null);
  const [best, setBest] = useState({ snake: 0, memory: 0 });

  if (game) {
    const Back = () => (
      <button onClick={() => setGame(null)} className="text-violet-300 text-lg font-bold">‹ Arcade</button>
    );
    return (
      <div className="h-full bg-gradient-to-b from-violet-950 to-slate-950 text-white overflow-y-auto no-scrollbar">
        {game === "snake" && <Snake Back={Back} best={best.snake} setBest={s => setBest(b => ({ ...b, snake: Math.max(b.snake, s) }))} />}
        {game === "memory" && <Memory Back={Back} best={best.memory} setBest={s => setBest(b => ({ ...b, memory: Math.min(b.memory || 999, s) }))} />}
        {game === "ttt" && <TicTacToe Back={Back} />}
      </div>
    );
  }

  const GAMES = [
    { id: "snake", name: "Snake", icon: "🐍", desc: "Eat, grow, don't crash!", bg: "linear-gradient(135deg,#22c55e,#158038)" },
    { id: "memory", name: "Memory Match", icon: "🃏", desc: "Find all the pairs", bg: "linear-gradient(135deg,#f59e0b,#b45309)" },
    { id: "ttt", name: "Tic-Tac-Toe", icon: "❌⭕", desc: "Beat the AI", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)" },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-violet-950 to-slate-950 text-white flex flex-col">
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[28px] font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">🕹️ Arcade</h1>
        <p className="text-xs text-white/40 mt-1">3 games · high scores saved</p>
      </div>
      <div className="flex-1 px-4 space-y-3 pb-16">
        {GAMES.map((g, i) => (
          <motion.button key={g.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.96 }} onClick={() => setGame(g.id)}
            className="w-full flex items-center gap-4 p-4 rounded-3xl ring-1 ring-white/10 shadow-xl text-left active:scale-[0.98] transition"
            style={{ background: g.bg }}>
            <span className="text-4xl">{g.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-lg">{g.name}</p>
              <p className="text-xs text-white/70">{g.desc}</p>
            </div>
            <span className="text-white/60 text-xl">›</span>
          </motion.button>
        ))}
        <div className="mt-4 p-4 rounded-3xl bg-white/5 ring-1 ring-white/10">
          <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider mb-2">🏆 High Scores</p>
          <p className="text-sm">🐍 Snake: <b className="text-emerald-400">{best.snake}</b></p>
          <p className="text-sm">🃏 Memory: <b className="text-amber-400">{best.memory || best.memory === 0 ? `${best.memory} moves` : "—"}</b></p>
        </div>
      </div>
    </div>
  );
}

// ---- SNAKE ----
function Snake({ Back, best, setBest }) {
  const SIZE = 15, CELL = 20;
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => { dirRef.current = dir; }, [dir]);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSnake(s => {
        const d = dirRef.current;
        const head = { x: s[0].x + d.x, y: s[0].y + d.y };
        if (head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE || s.some(p => p.x === head.x && p.y === head.y)) {
          setDead(true); setRunning(false);
          setScore(sc => { setBest(sc); return sc; });
          return s;
        }
        const ns = [head, ...s];
        if (head.x === food.x && head.y === food.y) {
          setScore(sc => sc + 1);
          let nf;
          do { nf = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) }; }
          while (ns.some(p => p.x === nf.x && p.y === nf.y));
          setFood(nf);
        } else ns.pop();
        return ns;
      });
    }, 220);
    return () => clearInterval(t);
  }, [running, food]);

  const turn = (x, y) => {
    const d = dirRef.current;
    if (d.x === -x && d.y === -y) return; // no 180°
    setDir({ x, y });
  };

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full"><Back />
        <p className="text-sm font-bold">🐍 Score: <span className="text-emerald-400">{score}</span> · Best: {best}</p></div>
      <div className="relative rounded-2xl ring-2 ring-white/20 overflow-hidden shadow-2xl bg-slate-900"
        style={{ width: SIZE * CELL, height: SIZE * CELL }}>
        {/* food */}
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.7 }}
          className="absolute rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          style={{ left: food.x * CELL + 2, top: food.y * CELL + 2, width: CELL - 4, height: CELL - 4 }} />
        {/* snake */}
        {snake.map((p, i) => (
          <div key={i} className="absolute rounded-[4px]"
            style={{
              left: p.x * CELL + 1, top: p.y * CELL + 1, width: CELL - 2, height: CELL - 2,
              background: i === 0 ? "#4ade80" : `rgba(34,197,94,${Math.max(0.25, 1 - i * 0.05)})`,
              boxShadow: i === 0 ? "0 0 8px rgba(74,222,128,0.8)" : "none",
            }} />
        ))}
        {(!running || dead) && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <p className="text-2xl font-extrabold">{dead ? "💀 Game Over!" : "🐍 Snake"}</p>
            {dead && <p className="text-sm text-white/60">Score: {score}</p>}
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => {
              setSnake([{ x: 7, y: 7 }]); setDir({ x: 1, y: 0 }); dirRef.current = { x: 1, y: 0 };
              setFood({ x: 3, y: 3 }); setScore(0); setDead(false); setRunning(true);
            }} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 font-bold shadow-lg">
              {dead ? "Play Again" : "Start"}
            </motion.button>
          </div>
        )}
      </div>
      {/* D-pad */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <span /><motion.button whileTap={{ scale: 0.85 }} onClick={() => turn(0, -1)} className="w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl">↑</motion.button><span />
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => turn(-1, 0)} className="w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl">←</motion.button>
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => { setRunning(r => !r); }} className="w-14 h-12 rounded-xl bg-emerald-600/40 ring-1 ring-emerald-500/40 text-lg">{running ? "⏸" : "▶"}</motion.button>
        <motion.button whileTap={{ scale: 0.85 }} onClick={() => turn(1, 0)} className="w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl">→</motion.button>
        <span /><motion.button whileTap={{ scale: 0.85 }} onClick={() => turn(0, 1)} className="w-14 h-12 rounded-xl bg-white/10 ring-1 ring-white/10 text-xl">↓</motion.button><span />
      </div>
    </div>
  );
}

// ---- MEMORY MATCH ----
function Memory({ Back, best, setBest }) {
  const EMOJI = ["🍕", "🚀", "🐱", "🌈", "🎸", "⚽", "🦄", "🍩"];
  const [cards, setCards] = useState(() => [...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, e, open: false, done: false })));
  const [sel, setSel] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const flip = (c) => {
    if (c.done || c.open || sel.length === 2) return;
    const ns = cards.map(x => x.id === c.id ? { ...x, open: true } : x);
    setCards(ns);
    const nSel = [...sel, c];
    setSel(nSel);
    if (nSel.length === 2) {
      setMoves(m => m + 1);
      if (nSel[0].e === nSel[1].e) {
        setTimeout(() => {
          setCards(cs => cs.map(x => x.e === nSel[0].e ? { ...x, done: true, open: true } : x));
          setSel([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(cs => cs.map(x => x.id === nSel[0].id || x.id === nSel[1].id ? { ...x, open: false } : x));
          setSel([]);
        }, 700);
      }
    }
  };

  const doneCount = cards.filter(c => c.done).length;
  useEffect(() => {
    if (doneCount === cards.length && cards.length > 0 && !won) {
      setWon(true); setBest(moves + 1);
    }
  }, [doneCount]);

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full"><Back />
        <p className="text-sm font-bold">🃏 Moves: <span className="text-amber-400">{moves}</span>{best ? ` · Best: ${best}` : ""}</p></div>
      <div className="grid grid-cols-4 gap-2.5">
        {cards.map(c => (
          <motion.button key={c.id} whileTap={{ scale: 0.9 }} onClick={() => flip(c)}
            className="w-[62px] h-[62px] rounded-2xl perspective-1000"
            style={{ opacity: c.done ? 0.35 : 1 }}>
            <motion.div animate={{ rotateY: c.open ? 180 : 0 }} transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center text-2xl rounded-2xl"
              style={{
                background: c.open || c.done ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "linear-gradient(135deg,#312e81,#4338ca)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}>
              <span style={{ transform: c.open ? "rotateY(180deg)" : "none", display: "inline-block" }}>
                {c.open || c.done ? c.e : "❓"}
              </span>
            </motion.div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {won && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-50">
            <motion.p animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-6xl">🎉</motion.p>
            <p className="text-2xl font-extrabold">You Win!</p>
            <p className="text-white/60 text-sm">Completed in {moves} moves</p>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => {
              setCards([...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5).map((e, i) => ({ id: i, e, open: false, done: false })));
              setSel([]); setMoves(0); setWon(false);
            }} className="mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 font-bold shadow-lg">Play Again</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---- TIC-TAC-TOE ----
function TicTacToe({ Back }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({ w: 0, l: 0, d: 0 });

  const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  const checkWin = (b) => {
    for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    return b.every(x => x) ? "draw" : null;
  };

  const aiMove = (b) => {
    // try win, then block, then center, then random
    const tryLine = (p) => {
      for (const [a, c, d] of LINES) {
        const line = [a, c, d];
        const vals = line.map(i => b[i]);
        if (vals.filter(v => v === p).length === 2 && vals.includes(null)) return line[vals.indexOf(null)];
      }
      return null;
    };
    return tryLine("O") ?? tryLine("X") ?? (b[4] === null ? 4 : [0, 2, 6, 8, 1, 3, 5, 7].find(i => b[i] === null));
  };

  const play = (i) => {
    if (board[i] || winner) return;
    const nb = [...board]; nb[i] = "X";
    let w = checkWin(nb);
    if (!w) {
      const ai = aiMove(nb);
      if (ai !== undefined && ai !== null) nb[ai] = "O";
      w = checkWin(nb);
    }
    setBoard(nb);
    if (w) {
      setWinner(w);
      if (w === "X") setStats(s => ({ ...s, w: s.w + 1 }));
      else if (w === "O") setStats(s => ({ ...s, l: s.l + 1 }));
      else setStats(s => ({ ...s, d: s.d + 1 }));
    }
  };

  const reset = () => { setBoard(Array(9).fill(null)); setWinner(null); };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full"><Back />
        <p className="text-xs text-white/50">You: <b className="text-blue-400">{stats.w}W</b> · AI: <b className="text-red-400">{stats.l}L</b> · {stats.d}D</p></div>
      <p className="text-lg font-bold">
        {winner === "draw" ? "🤝 It's a draw!" : winner === "X" ? "🎉 You win!" : winner === "O" ? "🤖 AI wins!" : turn === "X" ? "Your turn (X)" : "AI thinking…"}
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {board.map((c, i) => (
          <motion.button key={i} whileTap={{ scale: 0.88 }} onClick={() => play(i)}
            className="w-[86px] h-[86px] rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-4xl font-black shadow-lg"
            style={{ color: c === "X" ? "#60a5fa" : "#f87171" }}>
            {c && <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300 }}>{c}</motion.span>}
          </motion.button>
        ))}
      </div>
      {(winner || board.every(x => x)) && (
        <motion.button whileTap={{ scale: 0.9 }} onClick={reset}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 font-bold shadow-lg">Play Again</motion.button>
      )}
    </div>
  );
}

// ============================= VIBE AI ASSISTANT =============================
function AssistantApp({ openApp, notify }) {
  const [msgs, setMsgs] = useState([
    { me: false, t: "Hi! I'm Vibe AI ✨ — your phone's assistant. Try:\n• \"open calculator\"\n• \"what's 25 × 4\"\n• \"what time is it\"\n• \"tell me a joke\"" },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, thinking]);

  const respond = (q) => {
    const m = q.toLowerCase();
    // open an app
    const openMatch = m.match(/\b(?:open|launch|start|go to)\s+(.+)/);
    if (openMatch) {
      const target = openMatch[1].trim();
      const app = APPS.find(a => target.includes(a.name.toLowerCase()) || target.includes(a.id));
      if (app) {
        setTimeout(() => { notify("✨", "Vibe AI", `Opening ${app.name}…`); openApp(app.id); }, 900);
        return `Opening ${app.name} ${app.icon}…`;
      }
      return `Hmm, I couldn't find an app called "${target}". Try "open settings" or "open arcade".`;
    }
    // math
    const mathMatch = m.match(/(?:what'?s|calculate|compute)?\s*(-?[\d.]+)\s*([+\-×x*÷/]+)\s*(-?[\d.]+)/);
    if (mathMatch && /(what'?s|calculate|compute|\d\s*[+\-×x*÷/])/.test(m)) {
      const a = parseFloat(mathMatch[1]), b = parseFloat(mathMatch[3]);
      const o = mathMatch[2];
      const r = o === "+" ? a + b : o === "-" ? a - b : (o === "×" || o === "x" || o === "*") ? a * b : b === 0 ? "undefined (division by zero!)" : +(a / b).toFixed(6);
      return `🧮 ${a} ${o} ${b} = ${r}`;
    }
    if (/\b(time|clock)\b/.test(m)) return `🕐 It's ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`;
    if (/\b(date|today)\b/.test(m)) return `📅 Today is ${new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}.`;
    if (/\b(joke|funny)\b/.test(m)) {
      const jokes = ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛", "I told my phone a joke about airplane mode… it didn't respond. ✈️", "Why did the smartphone go to therapy? Too many hang-ups! 📱", "There are 10 types of people: those who understand binary and those who don't. 😄"];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (/\b(weather)\b/.test(m)) return "⛅ Today in Tehran: 19° and sunny. Open the Weather app for the full forecast!";
    if (/\b(battery)\b/.test(m)) return "🔋 Battery is at 83%. Should easily last the whole day!";
    if (/\b(hi|hello|hey)\b/.test(m)) return "Hey! 👋 What can I do for you?";
    if (/\b(who are you|your name)\b/.test(m)) return "I'm Vibe AI, the assistant built into your phone ✨. I can open apps, do math, tell jokes, and more!";
    if (/\b(thanks|thank you)\b/.test(m)) return "Anytime! 🌸";
    const fallback = ["Interesting! Tell me more.", "I'm not sure about that one — try \"open settings\" or ask me some math!", "Hmm 🤔 could you rephrase that?", "I can open apps, do math, tell the time, or crack a joke — what'll it be?"];
    return fallback[Math.floor(Math.random() * fallback.length)];
  };

  const send = (override) => {
    const q = (override ?? draft).trim();
    if (!q) return;
    setMsgs(ms => [...ms, { me: true, t: q }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setMsgs(ms => [...ms, { me: false, t: respond(q) }]);
      setThinking(false);
    }, 900);
  };

  const QUICK = ["🕘 What time is it?", "🧮 What's 12 × 12?", "😄 Tell me a joke", "⚙️ Open settings"];

  return (
    <div className="h-full bg-gradient-to-b from-teal-950 via-slate-950 to-black text-white flex flex-col">
      <div className="px-5 pt-4 pb-3 text-center">
        <motion.div animate={{ scale: thinking ? [1, 1.1, 1] : [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: thinking ? 0.8 : 3 }}
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-cyan-700 flex items-center justify-center text-3xl shadow-xl shadow-teal-500/30 ring-2 ring-teal-400/40">✨</motion.div>
        <p className="font-extrabold text-lg mt-2 bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">Vibe AI</p>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 flex flex-col gap-2.5">
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`max-w-[82%] px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${m.me ? "bg-gradient-to-br from-teal-500 to-cyan-700 self-end rounded-3xl rounded-br-md shadow-lg" : "bg-white/10 self-start rounded-3xl rounded-bl-md ring-1 ring-white/10"}`}>
            {m.t}
          </motion.div>
        ))}
        {thinking && (
          <div className="bg-white/10 self-start rounded-3xl rounded-bl-md px-4 py-3 flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="px-3 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
        {QUICK.map(q => (
          <button key={q} onClick={() => send(q.slice(2))}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-teal-500/15 ring-1 ring-teal-400/30 text-xs text-teal-200 font-medium active:scale-95 transition">{q}</button>
        ))}
      </div>
      <div className="p-3.5 flex gap-2.5 border-t border-white/10">
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask me anything…" className="flex-1 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/10 text-sm outline-none focus:ring-teal-500 placeholder-white/30" />
        <motion.button whileTap={{ scale: 0.85 }} onClick={send}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-700 flex items-center justify-center shadow-lg shadow-teal-500/40">➤</motion.button>
      </div>
    </div>
  );
}

// ============================= SETTINGS =============================
function SettingsApp({ installed, setInstalled, wallpaper, setWallpaper, notify }) {
  const [tab, setTab] = useState("main");
  const [brightness, setBrightness] = useState(85);
  const [darkMode, setDarkMode] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [battery, setBattery] = useState(83);

  const coreApps = ["store", "settings", "assistant"];
  const uninstallable = installed.filter(id => !coreApps.includes(id));

  const Row = ({ icon, label, value, onClick, danger }) => (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`w-full flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5 text-left ${danger ? "text-red-400" : ""}`}>
      <span className="text-xl w-8 text-center">{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <span className="text-xs text-white/40">{value}</span>
      <span className="text-white/30">›</span>
    </motion.button>
  );

  const Toggle = ({ on, set }) => (
    <button onClick={() => set(!on)}
      className={`w-12 h-7 rounded-full transition relative ${on ? "bg-blue-600" : "bg-white/15"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow ${on ? "right-0.5" : "left-0.5"}`} />
    </button>
  );

  if (tab === "wallpaper") {
    return (
      <div className="h-full bg-slate-950 text-white flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <button onClick={() => setTab("main")} className="text-blue-400 text-xl">‹</button>
          <p className="font-bold">Wallpaper</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 grid grid-cols-2 gap-3 pb-16">
          {WALLPAPERS.map((w, i) => (
            <motion.button key={w.name} whileTap={{ scale: 0.93 }} onClick={() => { setWallpaper(i); notify("⚙️", "Settings", `Wallpaper set to ${w.name}`); }}
              className="relative h-40 rounded-3xl overflow-hidden ring-2 transition"
              style={{ background: w.css, boxShadow: wallpaper === i ? "0 0 0 3px #3b82f6" : "none" }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl" style={{ background: w.blob[0] }} />
              <p className="absolute bottom-3 left-4 text-sm font-bold drop-shadow">{w.name}</p>
              {wallpaper === i && <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs">✓</span>}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "apps") {
    return (
      <div className="h-full bg-slate-950 text-white flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <button onClick={() => setTab("main")} className="text-blue-400 text-xl">‹</button>
          <p className="font-bold">Manage Apps</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
          <p className="px-5 pt-3 text-[10px] uppercase text-white/40 font-bold">Installed apps</p>
          {uninstallable.map(id => {
            const a = APPS.find(x => x.id === id);
            return (
              <div key={id} className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow" style={{ background: a.bg }}>{a.icon}</div>
                <p className="flex-1 text-sm font-medium">{a.name}</p>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => { setInstalled(prev => prev.filter(x => x !== id)); notify("⚙️", "Settings", `${a.name} was uninstalled`); }}
                  className="px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-bold ring-1 ring-red-500/30">Uninstall</motion.button>
              </div>
            );
          })}
          <p className="px-5 py-4 text-[11px] text-white/30">Core apps (App Store, Settings, Vibe AI) can't be uninstalled. Reinstall any app from the App Store.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col">
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-[28px] font-extrabold">Settings</h1>
        {/* profile card */}
        <div className="mt-3 flex items-center gap-3 p-4 rounded-3xl bg-gradient-to-r from-blue-600/30 to-violet-600/30 ring-1 ring-white/10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-violet-700 flex items-center justify-center text-xl font-bold shadow-lg">👤</div>
          <div className="flex-1"><p className="font-bold">User</p><p className="text-xs text-white/50">Vibe Account · 15 apps installed</p></div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold">PRO</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
        <p className="px-5 pt-2 pb-1 text-[10px] uppercase text-white/40 font-bold">Appearance</p>
        <Row icon="🖼️" label="Wallpaper" value={WALLPAPERS[wallpaper]?.name} onClick={() => setTab("wallpaper")} />
        <div className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5">
          <span className="text-xl w-8 text-center">☀️</span>
          <div className="flex-1">
            <p className="text-sm font-medium">Brightness</p>
            <input type="range" min="30" max="100" value={brightness} onChange={e => setBrightness(+e.target.value)}
              className="w-full mt-2 accent-blue-500" />
          </div>
          <span className="text-xs text-white/40 w-8">{brightness}%</span>
        </div>
        <div className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5">
          <span className="text-xl w-8 text-center">🌙</span>
          <p className="flex-1 text-sm font-medium">Dark Mode</p>
          <Toggle on={darkMode} set={setDarkMode} />
        </div>
        <p className="px-5 pt-3 pb-1 text-[10px] uppercase text-white/40 font-bold">General</p>
        <Row icon="📦" label="Manage Apps" value={`${installed.length} installed`} onClick={() => setTab("apps")} />
        <div className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5">
          <span className="text-xl w-8 text-center">🔋</span>
          <div className="flex-1">
            <p className="text-sm font-medium">Battery</p>
            <div className="h-1.5 mt-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div animate={{ width: `${battery}%` }} className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
            </div>
          </div>
          <span className="text-xs text-emerald-400">{battery}%</span>
        </div>
        <div className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/5">
          <span className="text-xl w-8 text-center">🌙</span>
          <p className="flex-1 text-sm font-medium">Do Not Disturb</p>
          <Toggle on={dnd} set={v => { setDnd(v); notify("⚙️", "Settings", v ? "Do Not Disturb is ON" : "Do Not Disturb is OFF"); }} />
        </div>
        <p className="px-5 pt-3 pb-1 text-[10px] uppercase text-white/40 font-bold">About</p>
        <Row icon="📱" label="VibeOS" value="Version 3.0" onClick={() => notify("📱", "VibeOS", "You're on the latest version! 🎉")} />
        <Row icon="ℹ️" label="Storage" value="18.4 GB / 64 GB" onClick={() => {}} />
        <div className="p-5 text-center text-[10px] text-white/25">Smartphone Simulator Pro 🚀</div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
