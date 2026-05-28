import {
  LayoutGrid,
  Package,
  ClipboardList,
  Users,
  Tag,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Manajemen Paket", href: "/admin/paket" },
  { icon: ClipboardList, label: "Daftar Pesanan", href: "/admin/pesanan" },
  { icon: Users, label: "Manajemen User", href: "/admin/user" },
  { icon: Tag, label: "Kode Referal", href: "/admin/referal" },
  { icon: Settings, label: "Pengaturan", href: "/admin/pengaturan" },
];

export function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-900 flex flex-col z-40">
      <div className="px-5 py-5 border-b border-white/10">
        <div
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full
                     inline-flex items-center justify-center cursor-pointer select-none
                     hover:bg-white/10 transition-colors duration-200"
        >
          <span className="font-bold text-white text-sm tracking-tight">
            OSPEKIN.UB
          </span>
        </div>
        <p className="text-white/30 text-xs mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = location.pathname === href;
          return (
            <button
              key={href}
              onClick={() => navigate(href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              Admin OSPEKIN
            </p>
            <p className="text-white/40 text-xs truncate">admin@ospekin.ub</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/auth/login")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-rose-400 hover:bg-rose-400/10 text-sm transition-all"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </aside>
  );
}
