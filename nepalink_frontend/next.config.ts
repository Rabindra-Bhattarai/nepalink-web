import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//   dangerouslyAllowSVG: true,
//   remotePatterns: [
//     {
//       protocol: 'http',
//       hostname: 'localhost',
//       port: '3001',
//       pathname: '/uploads/**',
//     },

//     {
//       protocol: 'https',
//       hostname: 'unsplash.com',
//       pathname: '/**',
//     }
//   ]
// }
// };

// export default nextConfig;


const nextConfig: NextConfig = {
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
      },
    ],
  },

  // Add this to proxy API requests to backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // backend port
      },
    ];
  },
};

export default nextConfig;
