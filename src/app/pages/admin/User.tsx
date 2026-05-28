import { useState } from "react";
import { Pencil, KeyRound, UserX, Plus, X } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";

const usersData = [
  { id: 1, name: "Budi Santoso", email: "budi@gmail.com", role: "Pemesan", wa: "081234567890", joined: "10 Mei 2026" },
  { id: 2, name: "Sari Dewi", email: "sari@gmail.com", role: "Pemesan", wa: "082345678901", joined: "11 Mei 2026" },
  { id: 3, name: "Ahmad Fauzi", email: "ahmad@gmail.com", role: "Kurir", wa: "083456789012", joined: "5 Mei 2026" },
  { id: 4, name: "Rizki Pratama", email: "rizki@gmail.com", role: "Kurir", wa: "084567890123", joined: "5 Mei 2026" },
  { id: 5, name: "Maya Putri", email: "maya@gmail.com", role: "Pemesan", wa: "085678901234", joined: "12 Mei 2026" },
];

type Tab = "Semua" | "Pemesan" | "Kurir";

export function AdminUser() {
  const [tab, setTab] = useState<Tab>("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [resetModal, setResetModal] = useState<typeof usersData[0] | null>(null);

  const filtered = usersData.filter(u => tab === "Semua" || u.role === tab);

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">Manajemen User</h1>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> Tambah User
          </button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(["Semua", "Pemesan", "Kurir"] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm ${tab === t ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600"}`}>
                {t}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${tab === t ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
                  {t === "Semua" ? usersData.length : usersData.filter(u => u.role === t).length}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Avatar & Nama", "Email", "Role", "WhatsApp", "Tgl Daftar", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold ${user.role === "Pemesan" ? "bg-indigo-500" : "bg-amber-500"}`}>
                          {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                        <span className="text-gray-900 font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "Pemesan" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.wa}</td>
                    <td className="px-4 py-3 text-gray-500">{user.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil className="w-4 h-4" /></button>
                        {user.role === "Kurir" && (
                          <button onClick={() => setResetModal(user)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><KeyRound className="w-4 h-4" /></button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-400"><UserX className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900 font-bold">Tambah User Baru</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              {["Nama Lengkap", "Email", "Nomor WhatsApp", "Password"].map(label => (
                <div key={label}>
                  <label className="text-gray-700 text-sm font-medium mb-1 block">{label}</label>
                  <input type={label === "Password" ? "password" : "text"}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              ))}
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1 block">Role</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500">
                  <option>Pemesan</option>
                  <option>Kurir</option>
                </select>
              </div>
              <p className="text-gray-400 text-xs">Akun akan langsung aktif tanpa verifikasi email</p>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-gray-900 font-bold mb-2">Reset password akun {resetModal.name}?</h3>
            <p className="text-gray-500 text-sm mb-5">Password baru akan dikirimkan ke email kurir.</p>
            <div className="flex gap-2">
              <button onClick={() => setResetModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Batal</button>
              <button onClick={() => setResetModal(null)} className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm">Ya, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
