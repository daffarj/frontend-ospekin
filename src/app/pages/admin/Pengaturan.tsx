import { useState } from "react";
import { CheckCircle, XCircle, Trash2, Info } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";

const integrations = [
  { name: "Dokupay API", icon: "💳", status: true, checked: "28 Mei 2026, 10:00" },
  { name: "Google Maps API", icon: "🗺️", status: true, checked: "28 Mei 2026, 10:00" },
  { name: "SMTP Email", icon: "📧", status: false, checked: "28 Mei 2026, 09:45" },
];

export function AdminPengaturan() {
  const [deadline, setDeadline] = useState({ date: "2026-06-01", time: "23:59" });
  const [saved, setSaved] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-gray-900 font-bold text-lg">Pengaturan Sistem</h1>
        </div>

        <div className="p-6 space-y-5 max-w-2xl">
          {/* Deadline section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Deadline Kunci Data Pesanan</h3>

            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-blue-800 text-sm">Setelah deadline ini, seluruh data pesanan akan terkunci permanen dan tidak bisa diedit oleh pemesan.</p>
            </div>

            {saved ? (
              <div className="text-center mb-6 p-5 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-sm mb-1">Deadline saat ini:</p>
                <p className="text-3xl font-bold text-gray-900">1 Juni 2026</p>
                <p className="text-gray-500">pukul 23:59 WIB</p>
              </div>
            ) : (
              <div className="text-center mb-6 p-5 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 italic">Belum diatur</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Tanggal deadline</label>
                <input type="date" value={deadline.date} onChange={e => setDeadline(d => ({ ...d, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Waktu deadline</label>
                <input type="time" value={deadline.time} onChange={e => setDeadline(d => ({ ...d, time: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm" />
              </div>
            </div>

            {/* Impact preview */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-gray-500 text-sm mb-2">Dampak pada data pesanan:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">587</p>
                  <p className="text-gray-500 text-xs">pesanan sudah akan terkunci</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-amber-500">1.033</p>
                  <p className="text-gray-500 text-xs">pesanan belum terkunci</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSaved(true)} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700">
                Simpan Deadline
              </button>
              <button onClick={() => setSaved(false)} className="px-6 py-2.5 border border-rose-300 text-rose-600 rounded-full text-sm hover:bg-rose-50 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4" /> Hapus Deadline
              </button>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Status Integrasi</h3>
            <div className="space-y-3">
              {integrations.map(({ name, icon, status, checked }) => (
                <div key={name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">Terakhir dicek: {checked}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    {status ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {status ? "Terhubung" : "Tidak Terhubung"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
