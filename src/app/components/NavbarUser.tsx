import { useState } from "react";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

interface NavbarUserProps {
  name?: string;
  hasNotif?: boolean;
}

export function NavbarUser({
  name = "Budi Santoso",
  hasNotif = true,
}: NavbarUserProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md border-b border-white/8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full
                       flex items-center justify-center cursor-pointer select-none
                       hover:bg-white/10 transition-colors duration-200"
          >
            <span className="font-bold text-white text-sm tracking-tight">
              OSPEKIN.UB
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              {hasNotif && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/8 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                  }}
                >
                  {initials}
                </div>
                <span className="text-sm text-white/70 hidden sm:block">
                  {name}
                </span>
                <ChevronDown className="w-4 h-4 text-white/30" />
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-[#111] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/user/profil");
                      setDropOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" /> Profil Saya
                  </button>
                  <div className="border-t border-white/8" />
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                      setDropOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
