import {
  Package,
  CreditCard,
  AlertTriangle,
  Eye,
  Pencil,
  Phone,
  CheckCircle,
  Clock,
  Truck,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { NavbarUser } from "../../components/NavbarUser";
import { StatusBadge } from "../../components/StatusBadge";
import { useNavigate } from "react-router";
import { useState } from "react";

type DemoState =
  | "empty"
  | "profile-incomplete"
  | "has-order"
  | "has-bill"
  | "delivered";

const PROGRESS_STEPS = [
  { key: "dp", label: "DP Lunas", icon: CreditCard },
  { key: "proses", label: "Diproses", icon: Package },
  { key: "jalan", label: "Di Jalan", icon: Truck },
  { key: "selesai", label: "Selesai", icon: CheckCircle },
];

function getProgressIndex(logistik: string, bayar: string) {
  if (logistik === "Selesai") return 3;
  if (logistik === "Sedang Di Jalan") return 2;
  if (logistik === "Ditugaskan" || logistik === "Pending") return 1;
  if (bayar === "DP Lunas" || bayar === "Lunas") return 0;
  return -1;
}

function getNextAction(state: DemoState) {
  switch (state) {
    case "has-order":
      return {
        color: "text-indigo-400",
        bg: "bg-indigo-500/10 border-indigo-500/20",
        icon: Clock,
        text: "Pesananmu sedang diproses panitia. Kurir akan segera ditugaskan.",
      };
    case "has-bill":
      return {
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/20",
        icon: CreditCard,
        text: "Tagihan pelunasan sudah terbit. Selesaikan pembayaran sebelum batas waktu.",
      };
    case "delivered":
      return {
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        icon: CheckCircle,
        text: "Paket sudah diterima. Selamat mengikuti ospek UB! 🎉",
      };
    default:
      return null;
  }
}

export function UserDashboard() {
  const navigate = useNavigate();
  const [demoState, setDemoState] = useState<DemoState>("has-order");

  const order = {
    paket: "Paket Standar",
    items: 16,
    tanggal: "12 Mei 2026",
    dp: "Rp 85.000",
    sisa: "Rp 200.000",
    estimasi: "30 Mei 2026",
    logistik:
      demoState === "delivered"
        ? "Selesai"
        : demoState === "has-order"
          ? "Ditugaskan"
          : "Sedang Di Jalan",
    bayar:
      demoState === "has-bill" || demoState === "delivered"
        ? "Lunas"
        : "DP Lunas",
    kurir: { nama: "Budi Santoso", telp: "08123456789" },
    alamat: "Jl. Veteran No.10, Malang",
  };

  const showOrder =
    demoState === "has-order" ||
    demoState === "has-bill" ||
    demoState === "delivered";
  const progressIndex = getProgressIndex(order.logistik, order.bayar);
  const nextAction = getNextAction(demoState);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#030303", fontFamily: "Inter, sans-serif" }}
    >
      <NavbarUser hasNotif={demoState === "has-bill"} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Demo switcher */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              "empty",
              "profile-incomplete",
              "has-order",
              "has-bill",
              "delivered",
            ] as DemoState[]
          ).map((s) => (
            <button
              key={s}
              onClick={() => setDemoState(s)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                demoState === s
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sapaan */}
        <div className="mb-6">
          <h1 className="text-white font-bold text-xl">Halo, Daffa 👋</h1>
          <p className="text-white/40 text-sm mt-0.5">
            {showOrder
              ? "Ini ringkasan pesananmu"
              : "Selamat datang di OSPEKIN.UB"}
          </p>
        </div>

        {/* Banner profil belum lengkap */}
        {demoState === "profile-incomplete" && (
          <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-amber-300 text-sm font-medium">
                Profil belum lengkap
              </p>
              <p className="text-amber-400/70 text-xs mt-0.5">
                Isi nama dan nomor WhatsApp untuk mulai memesan.
              </p>
            </div>
            <button
              onClick={() => navigate("/user/profil")}
              className="px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium hover:bg-amber-400 shrink-0"
            >
              Lengkapi
            </button>
          </div>
        )}

        {/* Empty state */}
        {demoState === "empty" && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
              <Package className="w-8 h-8 text-white/30" />
            </div>
            <p className="text-white/60 font-medium mb-1">Belum ada pesanan</p>
            <p className="text-white/30 text-sm mb-6">
              Yuk pesan paket atribut ospekmu sebelum kehabisan!
            </p>
            <button
              onClick={() => navigate("/user/pesan")}
              className="px-6 py-3 rounded-full text-white text-sm font-medium hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #f43f5e)",
              }}
            >
              Pesan Sekarang
            </button>
          </div>
        )}

        {/* Profil incomplete placeholder */}
        {demoState === "profile-incomplete" && (
          <div className="bg-white/5 border border-white/8 rounded-2xl p-8 text-center">
            <p className="text-white/30 text-sm">
              Lengkapi profilmu dulu untuk mulai memesan.
            </p>
          </div>
        )}

        {/* Has order */}
        {showOrder && (
          <div className="space-y-4">
            {/* Next action banner */}
            {nextAction && (
              <div
                className={`flex items-start gap-3 p-4 border rounded-2xl ${nextAction.bg}`}
              >
                <nextAction.icon
                  className={`w-5 h-5 shrink-0 mt-0.5 ${nextAction.color}`}
                />
                <p className={`text-sm ${nextAction.color}`}>
                  {nextAction.text}
                </p>
              </div>
            )}

            {/* Progress tracker */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
              <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-5">
                Progress Pesanan
              </p>
              <div className="flex items-start justify-between relative">
                {/* Track line */}
                <div className="absolute top-4 left-4 right-4 h-px bg-white/10" />
                <div
                  className="absolute top-4 left-4 h-px bg-indigo-500 transition-all duration-700"
                  style={{
                    width: `${progressIndex <= 0 ? 0 : (progressIndex / (PROGRESS_STEPS.length - 1)) * 88}%`,
                  }}
                />
                {PROGRESS_STEPS.map((step, i) => {
                  const done = i <= progressIndex;
                  const active = i === progressIndex;
                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center gap-2 z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          done
                            ? "bg-indigo-600 shadow-lg shadow-indigo-500/30"
                            : "bg-white/8 border border-white/10"
                        } ${active ? "ring-4 ring-indigo-500/20" : ""}`}
                      >
                        <step.icon
                          className={`w-3.5 h-3.5 ${done ? "text-white" : "text-white/25"}`}
                        />
                      </div>
                      <span
                        className={`text-xs text-center w-14 leading-tight ${
                          done ? "text-indigo-400 font-medium" : "text-white/25"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order card */}
            <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-5 border-b border-white/8">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{order.paket}</p>
                  <p className="text-white/30 text-xs">
                    {order.items} item · Dipesan {order.tanggal}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <StatusBadge type="bayar" status={order.bayar} />
                  <StatusBadge type="logistik" status={order.logistik} />
                </div>
              </div>

              {/* Detail rows */}
              <div className="px-5 py-4 space-y-3.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/40">DP dibayar</span>
                  <span className="text-white font-medium">{order.dp}</span>
                </div>

                {demoState === "has-bill" && (
                  <div className="flex justify-between items-center py-2 px-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <span className="text-rose-400 font-medium">
                      Sisa pelunasan
                    </span>
                    <span className="text-rose-300 font-bold">
                      {order.sisa}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Estimasi kirim
                  </span>
                  <span className="text-white">{order.estimasi}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-white/40 flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5" /> Dikirim ke
                  </span>
                  <span className="text-white text-right max-w-[55%]">
                    {order.alamat}
                  </span>
                </div>

                {(order.logistik === "Sedang Di Jalan" ||
                  order.logistik === "Ditugaskan") && (
                  <div className="flex justify-between items-center pt-1 border-t border-white/8">
                    <span className="text-white/40 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Kurir
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{order.kurir.nama}</span>
                      <a
                        href={`https://wa.me/62${order.kurir.telp.slice(1)}`}
                        className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium hover:bg-emerald-500/25 transition-colors"
                      >
                        <Phone className="w-3 h-3" /> WA
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate("/user/pesanan/status")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Lihat Status
                </button>

                {demoState !== "delivered" && (
                  <button
                    onClick={() => navigate("/user/pesanan/edit")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white/50 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit Pesanan
                  </button>
                )}

                {demoState === "has-bill" && (
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white ml-auto hover:opacity-90 transition-all"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #f43f5e)",
                    }}
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Bayar Pelunasan
                  </button>
                )}
              </div>
            </div>

            {/* Quick nav */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Status Pengiriman",
                  icon: Truck,
                  href: "/user/pesanan/status",
                  accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                },
                {
                  label: "Edit Pesanan",
                  icon: Pencil,
                  href: "/user/pesanan/edit",
                  accent: "text-white/50 bg-white/5 border-white/10",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/8 rounded-2xl hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center ${item.accent}`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
