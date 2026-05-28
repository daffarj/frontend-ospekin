import { ClipboardList, Wallet, CheckCircle, Clock, AlertTriangle, Camera } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router";

const fakultasData = [
  { name: "Ilmu Komputer", value: 312 },
  { name: "Teknik", value: 287 },
  { name: "Ekonomi", value: 265 },
  { name: "Kedokteran", value: 198 },
  { name: "MIPA", value: 175 },
  { name: "Hukum", value: 154 },
  { name: "FISIP", value: 143 },
  { name: "Pertanian", value: 121 },
];

const stokData = [
  { name: "Paket Standar", dipesan: 890, lunas: 312, pending: 578 },
  { name: "Paket Lengkap", dipesan: 450, lunas: 180, pending: 270 },
  { name: "Paket Ekonomis", dipesan: 280, lunas: 95, pending: 185 },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Ekspor Data</button>
            <span className="px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-600">28 Mei 2026</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Pesanan", value: "1.620", icon: ClipboardList, color: "indigo" },
              { label: "DP Sudah Masuk", value: "Rp 124,7Jt", icon: Wallet, sub: "dari 1.465 pemesan", color: "violet" },
              { label: "Pesanan Lunas", value: "587", icon: CheckCircle, color: "emerald" },
              { label: "Menunggu Ditugaskan", value: "234", icon: Clock, color: "amber" },
            ].map(({ label, value, icon: Icon, sub, color }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${color}-100`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
              </div>
            ))}
          </div>

          {/* Chart + Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-gray-900 font-semibold mb-4">Pemesan per Fakultas</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={fakultasData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-gray-900 font-semibold mb-4">Stok per Paket (Real-time)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-gray-100">
                    <th className="text-left pb-2">Paket</th>
                    <th className="text-right pb-2">Dipesan</th>
                    <th className="text-right pb-2">Lunas</th>
                    <th className="text-right pb-2">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {stokData.map((row, i) => (
                    <tr key={row.name} className={`${i % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                      <td className="py-2.5 text-gray-800 font-medium">{row.name}</td>
                      <td className="py-2.5 text-gray-600 text-right">{row.dipesan}</td>
                      <td className="py-2.5 text-emerald-600 text-right">{row.lunas}</td>
                      <td className="py-2.5 text-amber-600 text-right">{row.pending}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alert flags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="text-gray-900 font-semibold">Belum Isi Alamat</h3>
              </div>
              <p className="text-5xl font-bold text-rose-500 mb-1">73</p>
              <p className="text-gray-500 text-sm mb-4">Pemesan belum mengisi alamat pengiriman</p>
              <button onClick={() => navigate("/admin/pesanan")} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm hover:bg-rose-100">
                Lihat Daftar →
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-orange-500" />
                <h3 className="text-gray-900 font-semibold">Belum Upload Pas Foto</h3>
              </div>
              <p className="text-5xl font-bold text-orange-500 mb-1">148</p>
              <p className="text-gray-500 text-sm mb-4">Pemesan belum mengupload pas foto</p>
              <button onClick={() => navigate("/admin/pesanan")} className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm hover:bg-orange-100">
                Lihat Daftar →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
