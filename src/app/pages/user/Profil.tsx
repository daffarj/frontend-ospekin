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

  const inputCls =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-colors text-sm";
  const labelCls = "text-white/60 text-sm font-medium mb-1.5 block";

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#030303", fontFamily: "Inter, sans-serif" }}
    >
      <NavbarUser name={name} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
              <div className="text-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                  }}
                >
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-white/30 text-xs mt-0.5">budi@gmail.com</p>
              </div>

              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      tab === id
                        ? "bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 font-medium"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" /> {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Tab: Data Diri */}
            {tab === "diri" && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-6">Data Diri</h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Nama Lengkap</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Nomor WhatsApp</label>
                    <div className="flex">
                      <span className="px-3 py-3 bg-white/5 border border-white/10 border-r-0 rounded-l-xl text-white/40 text-sm">
                        +62
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-xl text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <div className="relative">
                      <input
                        value="budi@gmail.com"
                        disabled
                        className="w-full px-4 py-3 pr-10 bg-white/3 border border-white/8 rounded-xl text-white/25 cursor-not-allowed text-sm"
                      />
                      <Lock className="w-4 h-4 text-white/20 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-white/25 text-xs mt-1">
                      Email tidak bisa diubah
                    </p>
                  </div>
                  <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors">
                    Simpan Data Diri
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Alamat */}
            {tab === "alamat" && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-4">
                  Alamat Pengiriman
                </h2>

                <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-5">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-blue-300 text-sm">
                    Alamat ini yang akan digunakan sebagai tujuan pengiriman
                    paketmu.
                  </p>
                </div>

                {/* Maps placeholder */}
                <div
                  className={`aspect-video rounded-xl border-2 border-dashed flex items-center justify-center mb-4 transition-all ${
                    skipAddress
                      ? "border-white/5 bg-white/3"
                      : "border-white/10 bg-white/3 hover:border-indigo-500/40 hover:bg-indigo-500/5 cursor-pointer"
                  }`}
                >
                  <div className="text-center">
                    <MapPin
                      className={`w-8 h-8 mx-auto mb-2 ${skipAddress ? "text-white/15" : "text-white/25"}`}
                    />
                    <p
                      className={`text-sm ${skipAddress ? "text-white/15" : "text-white/30"}`}
                    >
                      Google Maps Picker — klik untuk pin lokasi
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelCls}>Alamat Lengkap</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={skipAddress}
                    placeholder="Contoh: Jl. Veteran No. 1, Kos Mawar, Kamar 12, Malang"
                    rows={3}
                    className={`${inputCls} resize-none disabled:opacity-30 disabled:cursor-not-allowed`}
                  />
                </div>

                <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
                  <div
                    onClick={() => setSkipAddress((s) => !s)}
                    className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      skipAddress
                        ? "bg-indigo-600 border-indigo-500"
                        : "border-white/20 bg-white/5"
                    }`}
                  >
                    {skipAddress && (
                      <span className="text-white text-[10px] font-bold leading-none">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-white/60 text-sm select-none">
                    Isi alamat menyusul (saya belum tahu alamat kos)
                  </span>
                </label>

                {skipAddress && (
                  <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
                    <span className="text-amber-400 text-sm shrink-0">⚠</span>
                    <p className="text-amber-300 text-sm">
                      Kamu wajib mengisi alamat maksimal H-1 sebelum pengantaran
                    </p>
                  </div>
                )}

                <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors">
                  Simpan Alamat
                </button>
              </div>
            )}

            {/* Tab: Keamanan */}
            {tab === "keamanan" && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-6">
                  Ganti Password
                </h2>
                <div className="space-y-4 max-w-sm">
                  {[
                    "Password lama",
                    "Password baru",
                    "Konfirmasi password baru",
                  ].map((label) => (
                    <div key={label}>
                      <label className={labelCls}>{label}</label>
                      <input
                        type="password"
                        className={inputCls}
                        placeholder="••••••••"
                      />
                    </div>
                  ))}
                  <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors">
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
