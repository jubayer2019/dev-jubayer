import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4 text-center text-white">
      <div className="glass-panel max-w-xl rounded-[2rem] p-10">
        <p className="text-sm uppercase tracking-[0.45em] text-white/40">404</p>
        <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-white/65">The route you requested does not exist or has been moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-button-gradient px-6 py-3 font-medium text-white shadow-glow">
          Back home
        </Link>
      </div>
    </div>
  );
}
