import { useState } from "react";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

interface NavbarUserProps {
  name?: string;
}

export function NavbarUser({ name = "Budi Santoso" }: NavbarUserProps) {
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full
                       flex items-center justify-center cursor-pointer select-none
                       hover:bg-gray-200 transition-colors duration-200"
          >
            <span className="font-bold text-gray-900 text-base tracking-tight">
              OSPEKIN.UB
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                  }}
                >
                  {initials}
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  {name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/user/profil");
                      setDropOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" /> Profil Saya
                  </button>
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                      setDropOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-rose-600 hover:bg-rose-50"
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
