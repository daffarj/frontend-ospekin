import { useState } from "react";
import { Copy, Pencil, Plus, X } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";

const initialCodes = [
  { id: 1, code: "OSPEK2026", owner: "Budi Santoso", discount: 10000, quota: 100, used: 67, active: true },
  { id: 2, code: "MAHBARU25", owner: "Sari Dewi", discount: 15000, quota: 50, used: 50, active: false },
  { id: 3, code: "UBFRESH26", owner: "Ahmad Fauzi", discount: 5000, quota: 200, used: 23, active: true },
];

export function AdminReferal() {
  const [codes, setCodes] = useState(initialCodes);
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  function toggleActive(id: number) {
    setCodes(c => c.map(code => code.id === id ? { ...code, active: !code.active } : code));
  }

  function copyCode(id: number, code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  const totalActive = codes.filter(c => c.active).length;
  const totalUsed = codes.reduce((s, c) => s + c.used, 0);
  const totalDiscount = codes.reduce((s, c) => s + c.used * c.discount, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">Kode Referal</h1>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Tambah Kode
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Kode Aktif", value: totalActive },
              { label: "Total Pemakaian", value: totalUsed },
              { label: "Total Diskon Diberikan", value: `Rp ${totalDiscount.toLocaleString("id")}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-gray-500 text-sm mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Kode", "Pemilik", "Diskon", "Dipakai / Kuota", "Status", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {codes.map(code => (
                  <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-900 font-medium bg-gray-100 px-2 py-0.5 rounded">{code.code}</span>
                        <button onClick={() => copyCode(code.id, code.code)} className="text-gray-400 hover:text-indigo-600">
                          {copiedId === code.id ? <span className="text-xs text-emerald-600">✓</span> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{code.owner}</td>
                    <td className="px-4 py-4 text-emerald-600 font-medium">Rp {code.discount.toLocaleString("id")}</td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-gray-700 mb-1">{code.used} / {code.quota}</p>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(code.used / code.quota) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleActive(code.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${code.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {code.active ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900 font-bold">Tambah Kode Referal</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">Kode Referal</label>
                <input placeholder="OSPEK2026" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">Nama Pemilik Kode</label>
                <input className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">Nominal Diskon DP (Rp)</label>
                <input type="number" placeholder="10000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">Kuota</label>
                <input type="number" placeholder="100" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
                <p className="text-gray-400 text-xs mt-1">Batas informasi saja — kode harus dinonaktifkan manual</p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
