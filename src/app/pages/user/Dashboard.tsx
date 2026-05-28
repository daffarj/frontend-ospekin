import { Package, CreditCard, AlertTriangle, Eye, Pencil } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { StatusBadge } from "../../components/StatusBadge";
import { EmptyState } from "../../components/EmptyState";
import { useNavigate } from "react-router";
import { useState } from "react";

type DemoState = "empty" | "profile-incomplete" | "has-order" | "has-bill";

export function UserDashboard() {
  const navigate = useNavigate();
  const [demoState, setDemoState] = useState<DemoState>("has-order");

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarUser />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Demo switcher */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["empty", "profile-incomplete", "has-order", "has-bill"] as DemoState[]).map(s => (
            <button key={s} onClick={() => setDemoState(s)}
              className={`px-3 py-1.5 rounded-full text-xs ${demoState === s ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Profile incomplete banner */}
        {demoState === "profile-incomplete" && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-amber-800 text-sm flex-1">Lengkapi profil dulu sebelum bisa memesan</p>
            <button onClick={() => navigate("/user/profil")} className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700">
              Lengkapi Profil
            </button>
          </div>
        )}

        {/* Bill banner */}
        {demoState === "has-bill" && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-4">
            <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="flex-1">
              <p className="text-blue-900 text-sm font-medium">Tagihan pelunasan paketmu sudah terbit!</p>
              <p className="text-blue-700 text-xs">Sisa Rp 200.000</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
              Bayar Sekarang
            </button>
          </div>
        )}

        {/* Empty state */}
        {demoState === "empty" && (
          <EmptyState
            icon={Package}
            title="Belum ada pesanan"
            subtitle="Yuk pesan paket atribut ospekmu sebelum kehabisan!"
            ctaLabel="Pesan Sekarang"
            onCta={() => navigate("/user/pesan")}
          />
        )}

        {/* Has order */}
        {(demoState === "has-order" || demoState === "has-bill") && (
          <div>
            <h2 className="text-gray-900 font-bold text-xl mb-4">Pesananku</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold">Paket Standar</h3>
                  <p className="text-gray-500 text-sm">DP Rp 85.000 • 12 Mei 2026</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge type="bayar" status="DP Lunas" />
                  <StatusBadge type="logistik" status="Sedang Di Jalan" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                <button onClick={() => navigate("/user/pesanan/status")} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
                  <Eye className="w-3.5 h-3.5" /> Lihat Status
                </button>
                <button onClick={() => navigate("/user/pesanan/edit")} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-gray-600 bg-gray-100 hover:bg-gray-200">
                  <Pencil className="w-3.5 h-3.5" /> Edit Pesanan
                </button>
                {demoState === "has-bill" && (
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white" style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
                    <CreditCard className="w-3.5 h-3.5" /> Bayar Pelunasan
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
