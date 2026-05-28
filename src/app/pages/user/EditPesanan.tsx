import { useState } from "react";
import { Lock, Clock, MapPin, Upload, X } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { useNavigate } from "react-router";

export function UserEditPesanan() {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);
  const [nim, setNim] = useState("225150201111001");
  const [faculty, setFaculty] = useState("Fakultas Ilmu Komputer");
  const [cluster, setCluster] = useState("5");
  const [disease, setDisease] = useState("Maag");
  const [allergy, setAllergy] = useState("-");
  const [photo, setPhoto] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarUser />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Demo lock toggle */}
        <button onClick={() => setIsLocked(!isLocked)} className={`mb-4 px-3 py-1 rounded-full text-xs ${isLocked ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-600"}`}>
          Demo: {isLocked ? "LOCKED" : "UNLOCKED"}
        </button>

        {/* Locked banner */}
        {isLocked && (
          <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl mb-4">
            <Lock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-rose-900 font-semibold">Data pesanan telah dikunci secara permanen</p>
              <p className="text-rose-700 text-sm">Deadline edit telah lewat. Data tidak dapat diubah.</p>
            </div>
          </div>
        )}

        {/* Deadline banner */}
        {!isLocked && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-amber-800 text-sm">Edit pesanan akan terkunci pada: <strong>25 Mei 2026, 23:59 WIB</strong></p>
          </div>
        )}

        <h1 className="text-gray-900 font-bold text-xl mb-6">Edit Data Pesanan</h1>

        <div className="space-y-4">
          {/* Identitas Akademik */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Identitas Akademik</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">NIM</label>
                <input value={nim} onChange={e => setNim(e.target.value)} disabled={isLocked}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-400" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Fakultas</label>
                <input value={faculty} onChange={e => setFaculty(e.target.value)} disabled={isLocked}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-400" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Cluster</label>
                <input value={cluster} onChange={e => setCluster(e.target.value)} disabled={isLocked}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Data Medis */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Data Medis</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Riwayat Penyakit</label>
                <textarea value={disease} onChange={e => setDisease(e.target.value)} disabled={isLocked} rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none disabled:bg-gray-50 disabled:text-gray-400" />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-medium mb-1.5 block">Alergi Obat</label>
                <textarea value={allergy} onChange={e => setAllergy(e.target.value)} disabled={isLocked} rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none disabled:bg-gray-50 disabled:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Pas Foto */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Pas Foto</h3>
            {!photo ? (
              <label className={`block border-2 border-dashed rounded-xl p-8 text-center ${isLocked ? "border-gray-200 bg-gray-50 cursor-not-allowed" : "border-gray-300 cursor-pointer hover:border-indigo-400"}`}>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Klik untuk upload pas foto baru</p>
                <input type="file" accept="image/*" className="hidden" disabled={isLocked}
                  onChange={e => !isLocked && setPhoto(e.target.files?.[0] || null)} />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                  <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" alt="preview" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm font-medium truncate">{photo.name}</p>
                </div>
                {!isLocked && (
                  <button onClick={() => setPhoto(null)} className="text-gray-400 hover:text-rose-500">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Alamat */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Alamat Pengiriman</h3>
            <div className="aspect-video rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Google Maps Picker</p>
              </div>
            </div>
            <textarea disabled={isLocked} defaultValue="Jl. Veteran No. 1, Kos Mawar, Kamar 12, Malang" rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none disabled:bg-gray-50 disabled:text-gray-400" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button disabled={isLocked}
              className="flex-1 py-3 rounded-full text-white font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
              Simpan Perubahan
            </button>
            <button onClick={() => navigate("/user/pesanan/status")} className="flex-1 py-3 rounded-full text-gray-600 border border-gray-300 hover:bg-gray-50">
              Kembali ke Status Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
