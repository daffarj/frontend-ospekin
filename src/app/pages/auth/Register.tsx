import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useNavigate } from "react-router";

const packageItems = [
  "Name Tag", "Pin Cluster", "Bag Tag", "Sandal Jepit",
  "Botol 1.5L", "Buku Catatan", "Pita Merah Putih", "Pita Sakit",
  "Pita Gerbang", "TrashBag", "Jas Hujan", "Koran",
  "Roti", "Tumbler 600ml", "Tote Bag", "Hand Sanitizer",
];

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
const strengthColors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"];

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
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="w-full max-w-md bg-[#111] border border-white/8 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Cek email kamu!</h2>
          <p className="text-white/40 text-sm mb-6">
            Kami sudah kirim link verifikasi ke <strong className="text-white/70">{email}</strong>. Klik link tersebut untuk mengaktifkan akunmu.
          </p>
          <div className="flex gap-2 justify-center text-sm">
            <button onClick={() => setSubmitted(false)} className="text-indigo-400 hover:underline">Kirim ulang email</button>
            <span className="text-white/20">·</span>
            <button onClick={() => setSubmitted(false)} className="text-indigo-400 hover:underline">Ganti email</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Form */}
        <div className="bg-[#111] border border-white/8 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-white font-bold text-xl">OSPEKIN</span>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-white/30 font-bold text-xl">.UB</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">Buat Akun Baru</h2>
            <p className="text-white/40 text-sm">Gunakan email personal (Gmail, Yahoo, dll)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                placeholder="emailkamu@gmail.com"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.email ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
              />
              {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showP ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                  placeholder="Buat password"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.password ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
                />
                <button type="button" onClick={() => setShowP(!showP)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                  {showP ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-colors ${n <= strength ? strengthColors[strength] : "bg-white/10"}`} />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">{strengthLabels[strength]}</p>
                </div>
              )}
              {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showC ? "text" : "password"}
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: "" })); }}
                  placeholder="Ulangi password"
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none transition-colors ${errors.confirm ? "border-rose-500" : "border-white/10 focus:border-indigo-500"}`}
                />
                <button type="button" onClick={() => setShowC(!showC)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                  {showC ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && <p className="text-rose-400 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={!valid}
              className="w-full py-3 rounded-full text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Sudah punya akun?{" "}
            <button onClick={() => navigate("/auth/login")} className="text-indigo-400 hover:underline">Masuk</button>
          </p>
        </div>

        {/* Right decorative panel */}
        <div className="hidden md:block bg-[#111] border border-white/8 rounded-2xl p-8">
          <h3 className="text-white font-bold text-lg mb-5">Yang Kamu Dapat:</h3>
          <div className="grid grid-cols-2 gap-3">
            {packageItems.map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <span className="text-indigo-400 text-sm">✓</span>
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
            <p className="text-indigo-300 text-sm text-center">16 item lengkap dalam satu paket siap ospek</p>
          </div>
        </div>
      </div>
    </div>
  );
}
