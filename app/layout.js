import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: "Jubayer Khan | Full Stack Developer",
  description: "Premium futuristic portfolio website for a modern full-stack developer.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Jubayer Khan | Full Stack Developer",
    description: "Modern portfolio with auth, dashboards, and premium motion design.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#0B0616] text-white antialiased" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: "#12091f", color: "#fff", border: "1px solid rgba(255,255,255,0.08)" } }} />
      </body>
    </html>
  );
}
