import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

type State = "loading" | "success" | "error";

export function VerifyEmail() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("loading");

  setTimeout(() => { if (state === "loading") setState("success"); }, 2000);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="w-full max-w-md bg-[#111] border border-white/8 rounded-2xl p-10 text-center">
        <div className="flex items-center justify-center gap-1 mb-8">
          <span className="text-white font-bold text-xl">OSPEKIN</span>
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-white/30 font-bold text-xl">.UB</span>
        </div>

        {state === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-indigo-500 mx-auto mb-5 animate-spin" />
            <h2 className="text-white text-xl font-bold mb-2">Memverifikasi email kamu...</h2>
            <p className="text-white/40 text-sm">Mohon tunggu sebentar</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="w-20 h-20 rounded-full bg-emerald-600/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Email Berhasil Diverifikasi!</h2>
            <p className="text-white/40 text-sm mb-8">Akunmu sudah aktif. Kamu bisa mulai memesan atribut ospek.</p>
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full py-3 rounded-full text-white font-medium hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
            >
              Mulai Pesan Sekarang
            </button>
          </>
        )}

        {state === "error" && (
          <>
            <div className="w-20 h-20 rounded-full bg-rose-600/20 flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-12 h-12 text-rose-400" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Link Tidak Valid</h2>
            <p className="text-white/40 text-sm mb-8">Link verifikasi sudah kadaluarsa atau pernah digunakan.</p>
            <button className="w-full py-3 rounded-full text-white border border-white/20 hover:bg-white/5 mb-3">
              Kirim Ulang Email Verifikasi
            </button>
            <button onClick={() => navigate("/auth/login")} className="text-indigo-400 text-sm hover:underline">
              Kembali ke Login
            </button>
          </>
        )}

        <div className="mt-8 flex justify-center gap-3">
          {(["loading", "success", "error"] as State[]).map(s => (
            <button key={s} onClick={() => setState(s)} className={`px-3 py-1 rounded-full text-xs ${state === s ? "bg-indigo-600 text-white" : "bg-white/8 text-white/40"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
