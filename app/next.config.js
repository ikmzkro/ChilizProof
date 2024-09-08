/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ipfs.io", "gateway.pinata.cloud", "lime-giant-dove-621.mypinata.cloud"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    config.externals.push("pino-pretty", "lokijs", "encoding"); // Rainbowkit polyfills
    return config;
  },
};

module.exports = nextConfig;