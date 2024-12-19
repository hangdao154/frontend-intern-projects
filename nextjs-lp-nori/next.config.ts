import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd9hhrg4mnvzow.cloudfront.net',
        port: '',
        pathname: '/get.nori.co/**',
        search: '',
      },
    ],
  },
}

export default nextConfig;
