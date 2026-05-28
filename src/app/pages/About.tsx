import { NavbarGuest } from "../components/NavbarGuest";

const steps = [
  { title: "Daftar akun dengan email personal", desc: "Gunakan Gmail, Yahoo, atau email pribadi lainnya." },
  { title: "Lengkapi profil & alamat", desc: "Isi nama lengkap, nomor WA, dan alamat kos." },
  { title: "Pilih paket, isi data, bayar DP", desc: "Pilih paket sesuai kebutuhan dan bayar DP untuk amankan kuota." },
  { title: "Tunggu panitia rilis harga resmi", desc: "Kamu akan mendapat notifikasi email ketika harga final sudah keluar." },
  { title: "Bayar pelunasan sisa", desc: "Lunasi sisa pembayaran melalui metode yang tersedia." },
  { title: "Terima paket di kos / ambil sendiri", desc: "Kurir internal kami akan mengantarkan ke alamat kamu." },
];

export function About() {
  return (
    <div className="bg-[#030303] min-h-screen text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <NavbarGuest />

      <div className="pt-28 pb-20 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/8 border border-white/10 mb-4">
            <span className="text-white/60 text-sm">Tentang Kami</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">OSPEKIN.UB</h1>
          <p className="text-white/40 max-w-2xl mx-auto">
            Toko penyedia atribut ospek resmi untuk Mahasiswa Baru Universitas Brawijaya.
          </p>
        </div>

        {/* Tentang */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-2xl font-bold text-white mb-5">Tentang OSPEKIN</h2>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                OSPEKIN adalah toko atribut ospek yang menyediakan paket bundle lengkap untuk mahasiswa baru Universitas Brawijaya.
                Kami <strong className="text-white/80">bukan panitia resmi UB</strong>, namun bekerja sama untuk memudahkan proses pengadaan atribut.
              </p>
              <p>
                Sistem kami memungkinkan kamu memesan paket secara online dengan pembayaran bertahap — cukup bayar DP dulu untuk
                mengamankan kuota, lunasi setelah harga resmi diumumkan panitia.
              </p>
              <p>
                Kurir internal kami siap mengantarkan langsung ke kos kamu, atau kamu bisa memilih ambil di tempat.
              </p>
            </div>
          </div>

          {/* Decorative */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Item per Paket", value: "16" },
              { label: "Mahasiswa Terlayani", value: "2.400+" },
              { label: "Fakultas di UB", value: "16" },
              { label: "Metode Bayar", value: "4+" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-white mb-1" style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {value}
                </div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alur Pemesanan */}
        <div id="cara-pesan" className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Cara Pesan</h2>
          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" style={{ minHeight: 32 }} />}
                </div>
                <div className="pb-8">
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-white/40 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontak */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Hubungi Kami</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
              <p className="text-white/40 text-sm mb-4">+62 812-3456-7890</p>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm transition-colors">
                Chat Sekarang
              </a>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="text-white font-semibold mb-1">Instagram</h3>
              <p className="text-white/40 text-sm mb-4">@ospekin.ub</p>
              <a href="https://instagram.com/ospekin.ub" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full text-white text-sm">
                Follow
              </a>
            </div>
          </div>
          <p className="text-center text-white/30 text-sm mt-6">Senin–Sabtu, 08.00–17.00 WIB</p>
        </div>
      </div>
    </div>
  );
}
