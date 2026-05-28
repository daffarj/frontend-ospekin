import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unverified, setUnverified] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Isi semua field."); return; }
    // Demo: route ke dashboard user
    if (email === "admin@ospekin.ub") { navigate("/admin/dashboard"); return; }
    if (email === "kurir@ospekin.ub") { navigate("/kurir/dashboard"); return; }
    navigate("/user/dashboard");
  }

  const floatingShapes = [
    { width: 160, height: 64, top: "10%", left: "5%", rotate: 12, color: "rgba(99,102,241,0.1)" },
    { width: 100, height: 40, top: "70%", right: "8%", rotate: -15, color: "rgba(244,63,94,0.1)" },
    { width: 80, height: 32, top: "80%", left: "15%", rotate: -8, color: "rgba(139,92,246,0.1)" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      {floatingShapes.map((s, i) => (
        <div key={i} className="absolute rounded-full border border-white/10" style={{ width: s.width, height: s.height, top: s.top, left: (s as any).left, right: (s as any).right, background: s.color, transform: `rotate(${s.rotate}deg)` }} />
      ))}

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111] border border-white/8 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-4">
              <span className="text-white font-bold text-xl">OSPEKIN</span>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-white/30 font-bold text-xl">.UB</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-1">Selamat Datang</h2>
            <p className="text-white/40 text-sm">Masuk ke akunmu</p>
          </div>

          {unverified && (
            <div className="mb-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 text-sm">
              Email ini belum diverifikasi. Cek inbox atau{" "}
              <button className="underline" onClick={() => setUnverified(false)}>kirim ulang email verifikasi</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="emailkamu@gmail.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password kamu"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-rose-400 text-sm">{error}</p>}

            <button type="submit" className="w-full py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}>
              Masuk
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Belum punya akun?{" "}
            <button onClick={() => navigate("/auth/register")} className="text-indigo-400 hover:underline">Daftar Sekarang</button>
          </p>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-white/20 text-xs text-center">Demo: gunakan admin@ospekin.ub → Admin, kurir@ospekin.ub → Kurir, email lain → User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
