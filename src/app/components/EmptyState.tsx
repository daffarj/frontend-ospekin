import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({ icon: Icon, title, subtitle, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm max-w-xs">{subtitle}</p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-6 px-6 py-2.5 rounded-full text-sm text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #f43f5e)" }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
