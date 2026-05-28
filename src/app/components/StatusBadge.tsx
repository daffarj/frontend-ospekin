interface StatusBadgeProps {
  type: "bayar" | "logistik";
  status: string;
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const configs: Record<string, { label: string; className: string }> = {
    // Bayar
    "Belum Bayar": { label: "Belum Bayar", className: "bg-gray-100 text-gray-600" },
    "DP Lunas": { label: "DP Lunas", className: "bg-indigo-100 text-indigo-700" },
    "Lunas": { label: "Lunas", className: "bg-emerald-100 text-emerald-700" },
    // Logistik
    "Pending": { label: "Pending", className: "bg-gray-100 text-gray-600" },
    "Ditugaskan": { label: "Ditugaskan", className: "bg-blue-100 text-blue-700" },
    "Sedang Di Jalan": { label: "Sedang Di Jalan", className: "bg-amber-100 text-amber-700" },
    "Selesai": { label: "Selesai", className: "bg-emerald-100 text-emerald-700" },
  };

  const config = configs[status] || { label: status, className: "bg-gray-100 text-gray-600" };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
