import { useState } from "react";
import { Upload, X, Truck, Store, Info } from "lucide-react";
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
  { name: "Paket Standar", price: "Rp 285.000", dp: "Rp 85.000", dpNum: 85000 },
  { name: "Paket Lengkap", price: "Rp 320.000", dp: "Rp 100.000", dpNum: 100000 },
  { name: "Paket Ekonomis", price: "Rp 250.000", dp: "Rp 75.000", dpNum: 75000 },
];

const steps = ["Pilih Paket", "Data Diri & Akademik", "Data Medis", "Pengiriman"];

export function UserPesan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [faculty, setFaculty] = useState("");
  const [nim, setNim] = useState("");
  const [cluster, setCluster] = useState("");
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [delivery, setDelivery] = useState<"kirim" | "ambil">("kirim");

  const pkg = packages[selectedPkg];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarUser />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Step progress */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < step ? "bg-emerald-500 text-white" :
                  i === step ? "bg-indigo-600 text-white" :
                  "bg-gray-200 text-gray-500"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${i === step ? "text-indigo-700 font-medium" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 0: Pilih Paket */}
            {step === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold mb-4">Pilih Paket</h3>
                <div className="space-y-3">
                  {packages.map((p, i) => (
                    <label key={p.name} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPkg === i ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="pkg" checked={selectedPkg === i} onChange={() => setSelectedPkg(i)} className="accent-indigo-600" />
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{p.name}</p>
                        <p className="text-gray-500 text-sm">Est. {p.price} · 16 item</p>
                      </div>
                      <span className="text-indigo-600 text-sm font-medium">DP {p.dp}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Identitas Akademik */}
            {step === 1 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold mb-4">Data Akademik</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 flex items-center gap-2">
                      Fakultas <span className="text-rose-500 text-xs">Wajib diisi</span>
                    </label>
                    <select value={faculty} onChange={e => setFaculty(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-900">
                      <option value="">Pilih Fakultas</option>
                      {faculties.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 flex items-center gap-2">
                      NIM <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full">opsional — bisa diisi nanti</span>
                    </label>
                    <input value={nim} onChange={e => setNim(e.target.value)} placeholder="Contoh: 225150201111001"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-1.5 flex items-center gap-2">
                      Cluster <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full">opsional</span>
                    </label>
                    <input type="number" value={cluster} onChange={e => setCluster(e.target.value)} placeholder="Nomor cluster"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Data Medis + Pas Foto */}
            {step === 2 && (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-gray-900 font-semibold mb-3">Rekam Medis</h3>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-4">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-sm">Data ini digunakan panitia untuk keperluan medis saat ospek. Kerahasiaan terjaga.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-700 text-sm font-medium mb-1.5 block">Riwayat Penyakit</label>
                      <textarea value={disease} onChange={e => setDisease(e.target.value)} rows={3}
                        placeholder="Contoh: Asma, Maag — atau ketik tanda (-) jika tidak ada"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none" />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-medium mb-1.5 block">Alergi Obat</label>
                      <textarea value={allergy} onChange={e => setAllergy(e.target.value)} rows={2}
                        placeholder="Contoh: Penisilin — atau ketik tanda (-) jika tidak ada"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-gray-900 font-semibold mb-1 flex items-center gap-2">
                    Pas Foto <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full">bisa diisi nanti</span>
                  </h3>
                  {!photo ? (
                    <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors mt-3">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm font-medium">Klik atau drag foto ke sini</p>
                      <p className="text-gray-400 text-xs mt-1">.jpg / .png, maksimal 3MB</p>
                      <input type="file" accept="image/*" className="hidden" onChange={e => setPhoto(e.target.files?.[0] || null)} />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                        <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" alt="preview" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm font-medium truncate">{photo.name}</p>
                        <p className="text-gray-400 text-xs">{(photo.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button onClick={() => setPhoto(null)} className="text-gray-400 hover:text-rose-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Pengiriman */}
            {step === 3 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-gray-900 font-semibold mb-4">Opsi Pengiriman</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${delivery === "kirim" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}>
                    <input type="radio" name="delivery" checked={delivery === "kirim"} onChange={() => setDelivery("kirim")} className="accent-indigo-600 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1"><Truck className="w-4 h-4 text-gray-600" /><span className="font-medium text-gray-900">Kirim ke Alamat</span></div>
                      <p className="text-gray-500 text-sm">Paket diantar kurir ke lokasi kamu</p>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${delivery === "ambil" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}>
                    <input type="radio" name="delivery" checked={delivery === "ambil"} onChange={() => setDelivery("ambil")} className="accent-indigo-600 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2 mb-1"><Store className="w-4 h-4 text-gray-600" /><span className="font-medium text-gray-900">Ambil di Tempat</span></div>
                      <p className="text-gray-500 text-sm">Ambil sendiri di lokasi panitia</p>
                    </div>
                  </label>
                </div>

                {delivery === "kirim" && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <p className="text-gray-500 text-sm mb-1">Alamat pengiriman:</p>
                    <p className="text-gray-400 text-sm italic">Belum ada alamat. <button className="text-indigo-600 underline">Isi di halaman profil →</button></p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-full text-gray-600 border border-gray-300 text-sm hover:bg-gray-50">
                  Kembali
                </button>
              )}
              {step < steps.length - 1 ? (
                <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 rounded-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700">
                  Lanjut
                </button>
              ) : (
                <button onClick={() => navigate("/user/checkout")} className="px-6 py-2.5 rounded-full text-white text-sm font-medium hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
                  Lanjut ke Pembayaran DP
                </button>
              )}
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-24">
              <h3 className="text-gray-900 font-semibold mb-4">Ringkasan</h3>
              <p className="text-gray-900 font-medium">{pkg.name}</p>
              <p className="text-gray-500 text-sm mb-4">16 item bundle</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Harga Estimasi</span>
                  <span className="text-gray-900">{pkg.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">DP sekarang</span>
                  <span className="text-indigo-600 font-bold">{pkg.dp}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs mb-4">Sisa dibayar setelah harga resmi keluar</p>
              <button onClick={() => navigate("/user/checkout")}
                className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90"
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
