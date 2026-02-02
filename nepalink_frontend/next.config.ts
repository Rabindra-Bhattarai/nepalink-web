import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  dangerouslyAllowSVG: true,
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3001',
      pathname: '/uploads/**',
    },

    {
      protocol: 'https',
      hostname: 'unsplash.com',
      pathname: '/**',
    }
  ]
}
};

export default nextConfig;
