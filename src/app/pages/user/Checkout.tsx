import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { useNavigate } from "react-router";

const packageItems = [
  "Name Tag",
  "Pin Cluster",
  "Bag Tag",
  "Sandal Jepit",
  "Botol 1.5L",
  "Buku Catatan",
  "Pita Merah Putih",
  "Pita Sakit",
  "Pita Gerbang",
  "TrashBag",
  "Jas Hujan",
  "Koran",
  "Roti",
  "Tumbler 600ml",
  "Tote Bag",
  "Hand Sanitizer",
];

export function UserCheckout() {
  const navigate = useNavigate();
  const [showItems, setShowItems] = useState(false);
  const [referral, setReferral] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralError, setReferralError] = useState(false);
  const [loading, setLoading] = useState(false);
  const discount = referralApplied ? 10000 : 0;
  const dpBase = 85000;
  const total = dpBase - discount;

  function applyReferral() {
    if (referral.toUpperCase() === "OSPEK2026") {
      setReferralApplied(true);
      setReferralError(false);
    } else {
      setReferralApplied(false);
      setReferralError(true);
    }
  }

  function handlePay() {
    setLoading(true);
    setTimeout(() => navigate("/user/pembayaran-berhasil"), 2000);
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <NavbarUser />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span className="text-gray-600">Form Pemesanan</span>
          <span>→</span>
          <span className="text-indigo-600 font-medium">Checkout</span>
          <span>→</span>
          <span>Selesai</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="space-y-4">
          {/* Ringkasan pesanan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-gray-900 font-semibold mb-4">
              Ringkasan Pesanan
            </h3>
            <p className="text-gray-900 font-medium">Paket Standar</p>
            <p className="text-gray-500 text-sm mb-3">16 item bundle</p>

            <button
              onClick={() => setShowItems(!showItems)}
              className="flex items-center gap-1 text-indigo-600 text-sm"
            >
              {showItems ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {showItems ? "Sembunyikan" : "Lihat isi paket (16 item)"}
            </button>

            {showItems && (
              <div className="grid grid-cols-2 gap-1.5 mt-3 p-3 bg-gray-50 rounded-xl">
                {packageItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-gray-600"
                  >
                    <span className="text-indigo-500">✓</span> {item}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Opsi pengiriman</span>
                <span className="text-gray-800">Kirim ke Alamat</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Alamat</span>
                <span className="text-gray-800 text-right max-w-xs truncate">
                  Jl. Veteran No. 1, Kos Mawar, Malang
                </span>
              </div>
            </div>
          </div>

          {/* Kode referal */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-gray-900 font-semibold mb-3">
              Punya Kode Referal?{" "}
              <span className="text-gray-400 text-sm font-normal">
                (opsional)
              </span>
            </h3>
            <div className="flex gap-2">
              <input
                value={referral}
                onChange={(e) => {
                  setReferral(e.target.value);
                  setReferralError(false);
                }}
                placeholder="Contoh: OSPEK2026"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                onClick={applyReferral}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700"
              >
                Terapkan
              </button>
            </div>
            {referralApplied && (
              <p className="text-emerald-600 text-sm mt-2">
                ✓ Kode berhasil! Diskon Rp 10.000
              </p>
            )}
            {referralError && (
              <p className="text-rose-500 text-sm mt-2">
                Kode tidak valid atau sudah tidak aktif
              </p>
            )}
          </div>

          {/* Rincian pembayaran */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-gray-900 font-semibold mb-4">
              Rincian Pembayaran
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">DP Dasar</span>
                <span className="text-gray-900">Rp 85.000</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Diskon Referal</span>
                  <span className="text-emerald-600">
                    - Rp {discount.toLocaleString("id")}
                  </span>
                </div>
              )}
              <hr className="border-gray-100" />
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Total DP yang Dibayar
                </span>
                <span className="text-indigo-600 font-bold text-lg">
                  Rp {total.toLocaleString("id")}
                </span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-amber-700 text-xs">
                Harga estimasi. Sisa tagihan akan muncul setelah panitia rilis
                harga resmi.
              </p>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              Pembayaran diproses melalui Dokupay — QRIS, E-Wallet, VA tersedia
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-4 rounded-full text-white font-medium hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Mengarahkan ke
                pembayaran...
              </>
            ) : (
              `Bayar DP Sekarang — Rp ${total.toLocaleString("id")}`
            )}
          </button>
          <p className="text-center text-gray-400 text-xs">
            Dengan menekan tombol ini, kamu menyetujui{" "}
            <span className="underline">syarat & ketentuan</span>
          </p>
        </div>
      </div>
    </div>
  );
}
