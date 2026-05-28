import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";
import { StatusBadge } from "../../components/StatusBadge";

const orders = [
  { id: 1, name: "Budi Santoso", email: "budi@gmail.com", paket: "Paket Standar", bayar: "DP Lunas", logistik: "Sedang Di Jalan", kurir: "Ahmad Fauzi", flags: [] },
  { id: 2, name: "Sari Dewi", email: "sari@gmail.com", paket: "Paket Lengkap", bayar: "Lunas", logistik: "Selesai", kurir: "Rizki Pratama", flags: [] },
  { id: 3, name: "Andi Wijaya", email: "andi@gmail.com", paket: "Paket Standar", bayar: "Belum Bayar", logistik: "Pending", kurir: "-", flags: ["no-address"] },
  { id: 4, name: "Maya Putri", email: "maya@gmail.com", paket: "Paket Ekonomis", bayar: "DP Lunas", logistik: "Ditugaskan", kurir: "Ahmad Fauzi", flags: ["no-photo"] },
  { id: 5, name: "Dimas Prasetyo", email: "dimas@gmail.com", paket: "Paket Lengkap", bayar: "Lunas", logistik: "Sedang Di Jalan", kurir: "Rizki Pratama", flags: ["no-address", "no-photo"] },
  { id: 6, name: "Fitri Handayani", email: "fitri@gmail.com", paket: "Paket Standar", bayar: "DP Lunas", logistik: "Pending", kurir: "-", flags: [] },
];

const kurirList = ["Ahmad Fauzi", "Rizki Pratama", "Beni Setiawan", "Cindy Rahayu"];

export function AdminPesanan() {
  const [search, setSearch] = useState("");
  const [tabFilter, setTabFilter] = useState("Semua");
  const [bayarFilter, setBayarFilter] = useState("Semua");
  const [logistikFilter, setLogistikFilter] = useState("Semua");

  const flagTabs = [
    { label: "Semua", count: orders.length },
    { label: "Belum Isi Alamat", count: orders.filter(o => o.flags.includes("no-address")).length },
    { label: "Belum Upload Foto", count: orders.filter(o => o.flags.includes("no-photo")).length },
  ];

  const filtered = orders.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase());
    const matchBayar = bayarFilter === "Semua" || o.bayar === bayarFilter;
    const matchLogistik = logistikFilter === "Semua" || o.logistik === logistikFilter;
    const matchTab = tabFilter === "Semua" || (tabFilter === "Belum Isi Alamat" && o.flags.includes("no-address")) || (tabFilter === "Belum Upload Foto" && o.flags.includes("no-photo"));
    return matchSearch && matchBayar && matchLogistik && matchTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      <SidebarAdmin />

      <div className="flex-1 ml-60">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-gray-900 font-bold text-lg">Daftar Pesanan</h1>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Ekspor
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Filter bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau email..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500" />
            </div>
            {[
              { label: "Status Bayar", options: ["Semua", "Belum Bayar", "DP Lunas", "Lunas"], val: bayarFilter, set: setBayarFilter },
              { label: "Status Logistik", options: ["Semua", "Pending", "Ditugaskan", "Sedang Di Jalan", "Selesai"], val: logistikFilter, set: setLogistikFilter },
            ].map(({ label, options, val, set }) => (
              <select key={label} value={val} onChange={e => set(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-gray-700">
                <option value="Semua">{label}</option>
                {options.slice(1).map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>

          {/* Flag tabs */}
          <div className="flex gap-2">
            {flagTabs.map(({ label, count }) => (
              <button key={label} onClick={() => setTabFilter(label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all ${tabFilter === label ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                {label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${tabFilter === label ? "bg-white/20" : label === "Belum Isi Alamat" ? "bg-rose-100 text-rose-600" : label === "Belum Upload Foto" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-8 px-4 py-3"><input type="checkbox" /></th>
                  {["Nama", "Paket", "Status Bayar", "Status Logistik", "Kurir", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${order.flags.includes("no-address") ? "border-l-2 border-l-rose-400" : ""} ${order.flags.includes("no-photo") ? "border-l-2 border-l-orange-400" : ""}`}>
                    <td className="px-4 py-3"><input type="checkbox" /></td>
                    <td className="px-4 py-3">
                      <p className="text-gray-900 font-medium">{order.name}</p>
                      <p className="text-gray-400 text-xs">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{order.paket}</td>
                    <td className="px-4 py-3"><StatusBadge type="bayar" status={order.bayar} /></td>
                    <td className="px-4 py-3"><StatusBadge type="logistik" status={order.logistik} /></td>
                    <td className="px-4 py-3">
                      {order.bayar === "Lunas" || order.bayar === "DP Lunas" ? (
                        <div className="flex items-center gap-2">
                          <select defaultValue={order.kurir} className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none">
                            <option>-</option>
                            {kurirList.map(k => <option key={k}>{k}</option>)}
                          </select>
                          {order.logistik === "Pending" && <button className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs hover:bg-indigo-200">Tugaskan</button>}
                        </div>
                      ) : <span className="text-gray-400 text-xs">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Eye className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-gray-500 text-sm">Menampilkan {filtered.length} dari {orders.length} pesanan</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">← Prev</button>
                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs">1</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">Next →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
