import { useState } from "react";
import { MapPin, Phone, Package, Truck, CheckCircle, ChevronDown, ChevronUp, Upload, X } from "lucide-react";
import { NavbarKurir } from "../../components/NavbarKurir";
import { StatusBadge } from "../../components/StatusBadge";

const packageItems = [
  "Name Tag", "Pin Cluster", "Bag Tag", "Sandal Jepit",
  "Botol 1.5L", "Buku Catatan", "Pita Merah Putih", "Pita Sakit",
  "Pita Gerbang", "TrashBag", "Jas Hujan", "Koran",
  "Roti", "Tumbler 600ml", "Tote Bag", "Hand Sanitizer",
];

type Status = "Ditugaskan" | "Sedang Di Jalan" | "Selesai";

export function KurirDetailPesanan() {
  const [status, setStatus] = useState<Status>("Ditugaskan");
  const [showItems, setShowItems] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [podPhoto, setPodPhoto] = useState<File | null>(null);

  function mulaiPengantaran() {
    setStatus("Sedang Di Jalan");
    setConfirmModal(false);
  }

  function submitPOD() {
    setStatus("Selesai");
    setUploadModal(false);
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarKurir showBack />

      <div className="max-w-lg mx-auto px-4 py-4 pb-20 space-y-3">
        {/* Header card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-gray-900 font-bold text-xl">Budi Santoso</h2>
            <StatusBadge type="logistik" status={status} />
          </div>
          <p className="text-gray-500 text-sm">Paket Standar · 16 item bundle</p>
        </div>

        {/* Penerima */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="text-gray-900 font-semibold mb-3">Info Penerima</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">👤</div>
              <div><p className="text-xs text-gray-400">Nama</p><p className="text-gray-800 font-medium">Budi Santoso</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><Phone className="w-4 h-4 text-gray-500" /></div>
              <div><p className="text-xs text-gray-400">WhatsApp</p>
                <a href="https://wa.me/6281234567890" className="text-indigo-600 font-medium">+62 812-3456-7890</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-gray-500" /></div>
              <div><p className="text-xs text-gray-400">Alamat</p><p className="text-gray-800">Jl. Veteran No. 1, Kos Mawar, Kamar 12, Malang</p></div>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Jl.+Veteran+No.+1+Malang" target="_blank"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50">
            <MapPin className="w-4 h-4" /> Buka di Google Maps
          </a>
        </div>

        {/* Isi Paket */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <button onClick={() => setShowItems(!showItems)} className="w-full flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900 font-medium text-sm">Isi Paket (16 item)</span>
            </div>
            {showItems ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {showItems && (
            <div className="grid grid-cols-2 gap-2 px-5 pb-4 border-t border-gray-100 pt-3">
              {packageItems.map(item => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="text-indigo-500 text-xs">✓</span> {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 border-t-4 border-t-indigo-500">
          {status === "Ditugaskan" && (
            <>
              <p className="text-gray-500 text-sm mb-4">Kamu belum memulai pengantaran ini</p>
              <button onClick={() => setConfirmModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-medium"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                <Truck className="w-5 h-5" /> Mulai Pengantaran
              </button>
            </>
          )}

          {status === "Sedang Di Jalan" && (
            <>
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl mb-4">
                <Truck className="w-4 h-4 text-amber-600 animate-pulse" />
                <p className="text-amber-800 text-sm">Sedang dalam perjalanan...</p>
              </div>
              <button onClick={() => setUploadModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-medium"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <CheckCircle className="w-5 h-5" /> Paket Telah Diterima
              </button>
            </>
          )}

          {status === "Selesai" && (
            <>
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <p className="text-emerald-800 text-sm font-medium">Pengantaran selesai!</p>
              </div>
              {podPhoto && (
                <div>
                  <img src={URL.createObjectURL(podPhoto)} className="w-full rounded-xl object-cover aspect-video mb-2" alt="POD" />
                  <p className="text-gray-400 text-xs text-center">Foto bukti penerimaan</p>
                </div>
              )}
              <p className="text-gray-500 text-sm text-center mt-2">20 Mei 2026, 14:32 WIB</p>
            </>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-gray-900 font-bold mb-2">Mulai pengantaran?</h3>
            <p className="text-gray-500 text-sm mb-5">Mulai pengantaran ke <strong>Budi Santoso</strong>?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600">Batal</button>
              <button onClick={mulaiPengantaran} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Mulai</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload POD modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-gray-900 font-bold mb-1">Upload Bukti Penerimaan</h3>
            <p className="text-gray-500 text-sm mb-4">Foto penerima dengan paket, atau paket di depan pintu</p>

            {!podPhoto ? (
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-400 mb-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Ambil Foto / Pilih dari Galeri</p>
                <input type="file" accept="image/*" className="hidden" onChange={e => setPodPhoto(e.target.files?.[0] || null)} />
              </label>
            ) : (
              <div className="relative mb-4">
                <img src={URL.createObjectURL(podPhoto)} className="w-full h-48 object-cover rounded-xl" alt="preview" />
                <button onClick={() => setPodPhoto(null)} className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <p className="text-gray-500 text-xs mt-1">{podPhoto.name} · {(podPhoto.size / 1024).toFixed(0)} KB</p>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => { setUploadModal(false); setPodPhoto(null); }} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600">Batal</button>
              <button onClick={submitPOD} disabled={!podPhoto}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50">
                Kirim Bukti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
