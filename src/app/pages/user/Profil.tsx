import { useState } from "react";
import { User, MapPin, Shield, Lock, Info } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";

type Tab = "diri" | "alamat" | "keamanan";

export function UserProfil() {
  const [tab, setTab] = useState<Tab>("diri");
  const [name, setName] = useState("Budi Santoso");
  const [phone, setPhone] = useState("81234567890");
  const [address, setAddress] = useState("");
  const [skipAddress, setSkipAddress] = useState(false);

  const tabs = [
    { id: "diri" as Tab, label: "Data Diri", icon: User },
    { id: "alamat" as Tab, label: "Alamat Pengiriman", icon: MapPin },
    { id: "keamanan" as Tab, label: "Keamanan", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarUser name={name} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2"
                  style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
                  {name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <p className="text-gray-900 font-semibold text-sm">{name}</p>
                <p className="text-gray-500 text-xs">budi@gmail.com</p>
              </div>

              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${tab === id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === "diri" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="text-gray-900 font-bold text-lg mb-6">Data Diri</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-900" />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 block">Nomor WhatsApp</label>
                    <div className="flex">
                      <span className="px-3 py-3 bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl text-gray-500 text-sm">+62</span>
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:border-indigo-500 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 block">Email</label>
                    <div className="relative">
                      <input value="budi@gmail.com" disabled
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-gray-400 bg-gray-50 cursor-not-allowed" />
                      <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Email tidak bisa diubah</p>
                  </div>
                  <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors">
                    Simpan Data Diri
                  </button>
                </div>
              </div>
            )}

            {tab === "alamat" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="text-gray-900 font-bold text-lg mb-4">Alamat Pengiriman</h2>

                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-5">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-blue-800 text-sm">Alamat ini yang akan digunakan sebagai tujuan pengiriman paketmu.</p>
                </div>

                <div className={`aspect-video rounded-xl border-2 border-dashed flex items-center justify-center mb-4 transition-colors ${skipAddress ? "border-gray-200 bg-gray-50" : "border-gray-300 bg-gray-100 hover:border-indigo-400 cursor-pointer"}`}>
                  <div className="text-center">
                    <MapPin className={`w-8 h-8 mx-auto mb-2 ${skipAddress ? "text-gray-300" : "text-gray-400"}`} />
                    <p className={`text-sm ${skipAddress ? "text-gray-300" : "text-gray-500"}`}>Google Maps Picker — klik untuk pin lokasi</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 text-sm font-medium mb-1.5 block">Alamat Lengkap</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    disabled={skipAddress}
                    placeholder="Contoh: Jl. Veteran No. 1, Kos Mawar, Kamar 12, Malang"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>

                <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
                  <input type="checkbox" checked={skipAddress} onChange={e => setSkipAddress(e.target.checked)}
                    className="mt-0.5 accent-indigo-600" />
                  <span className="text-gray-700 text-sm">Isi alamat menyusul (saya belum tahu alamat kos)</span>
                </label>

                {skipAddress && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                    <span className="text-amber-600 text-sm">⚠</span>
                    <p className="text-amber-800 text-sm">Kamu wajib mengisi alamat maksimal H-1 sebelum pengantaran</p>
                  </div>
                )}

                <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700">
                  Simpan Alamat
                </button>
              </div>
            )}

            {tab === "keamanan" && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="text-gray-900 font-bold text-lg mb-6">Ganti Password</h2>
                <div className="space-y-4 max-w-sm">
                  {["Password lama", "Password baru", "Konfirmasi password baru"].map((label) => (
                    <div key={label}>
                      <label className="text-gray-700 text-sm font-medium mb-1.5 block">{label}</label>
                      <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500" />
                    </div>
                  ))}
                  <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700">
                    Ubah Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
