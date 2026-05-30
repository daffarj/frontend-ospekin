import { useEffect, useRef } from "react";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { useNavigate } from "react-router";

export function UserPembayaranBerhasil() {
  const navigate = useNavigate();
  const confettiRef = useRef(false);

  useEffect(() => {
    if (confettiRef.current) return;
    confettiRef.current = true;

    // Simple confetti burst tanpa library eksternal
    const canvas = document.getElementById(
      "confetti-canvas",
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#6366f1", "#f43f5e", "#f59e0b", "#10b981", "#3b82f6"];
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    }));

    let frame = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.angle += p.spin;
        if (p.y < canvas.height) alive = true;
        if (frame > 60) p.opacity -= 0.008;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      frame++;
      if (alive && frame < 180) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <NavbarUser />

      {/* Confetti canvas overlay */}
      <canvas
        id="confetti-canvas"
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>

        <h1 className="text-gray-900 font-bold text-2xl mb-2">
          Pembayaran DP Berhasil!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Pesananmu sudah kami terima. Kuota paket telah diamankan atas namamu.
          Kamu akan mendapat notifikasi email saat harga resmi sudah keluar.
        </p>

        {/* Order summary card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">Paket Standar</p>
              <p className="text-gray-400 text-sm">16 item bundle</p>
            </div>
          </div>
          <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-500">DP yang dibayar</span>
              <span className="text-gray-900 font-medium">Rp 85.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                DP Lunas
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tanggal pesan</span>
              <span className="text-gray-900">28 Mei 2026</span>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-left mb-8">
          <span className="text-blue-500 text-lg shrink-0">📧</span>
          <div>
            <p className="text-blue-900 text-sm font-medium">Cek emailmu</p>
            <p className="text-blue-700 text-xs mt-0.5">
              Konfirmasi pesanan dan invoice DP sudah dikirim ke emailmu. Simpan
              sebagai bukti pembayaran.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/user/pesanan/status")}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
          >
            Lihat Status Pesanan <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-gray-600 border border-gray-200 text-sm hover:bg-gray-50 transition-all"
          >
            <Home className="w-4 h-4" /> Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
