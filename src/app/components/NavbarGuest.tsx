import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const tabs = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Cara Pesan", href: "/about#cara-pesan" },
  { label: "About", href: "/about" },
];

export function NavbarGuest() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/60 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-1">
            <span className="text-white font-bold text-lg tracking-tight">OSPEKIN</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-0.5" />
            <span className="text-white/40 font-bold text-lg">.UB</span>
          </button>

          {/* Center nav - desktop */}
          <div className="hidden md:flex items-center gap-1 bg-white/8 rounded-full px-2 py-1.5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => navigate(tab.href)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  location.pathname === tab.href
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/auth/login")}
              className="px-5 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/8 transition-all"
            >
              Masuk
            </button>
            <button
              onClick={() => navigate("/auth/register")}
              className="px-5 py-2 rounded-full text-sm text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
            >
              Daftar
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => { navigate(tab.href); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-white/80 hover:bg-white/8 text-sm"
            >
              {tab.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={() => navigate("/auth/login")} className="flex-1 py-2 rounded-full text-sm text-white border border-white/30">Masuk</button>
            <button onClick={() => navigate("/auth/register")} className="flex-1 py-2 rounded-full text-sm text-white" style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>Daftar</button>
          </div>
        </div>
      )}
    </nav>
  );
}
