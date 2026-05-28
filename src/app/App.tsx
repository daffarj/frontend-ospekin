import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Landing } from "./pages/Landing";
import { Katalog } from "./pages/Katalog";
import { About } from "./pages/About";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { UserDashboard } from "./pages/user/Dashboard";
import { UserProfil } from "./pages/user/Profil";
import { UserPesan } from "./pages/user/Pesan";
import { UserCheckout } from "./pages/user/Checkout";
import { UserStatusPesanan } from "./pages/user/StatusPesanan";
import { UserEditPesanan } from "./pages/user/EditPesanan";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminPaket } from "./pages/admin/Paket";
import { AdminPesanan } from "./pages/admin/Pesanan";
import { AdminUser } from "./pages/admin/User";
import { AdminReferal } from "./pages/admin/Referal";
import { AdminPengaturan } from "./pages/admin/Pengaturan";
import { KurirDashboard } from "./pages/kurir/Dashboard";
import { KurirDetailPesanan } from "./pages/kurir/DetailPesanan";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/about" element={<About />} />

        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />

        {/* User */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profil" element={<UserProfil />} />
        <Route path="/user/pesan" element={<UserPesan />} />
        <Route path="/user/checkout" element={<UserCheckout />} />
        <Route path="/user/pesanan/status" element={<UserStatusPesanan />} />
        <Route path="/user/pesanan/edit" element={<UserEditPesanan />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/paket" element={<AdminPaket />} />
        <Route path="/admin/pesanan" element={<AdminPesanan />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/referal" element={<AdminReferal />} />
        <Route path="/admin/pengaturan" element={<AdminPengaturan />} />

        {/* Kurir */}
        <Route path="/kurir/dashboard" element={<KurirDashboard />} />
        <Route path="/kurir/pesanan/:id" element={<KurirDetailPesanan />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
