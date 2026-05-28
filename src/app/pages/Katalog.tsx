import { motion } from "motion/react";
import { NavbarGuest } from "../components/NavbarGuest";
import { useNavigate } from "react-router";

const packageItems = [
  "Name Tag", "Pin Cluster", "Bag Tag", "Sandal Jepit",
  "Botol 1.5L", "Buku Catatan", "Pita Merah Putih", "Pita Sakit",
  "Pita Gerbang", "TrashBag", "Jas Hujan", "Koran",
  "Roti", "Tumbler 600ml", "Tote Bag", "Hand Sanitizer",
];

const packages = [
  { name: "Paket Standar", price: "Rp 285.000", dp: "Rp 85.000" },
  { name: "Paket Lengkap", price: "Rp 320.000", dp: "Rp 100.000" },
  { name: "Paket Ekonomis", price: "Rp 250.000", dp: "Rp 75.000" },
];

export function Katalog() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#030303] min-h-screen text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarGuest />

      <div className="pt-28 pb-20 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/8 border border-white/10 mb-4">
            <span className="text-white/60 text-sm">16 Item per Paket</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Katalog Paket Atribut Ospek</h1>
          <p className="text-white/40 max-w-2xl mx-auto">
            Satu paket sudah mencakup semua kebutuhan ospek kamu. Harga yang ditampilkan adalah estimasi.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 border border-amber-500/30 rounded-full">
            <span className="text-amber-400">⚠</span>
            <span className="text-amber-300 text-sm">Harga estimasi — belum final. Harga resmi akan diumumkan panitia.</span>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col"
            >
              <h2 className="text-white font-bold text-xl mb-3">{pkg.name}</h2>

              <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-semibold text-lg">Est. {pkg.price}</span>
                <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-xs">Belum Final</span>
              </div>
              <p className="text-indigo-400 text-sm mb-4">DP {pkg.dp}</p>

              <hr className="border-white/8 mb-4" />

              <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-6 flex-1">
                {packageItems.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="text-indigo-400 text-xs shrink-0">✓</span>
                    <span className="text-white/60 text-xs">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/auth/login")}
                className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
              >
                Pesan Sekarang
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
