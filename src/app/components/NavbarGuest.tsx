import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const tabs = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "About", href: "/about" },
];

export function NavbarGuest() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Hitung posisi sliding indicator
  useEffect(() => {
    const activeIndex = tabs.findIndex(
      (t) =>
        t.href === location.pathname ||
        location.pathname.startsWith(t.href + "/"),
    );
    const target = tabRefs.current[activeIndex === -1 ? 0 : activeIndex];
    const container = navRef.current;
    if (!target || !container) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setIndicatorStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
    });
  }, [location.pathname]);

  const activeIndex = tabs.findIndex(
    (t) =>
      t.href === location.pathname ||
      location.pathname.startsWith(t.href + "/"),
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 md:px-8 h-20 relative">
        {/* ── Logo pill ── */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full
                       flex items-center justify-center gap-1.5 shadow-inner cursor-pointer select-none
                       hover:bg-white/10 transition-colors duration-200"
          >
            <span className="font-bold text-white text-base tracking-tight">
              OSPEKIN.UB
            </span>
          </div>
        </div>

        {/* ── Center nav pill dengan sliding indicator (desktop only) ── */}
        <div
          ref={navRef}
          className="hidden md:flex items-center gap-0 relative px-2 py-1
                     bg-white/8 border border-white/10 backdrop-blur-md rounded-full"
          id="nav-container"
        >
          {/* Sliding active indicator */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white/15 transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />

          {tabs.map((tab, i) => (
            <a
              key={tab.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(tab.href);
              }}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                i === (activeIndex === -1 ? 0 : activeIndex)
                  ? "text-white"
                  : "text-white/55 hover:text-white hover:scale-105"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* ── Right buttons (desktop only) ── */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2 rounded-full text-sm font-medium text-white/70
                       hover:text-white hover:bg-white/8 border border-transparent
                       hover:border-white/20 transition-all duration-200"
          >
            Masuk
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className="px-6 py-2 rounded-full text-sm font-medium text-white
                       hover:scale-105 active:scale-95 transition-all duration-200
                       shadow-lg shadow-indigo-500/25"
            style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
          >
            Daftar
          </button>
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* ── Mobile dropdown (hamburger) ── */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2">
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(tab.href);
                setMobileOpen(false);
              }}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-white/80 hover:bg-white/8 text-sm"
            >
              {tab.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                navigate("/auth/login");
                setMobileOpen(false);
              }}
              className="flex-1 py-2 rounded-full text-sm text-white border border-white/30"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                navigate("/auth/register");
                setMobileOpen(false);
              }}
              className="flex-1 py-2 rounded-full text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #6366f1, #f43f5e)",
              }}
            >
              Daftar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
