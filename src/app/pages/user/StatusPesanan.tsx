import { CheckCircle, Package, Truck, PackageCheck, CreditCard, Phone } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { useNavigate } from "react-router";
import { useState } from "react";

const trackSteps = [
  { label: "DP Lunas", icon: CheckCircle },
  { label: "Lunas", icon: CheckCircle },
  { label: "Ditugaskan", icon: Package },
  { label: "Sedang Di Jalan", icon: Truck },
  { label: "Selesai", icon: PackageCheck },
];

export function UserStatusPesanan() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3); // 0-indexed, 3 = Sedang Di Jalan

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarUser />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-gray-900 font-bold text-2xl">Status Pesanan</h1>
          <p className="text-gray-500 text-sm">Paket Standar</p>
        </div>

        {/* Progress tracker */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between">
            {trackSteps.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    i < currentStep ? "bg-emerald-500 text-white" :
                    i === currentStep ? "bg-indigo-600 text-white ring-4 ring-indigo-200" :
                    "bg-gray-100 text-gray-400"
                  } ${i === currentStep ? "animate-pulse" : ""}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-1.5 text-center max-w-16 leading-tight ${i === currentStep ? "text-indigo-700 font-medium" : i < currentStep ? "text-emerald-600" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < trackSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded ${i < currentStep ? "bg-emerald-400" : "bg-gray-100"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Demo control */}
          <div className="flex gap-1 mt-6 justify-center">
            {trackSteps.map((s, i) => (
              <button key={i} onClick={() => setCurrentStep(i)}
                className={`px-2.5 py-1 rounded-full text-xs ${currentStep === i ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Detail pesanan */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-900 font-semibold mb-3">Detail Pesanan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Paket</span><span className="text-gray-900">Paket Standar · 16 item</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tanggal pesan</span><span className="text-gray-900">12 Mei 2026</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Pengiriman</span><span className="text-gray-900">Kirim ke Alamat</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Alamat</span><span className="text-gray-900 text-right max-w-xs">Jl. Veteran No. 1, Kos Mawar, Kamar 12</span></div>
          </div>
        </div>

        {/* Tagihan pelunasan */}
        {currentStep >= 1 && currentStep < 4 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-4">
            <h3 className="text-blue-900 font-semibold mb-3">Tagihan Pelunasanmu Sudah Terbit!</h3>
            <div className="space-y-1 text-sm mb-4">
              <div className="flex justify-between"><span className="text-blue-700">Harga Resmi</span><span className="text-blue-900 font-medium">Rp 285.000</span></div>
              <div className="flex justify-between"><span className="text-blue-700">Sudah Dibayar (DP)</span><span className="text-blue-900">Rp 85.000</span></div>
              <div className="flex justify-between"><span className="text-blue-700 font-semibold">Sisa yang Harus Dibayar</span><span className="text-blue-900 font-bold text-lg">Rp 200.000</span></div>
            </div>
            <button className="w-full py-3 rounded-full text-white font-medium hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
              Bayar Pelunasan Sekarang
            </button>
          </div>
        )}

        {/* Kurir info */}
        {currentStep === 3 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-6 h-6 text-amber-600 animate-pulse" />
              <div>
                <p className="text-amber-900 font-semibold">Paketmu sedang dalam perjalanan!</p>
                <p className="text-amber-700 text-sm">Diantar oleh: Ahmad Fauzi</p>
              </div>
            </div>
            <a href="https://wa.me/6281234567890?text=Halo, saya mau tanya status pengiriman paket OSPEKIN saya" target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm font-medium transition-colors">
              <Phone className="w-4 h-4" /> Hubungi Kurir via WhatsApp
            </a>
          </div>
        )}

        {/* Bukti pengiriman */}
        {currentStep === 4 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-4">
            <h3 className="text-emerald-900 font-semibold mb-2">Paket Telah Diterima!</h3>
            <p className="text-emerald-700 text-sm mb-4">Diterima pada 20 Mei 2026, 14:32 WIB</p>
            <div className="aspect-square max-w-xs rounded-xl bg-gray-200 flex items-center justify-center mb-2">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-emerald-600 text-xs">Foto bukti penerimaan dari kurir</p>
          </div>
        )}

        {/* Edit button */}
        <button onClick={() => navigate("/user/pesanan/edit")} className="w-full py-3 rounded-full text-gray-700 border border-gray-300 text-sm hover:bg-gray-50">
          Edit Data Pesanan
        </button>
      </div>
    </div>
  );
}
