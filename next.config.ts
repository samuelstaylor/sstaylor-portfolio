import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // for static export to GitHub Pages
  images: {
    unoptimized: true, // disable Next.js image optimization for /public assets
  },
  reactStrictMode: true, // good practice
  compiler: {
    // optional: if using styled-components or other advanced features
  },
};

export default nextConfig;
