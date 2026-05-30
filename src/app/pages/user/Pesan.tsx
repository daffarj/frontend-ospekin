import { useState } from "react";
import { Upload, X, Truck, Store, Info, AlertTriangle } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { useNavigate } from "react-router";

const faculties = [
  "Fakultas Hukum", "Fakultas Ekonomi dan Bisnis", "Fakultas Ilmu Administrasi",
  "Fakultas Pertanian", "Fakultas Peternakan", "Fakultas Teknik",
  "Fakultas Kedokteran", "Fakultas Perikanan dan Ilmu Kelautan",
  "Fakultas MIPA", "Fakultas Teknologi Pertanian",
  "Fakultas Ilmu Sosial dan Ilmu Politik", "Fakultas Ilmu Budaya",
  "Fakultas Kedokteran Gigi", "Fakultas Ilmu Komputer",
  "Fakultas Kedokteran Hewan", "Fakultas Vokasi",
];

const packages = [
  { name: "Paket Standar",  price: "Rp 285.000", dp: "Rp 85.000",  dpNum: 85000  },
  { name: "Paket Lengkap",  price: "Rp 320.000", dp: "Rp 100.000", dpNum: 100000 },
  { name: "Paket Ekonomis", price: "Rp 250.000", dp: "Rp 75.000",  dpNum: 75000  },
];

const steps = ["Pilih Paket", "Data Akademik", "Data Medis", "Pengiriman"];

