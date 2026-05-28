import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

function getStrength(p: string) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

const strengthLabels = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"];
const strengthColors = [
  "",
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-emerald-500",
];

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getStrength(password);
  const valid = email && password.length >= 6 && confirm === password;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.includes("@")) errs.email = "Format email tidak valid";
    if (password.length < 6) errs.password = "Password minimal 6 karakter";
    if (confirm !== password) errs.confirm = "Password tidak cocok";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-[#030303] flex items-center justify-center p-4"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="w-full max-w-md bg-[#111] border border-white/8 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Cek email kamu!
          </h2>
          <p className="text-white/40 text-sm mb-6">
            Kami sudah kirim link verifikasi ke{" "}
            <strong className="text-white/70">{email}</strong>. Klik link
            tersebut untuk mengaktifkan akunmu.
          </p>
          <div className="flex gap-2 justify-center text-sm">
            <button
              onClick={() => setSubmitted(false)}
              className="text-indigo-400 hover:underline"
            >
              Kirim ulang email
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => setSubmitted(false)}
              className="text-indigo-400 hover:underline"
            >
              Ganti email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#030303] flex items-center justify-center p-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Form */}
        <div className="bg-[#111] border border-white/8 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full
                           inline-flex items-center justify-center cursor-pointer select-none
                           hover:bg-white/10 transition-colors duration-200"
              >
                <span className="font-bold text-white text-base tracking-tight">
                  OSPEKIN.UB
                </span>
              </div>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">
              Buat Akun Baru
            </h2>
            <p className="text-white/40 text-sm">
              Gunakan email personal (Gmail, Yahoo, dll)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: "" }));
                }}
                placeholder="emailkamu@gmail.com"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.email ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
              />
              {errors.email && (
                <p className="text-rose-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showP ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: "" }));
                  }}
                  placeholder="Buat password"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.password ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowP(!showP)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showP ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-colors ${n <= strength ? strengthColors[strength] : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showC ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setErrors((p) => ({ ...p, confirm: "" }));
                  }}
                  placeholder="Ulangi password"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.confirm ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowC(!showC)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showC ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirm && (
                <p className="text-rose-400 text-xs mt-1">{errors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!valid}
              className="w-full py-3 rounded-full text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #6366f1, #f43f5e)",
              }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-indigo-400 hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>

        {/* Right panel - Keunggulan */}
        <div className="hidden md:flex flex-col bg-[#111] border border-white/8 rounded-2xl p-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-white/50 text-xs">Kenapa OSPEKIN?</span>
            </div>
            <h3 className="text-white font-bold text-xl leading-snug">
              Cara paling mudah dapat atribut ospek UB
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            {[
              {
                icon: "🔒",
                title: "Pembayaran Aman & Terpercaya",
                desc: "Transaksi via Dokupay, QRIS, GoPay, OVO, Dana, dan Virtual Account.",
              },
              {
                icon: "📦",
                title: "Paket Lengkap Satu Kali Pesan",
                desc: "16 item atribut resmi ospek UB tersedia dalam satu paket, tanpa perlu cari satu-satu.",
              },
              {
                icon: "🛵",
                title: "Diantar Langsung ke Kos",
                desc: "Kurir internal panitia mengantarkan ke alamatmu. Pantau status real-time.",
              },
              {
                icon: "💸",
                title: "Bayar DP, Lunasi Belakangan",
                desc: "Amankan kuota sekarang dengan DP. Lunasi setelah harga resmi panitia keluar.",
              },
              {
                icon: "📧",
                title: "Notifikasi Email Otomatis",
                desc: "Dapat update tagihan, status pengiriman, dan konfirmasi langsung ke inbox.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/8 transition-colors"
              >
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
