export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/dashboard`, lastModified: new Date() },
  ];
}
