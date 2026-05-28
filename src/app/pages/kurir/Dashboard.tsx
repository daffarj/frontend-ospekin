import { useState } from "react";
import { MapPin, Package, Phone, ChevronRight } from "lucide-react";
import { NavbarKurir } from "../../components/NavbarKurir";
import { StatusBadge } from "../../components/StatusBadge";
import { EmptyState } from "../../components/EmptyState";
import { useNavigate } from "react-router";

const assignments = [
  { id: 1, name: "Budi Santoso", status: "Sedang Di Jalan", address: "Jl. Veteran No. 1, Kos Mawar, Kamar 12, Malang", paket: "Paket Standar", wa: "081234567890" },
  { id: 2, name: "Maya Putri", status: "Ditugaskan", address: "Jl. Soekarno Hatta No. 5, Kos Melati, Malang", paket: "Paket Lengkap", wa: "085678901234" },
  { id: 3, name: "Dimas Prasetyo", status: "Selesai", address: "Jl. MT Haryono No. 28, Kos Anggrek, Malang", paket: "Paket Standar", wa: "081234567891" },
];

type TabFilter = "Semua" | "Ditugaskan" | "Sedang Di Jalan" | "Selesai";

export function KurirDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabFilter>("Semua");

  const filtered = assignments.filter(a => tab === "Semua" || a.status === tab);

  const counts = {
    Ditugaskan: assignments.filter(a => a.status === "Ditugaskan").length,
    "Sedang Di Jalan": assignments.filter(a => a.status === "Sedang Di Jalan").length,
    Selesai: assignments.filter(a => a.status === "Selesai").length,
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarKurir />

      <div className="max-w-lg mx-auto px-4 py-4 pb-20">
        {/* Summary bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 px-3 py-2 bg-blue-100 rounded-xl text-center">
            <p className="text-blue-700 font-bold">{counts.Ditugaskan}</p>
            <p className="text-blue-600 text-xs">Ditugaskan</p>
          </div>
          <div className="flex-1 px-3 py-2 bg-amber-100 rounded-xl text-center">
            <p className="text-amber-700 font-bold">{counts["Sedang Di Jalan"]}</p>
            <p className="text-amber-600 text-xs">Di Jalan</p>
          </div>
          <div className="flex-1 px-3 py-2 bg-emerald-100 rounded-xl text-center">
            <p className="text-emerald-700 font-bold">{counts.Selesai}</p>
            <p className="text-emerald-600 text-xs">Selesai</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {(["Semua", "Ditugaskan", "Sedang Di Jalan", "Selesai"] as TabFilter[]).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${tab === t ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Assignment list */}
        {filtered.length === 0 ? (
          <EmptyState icon={Package} title="Tidak ada tugas hari ini" subtitle="Semua pengiriman sudah selesai atau belum ada penugasan baru." />
        ) : (
          <div className="space-y-3">
            {filtered.map(a => (
              <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-900 font-semibold">{a.name}</p>
                  <StatusBadge type="logistik" status={a.status} />
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm line-clamp-2">{a.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400 shrink-0" />
                    <p className="text-gray-600 text-sm">{a.paket}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <a href={`tel:${a.wa}`} className="text-indigo-600 text-sm">{a.wa}</a>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(a.address)}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <MapPin className="w-4 h-4" /> Buka Peta
                  </a>
                  <button onClick={() => navigate(`/kurir/pesanan/${a.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700">
                    Detail <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
