interface ProgressBarProps {
  value: number;
  label?: string;
  compact?: boolean;
}

export function ProgressBar({ value, label, compact = false }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{label}</span>
          <span className="font-semibold text-cyan-200">{safeValue}%</span>
        </div>
      ) : null}
      <div className={`w-full overflow-hidden rounded-full bg-slate-900/80 ring-1 ring-white/10 ${compact ? "h-2" : "h-3"}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-glow transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

