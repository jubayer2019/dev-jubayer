/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" }
    ]
  },
  async rewrites() {
    const apiTarget = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    return [
      {
        source: "/api/auth/:path*",
        destination: `${apiTarget}/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${apiTarget}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
