import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    domains: ["localhost","3.106.244.62"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
=======
    domains: ["res.cloudinary.com"],
>>>>>>> dc3f2112632999b4d3f86beea0a62f697bc41197
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
