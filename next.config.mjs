/** majidkhanmohmand.com is a static site: `next build` writes it to out/; Vercel serves it (vercel.json). */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
