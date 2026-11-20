import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "edcsmiayfqbmsdgqxdjv.supabase.co",
        pathname: "/storage/v1/object/public/paraiso_biker/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