export function UserPesan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [faculty, setFaculty] = useState("");
  const [nim, setNim] = useState("");
  const [cluster, setCluster] = useState("");
  const [profileComplete, setProfileComplete] = useState(false);
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [delivery, setDelivery] = useState<"kirim" | "ambil">("kirim");
  const pkg = packages[selectedPkg];

  const inputCls = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-colors text-sm";
  const labelCls = "text-white/60 text-sm font-medium mb-1.5 block";

  return (
    <div className="min-h-screen text-white" style={{ background: "#030303", fontFamily: "Inter, sans-serif" }}>
      <NavbarUser />

      {/* Demo toggle */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <button
          onClick={() => setProfileComplete(p => !p)}
          className={`px-3 py-1.5 rounded-full text-xs transition-all ${profileComplete ? "bg-indigo-600 text-white" : "bg-white/5 border border-white/10 text-white/50"}`}
        >
          Demo: profil {profileComplete ? "lengkap ✓" : "belum lengkap"}
        </button>
      </div>

      {/* Gate — profil belum lengkap */}
      {!profileComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Lengkapi Profil Dulu</h2>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              Kamu harus isi nama lengkap dan nomor WhatsApp sebelum bisa memesan.
            </p>
            <button
              onClick={() => navigate("/user/profil")}
              className="w-full py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
            >
              Ke Halaman Profil
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full mt-3 py-2 rounded-full text-white/30 text-sm hover:text-white/60 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Step progress */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < step  ? "bg-emerald-500/80 text-white shadow-lg shadow-emerald-500/20" :
                  i === step ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20" :
                  "bg-white/8 border border-white/10 text-white/30"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${i === step ? "text-indigo-400 font-medium" : "text-white/25"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-emerald-500/50" : "bg-white/8"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-4">

            {/* Step 0: Pilih Paket */}
            {step === 0 && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Pilih Paket</h3>
                <div className="space-y-3">
                  {packages.map((p, i) => (
                    <label key={p.name} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedPkg === i
                        ? "border-indigo-500/60 bg-indigo-500/10"
                        : "border-white/8 hover:border-white/20 hover:bg-white/5"
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedPkg === i ? "border-indigo-400" : "border-white/20"
                      }`}>
                        {selectedPkg === i && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
                      </div>
                      <input type="radio" name="pkg" checked={selectedPkg === i} onChange={() => setSelectedPkg(i)} className="hidden" />
                      <div className="flex-1">
                        <p className="text-white font-medium">{p.name}</p>
                        <p className="text-white/40 text-sm">Est. {p.price} · 16 item</p>
                      </div>
                      <span className={`text-sm font-medium ${selectedPkg === i ? "text-indigo-400" : "text-white/50"}`}>DP {p.dp}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Data Akademik */}
            {step === 1 && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-5">Data Akademik</h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>
                      Fakultas <span className="text-rose-400 text-xs ml-1">Wajib diisi</span>
                    </label>
                    <select value={faculty} onChange={e => setFaculty(e.target.value)} className={inputCls}
                      style={{ colorScheme: "dark" }}>
                      <option value="" className="bg-[#111]">Pilih Fakultas</option>
                      {faculties.map(f => <option key={f} className="bg-[#111]">{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>
                      NIM <span className="text-white/25 text-xs ml-1 px-2 py-0.5 bg-white/5 rounded-full">opsional — bisa diisi nanti</span>
                    </label>
                    <input value={nim} onChange={e => setNim(e.target.value)}
                      placeholder="Contoh: 225150201111001" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Cluster <span className="text-white/25 text-xs ml-1 px-2 py-0.5 bg-white/5 rounded-full">opsional</span>
                    </label>
                    <input type="number" value={cluster} onChange={e => setCluster(e.target.value)}
                      placeholder="Nomor cluster" className={inputCls} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Data Medis + Pas Foto */}
            {step === 2 && (
              <>
                <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-3">Rekam Medis</h3>
                  <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-5">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-blue-300 text-sm">Data ini digunakan panitia untuk keperluan medis saat ospek. Kerahasiaan terjaga.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>Riwayat Penyakit</label>
                      <textarea value={disease} onChange={e => setDisease(e.target.value)} rows={3}
                        placeholder="Contoh: Asma, Maag — atau ketik (-) jika tidak ada"
                        className={`${inputCls} resize-none`} />
                    </div>
                    <div>
                      <label className={labelCls}>Alergi Obat</label>
                      <textarea value={allergy} onChange={e => setAllergy(e.target.value)} rows={2}
                        placeholder="Contoh: Penisilin — atau ketik (-) jika tidak ada"
                        className={`${inputCls} resize-none`} />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    Pas Foto
                    <span className="text-white/25 text-xs px-2 py-0.5 bg-white/5 rounded-full">bisa diisi nanti</span>
                  </h3>
                  {!photo ? (
                    <label className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-8 cursor-pointer hover:border-indigo-500/40 hover:bg-white/3 transition-all">
                      <Upload className="w-8 h-8 text-white/20 mb-2" />
                      <p className="text-white/50 text-sm font-medium">Klik atau drag foto ke sini</p>
                      <p className="text-white/25 text-xs mt-1">.jpg / .png, maksimal 3MB</p>
                      <input type="file" accept="image/*" className="hidden" onChange={e => setPhoto(e.target.files?.[0] || null)} />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 mt-4 p-3 bg-white/5 border border-white/8 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/10">
                        <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" alt="preview" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{photo.name}</p>
                        <p className="text-white/30 text-xs">{(photo.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button onClick={() => setPhoto(null)} className="text-white/30 hover:text-rose-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Pengiriman */}
            {step === 3 && (
              <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Opsi Pengiriman</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { value: "kirim", icon: Truck,  title: "Kirim ke Alamat",  desc: "Paket diantar kurir ke lokasi kamu" },
                    { value: "ambil", icon: Store,  title: "Ambil di Tempat",   desc: "Ambil sendiri di lokasi panitia" },
                  ].map(opt => (
                    <label key={opt.value} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      delivery === opt.value
                        ? "border-indigo-500/60 bg-indigo-500/10"
                        : "border-white/8 hover:border-white/20 hover:bg-white/5"
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        delivery === opt.value ? "border-indigo-400" : "border-white/20"
                      }`}>
                        {delivery === opt.value && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
                      </div>
                      <input type="radio" name="delivery" checked={delivery === opt.value as "kirim"|"ambil"}
                        onChange={() => setDelivery(opt.value as "kirim"|"ambil")} className="hidden" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <opt.icon className="w-4 h-4 text-white/50" />
                          <span className="text-white font-medium text-sm">{opt.title}</span>
                        </div>
                        <p className="text-white/40 text-sm">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {delivery === "kirim" && (
                  <div className="p-4 bg-white/3 border border-white/8 rounded-xl">
                    <p className="text-white/40 text-sm mb-1">Alamat pengiriman:</p>
                    <p className="text-white/25 text-sm italic">
                      Belum ada alamat.{" "}
                      <button onClick={() => navigate("/user/profil")} className="text-indigo-400 underline hover:text-indigo-300">
                        Isi di halaman profil →
                      </button>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 rounded-full text-white/60 border border-white/10 text-sm hover:bg-white/5 hover:text-white transition-all">
                  Kembali
                </button>
              )}
              {step < steps.length - 1 ? (
                <button onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors">
                  Lanjut
                </button>
              ) : (
                <button onClick={() => navigate("/user/checkout")}
                  className="px-6 py-2.5 rounded-full text-white text-sm font-medium hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
                  Lanjut ke Pembayaran DP
                </button>
              )}
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-4">Ringkasan</h3>
              <p className="text-white font-semibold">{pkg.name}</p>
              <p className="text-white/40 text-sm mb-5">16 item bundle</p>
              <div className="space-y-3 mb-5 border-t border-white/8 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Harga Estimasi</span>
                  <span className="text-white">{pkg.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">DP sekarang</span>
                  <span className="text-indigo-400 font-bold">{pkg.dp}</span>
                </div>
              </div>
              <p className="text-white/25 text-xs mb-5">Sisa dibayar setelah harga resmi keluar</p>
              <button onClick={() => navigate("/user/checkout")}
                className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
                Lanjut ke Pembayaran DP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}