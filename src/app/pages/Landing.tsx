import { useEffect, useRef } from "react";
import {
  UserPlus,
  ShoppingCart,
  Clock,
  Package,
  ShieldCheck,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { NavbarGuest } from "../components/NavbarGuest";
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

const steps = [
  {
    icon: UserPlus,
    title: "Daftar & Isi Profil",
    desc: "Buat akun dengan email personal",
  },
  {
    icon: ShoppingCart,
    title: "Pilih Paket & Bayar DP",
    desc: "Pilih paket dan amankan kuota",
  },
  {
    icon: Clock,
    title: "Tunggu Harga Final",
    desc: "Kami akan merilis harga resmi",
  },
  {
    icon: Package,
    title: "Lunasi & Terima Paket",
    desc: "Bayar sisa dan terima paket",
  },
];

const faqs = [
  {
    q: "Kapan saya harus melunasi sisa pembayaran?",
    a: "Setelah panitia merilis harga resmi. Kamu akan mendapat notifikasi email.",
  },
  {
    q: "Bagaimana jika saya belum tahu alamat kos?",
    a: "Bisa isi alamat menyusul, maksimal H-1 sebelum pengantaran.",
  },
  {
    q: "Apakah bisa ambil sendiri?",
    a: "Bisa, pilih opsi Ambil di Tempat saat pemesanan.",
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "QRIS, e-wallet (GoPay, OVO, Dana), dan Virtual Account.",
  },
  {
    q: "Bagaimana cara lacak pesanan saya?",
    a: "Login ke akun, buka Status Pesanan untuk melihat posisi pengantaran.",
  },
];

const floatingShapes = [
  {
    width: 200,
    height: 80,
    top: "15%",
    left: "8%",
    rotate: 12,
    color: "rgba(99,102,241,0.15)",
    delay: 0,
  },
  {
    width: 140,
    height: 56,
    top: "70%",
    right: "5%",
    rotate: -15,
    color: "rgba(244,63,94,0.15)",
    delay: 1.5,
  },
  {
    width: 100,
    height: 40,
    top: "75%",
    left: "10%",
    rotate: -8,
    color: "rgba(139,92,246,0.15)",
    delay: 3,
  },
  {
    width: 80,
    height: 32,
    top: "10%",
    right: "15%",
    rotate: 20,
    color: "rgba(245,158,11,0.15)",
    delay: 2,
  },
  {
    width: 60,
    height: 24,
    top: "30%",
    left: "20%",
    rotate: -25,
    color: "rgba(6,182,212,0.15)",
    delay: 1,
  },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#030303] min-h-screen text-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <NavbarGuest />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-rose-600/5 rounded-full blur-3xl" />
        </div>

        {/* Floating shapes */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/15 backdrop-blur-sm"
            style={{
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: (shape as any).left,
              right: (shape as any).right,
              background: shape.color,
              rotate: shape.rotate,
            }}
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20 pb-16 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-white/60 text-sm">
                Atribut Resmi Ospek UB 2026
              </span>
            </div>

            <h1 className="mb-6 tracking-tight">
              <span className="block text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-2">
                Lengkap Satu Paket,
              </span>
              <span
                className="block text-5xl sm:text-7xl md:text-8xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Siap Hari Pertama
              </span>
            </h1>

            <p className="text-white/40 max-w-xl mx-auto mb-10 text-lg font-light leading-relaxed">
              Pesan atribut ospek Universitas Brawijaya tanpa antri. DP dulu,
              lunasi setelah harga resmi keluar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/user/pesan")}
                className="px-8 py-3.5 rounded-full text-white font-medium hover:scale-105 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                }}
              >
                Pesan Sekarang
              </button>
              <button
                onClick={() => navigate("/katalog")}
                className="px-8 py-3.5 rounded-full text-white border border-white/30 hover:bg-white/5 transition-all"
              >
                Lihat Katalog
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* CARA KERJA */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/8 border border-white/10 mb-4">
              <span className="text-white/60 text-sm">Proses Pemesanan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              4 Langkah, Paket Sampai di Tanganmu
            </h2>
          </div>

          {/* Desktop: horizontal */}
          <div className="hidden md:grid grid-cols-4 gap-6 relative">
            <div className="absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-500/50 to-rose-500/50" />
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-rose-500 border-indigo-500/30 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-600/50 flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1 text-base">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <step.icon className="w-5 h-5 text-indigo-400 mb-1" />
                  <h3 className="text-white font-semibold">{step.title}</h3>
                  <p className="text-white/40 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW PAKET */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/8 border border-white/10 mb-4">
              <span className="text-white/60 text-sm">Paket Tersedia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Semua yang Kamu Butuhkan, Satu Paket
            </h2>
            <p className="text-white/40">
              Harga yang ditampilkan adalah estimasi. Harga resmi akan
              diperbarui panitia.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full">
              <span className="text-amber-400 text-sm">
                ⚠ Harga estimasi, belum final
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Paket Standar", price: "Rp 285.000", dp: "Rp 85.000" },
              { name: "Paket Lengkap", price: "Rp 320.000", dp: "Rp 100.000" },
            ].map((pkg) => (
              <motion.div
                key={pkg.name}
                whileHover={{ scale: 1.01 }}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
              >
                <h3 className="text-white font-bold text-xl mb-3">
                  {pkg.name}
                </h3>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-semibold">
                    Est. {pkg.price}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-xs">
                    Belum Final
                  </span>
                </div>
                <p className="text-indigo-400 text-sm mb-4">DP {pkg.dp}</p>
                <hr className="border-white/8 mb-4" />
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {packageItems.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-indigo-400 text-xs">✓</span>
                      <span className="text-white/60 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                  }}
                >
                  Pesan Sekarang
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KENAPA OSPEKIN */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Kenapa Harus OSPEKIN?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Pembayaran Aman",
                desc: "Via Dokupay, QRIS & e-wallet terpercaya",
              },
              {
                icon: MapPin,
                title: "Antar ke Kos",
                desc: "Kurir internal panitia, pantau status real-time",
              },
              {
                icon: Clock,
                title: "Bayar DP Dulu",
                desc: "Kunci kuota sekarang, lunasi setelah harga fix",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 border-l-2 border-l-indigo-500"
              >
                <Icon className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/40 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Pertanyaan Umum
          </h2>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={String(i)}
                className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-left text-white hover:bg-white/5 transition-colors group">
                  <span className="font-medium text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/40 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-4 text-white/50 text-sm leading-relaxed">
                  {faq.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div
                onClick={() => navigate("/")}
                className="inline-flex px-4 py-2 bg-white/5 border border-white/10 rounded-full
                           items-center cursor-pointer hover:bg-white/10 transition-colors mb-3"
              >
                <span className="text-white font-bold text-sm tracking-tight">
                  OSPEKIN.UB
                </span>
              </div>
              <p className="text-white/40 text-sm">
                Platform pemesanan atribut ospek resmi Universitas Brawijaya.
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium mb-3">
                Quick Links
              </p>
              <div className="space-y-2">
                {[
                  { label: "Katalog", href: "/katalog" },
                  { label: "Cara Pesan", href: "/about#cara-pesan" },
                  { label: "About", href: "/about" },
                  { label: "Login", href: "/auth/login" },
                ].map(({ label, href }) => (
                  <button
                    key={label}
                    onClick={() => navigate(href)}
                    className="block text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium mb-3">
                Hubungi Kami
              </p>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm transition-colors"
              >
                <span>💬</span> WhatsApp Kami
              </a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/30 text-xs">
              © 2026 OSPEKIN.UB. Platform pemesanan atribut ospek UB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
