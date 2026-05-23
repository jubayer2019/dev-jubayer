export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0616] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-neon" />
        <p className="text-sm uppercase tracking-[0.45em] text-white/45">Loading</p>
      </div>
    </div>
  );
}
