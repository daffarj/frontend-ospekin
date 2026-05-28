import { useState } from "react";
import { Pencil, Eye, Send, X, Plus } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";

type Package = {
  id: number;
  name: string;
  estimasi: string;
  dp: string;
  final: string | null;
  aktif: boolean;
};

const initPackages: Package[] = [
  { id: 1, name: "Paket Standar", estimasi: "285.000", dp: "85.000", final: null, aktif: true },
  { id: 2, name: "Paket Lengkap", estimasi: "320.000", dp: "100.000", final: "318.000", aktif: true },
  { id: 3, name: "Paket Ekonomis", estimasi: "250.000", dp: "75.000", final: null, aktif: false },
];

export function AdminPaket() {
  const [packages, setPackages] = useState<Package[]>(initPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [releaseModal, setReleaseModal] = useState<Package | null>(null);
  const [editPkg, setEditPkg] = useState<Package | null>(null);

  function toggleAktif(id: number) {
    setPackages(p => p.map(pkg => pkg.id === id ? { ...pkg, aktif: !pkg.aktif } : pkg));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">Manajemen Paket</h1>
          <button onClick={() => { setEditPkg(null); setModalOpen(true); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Tambah Paket
          </button>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Nama Paket", "Harga Estimasi", "DP", "Harga Final", "Status", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-gray-900 font-medium">{pkg.name}</td>
                    <td className="px-4 py-4 text-gray-700">Rp {pkg.estimasi}</td>
                    <td className="px-4 py-4 text-gray-500">Rp {pkg.dp}</td>
                    <td className="px-4 py-4">
                      {pkg.final ? (
                        <span className="text-gray-900">Rp {pkg.final}</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">Belum Final</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleAktif(pkg.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${pkg.aktif ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {pkg.aktif ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditPkg(pkg); setModalOpen(true); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleAktif(pkg.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                          <Eye className="w-4 h-4" />
                        </button>
                        {pkg.final && (
                          <button onClick={() => setReleaseModal(pkg)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900 font-bold">{editPkg ? "Edit Paket" : "Tambah Paket"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Nama Paket", placeholder: "Contoh: Paket Standar" },
                { label: "Harga Estimasi (Rp)", placeholder: "285000" },
                { label: "Nominal DP (Rp)", placeholder: "85000" },
                { label: "Harga Final (Rp)", placeholder: "Kosongkan dulu, isi setelah panitia umumkan" },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label className="text-gray-700 text-sm font-medium mb-1.5 block">{label}</label>
                  <input placeholder={placeholder} defaultValue={editPkg && label === "Nama Paket" ? editPkg.name : ""}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm" />
                </div>
              ))}
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Isi Bundle</label>
                <textarea rows={3} placeholder="Satu item per baris: Name Tag, Pin Cluster, Sandal Jepit..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm resize-none" />
                <p className="text-gray-400 text-xs mt-1">Ini yang ditampilkan ke pembeli sebagai daftar isi paket</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Release modal */}
      {releaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-gray-900 font-bold mb-2">Rilis Tagihan Pelunasan?</h3>
            <p className="text-gray-500 text-sm mb-4">
              Kamu akan mengirimkan tagihan pelunasan ke <strong>890 pemesan</strong> paket {releaseModal.name}. Pastikan harga final sudah benar.
            </p>
            <div className="bg-gray-50 rounded-xl p-3 text-sm mb-5 space-y-1">
              <div className="flex justify-between"><span className="text-gray-500">DP Dibayar</span><span>Rp {releaseModal.dp}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Harga Final</span><span>Rp {releaseModal.final}</span></div>
              <div className="flex justify-between font-semibold"><span>Sisa Tagihan</span><span className="text-indigo-600">Rp {(parseInt(releaseModal.final!.replace(/\./g, "")) - parseInt(releaseModal.dp.replace(/\./g, ""))).toLocaleString("id")}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setReleaseModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => setReleaseModal(null)} className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm hover:bg-rose-700">Ya, Rilis Sekarang</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
