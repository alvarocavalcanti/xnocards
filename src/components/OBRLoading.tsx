

export default function OBRLoading() {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Connecting…</p>
      </div>
    </div>
  );
}
