import { LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface NavbarKurirProps {
  showBack?: boolean;
}

export function NavbarKurir({ showBack }: NavbarKurirProps) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center h-14">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 mr-3">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Kembali</span>
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-bold">OSPEKIN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="text-gray-400 font-bold">.UB</span>
            </div>
          )}

          <div className="flex-1 text-center">
            <span className="text-sm font-semibold text-gray-900">Tugas Pengantaran</span>
          </div>

          <button onClick={() => navigate("/auth/login")} className="text-gray-500 hover:text-rose-600 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
