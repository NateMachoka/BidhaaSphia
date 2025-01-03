/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      readline: false, // Disable readline for browser
      fs: false,       // Disable fs for browser
      path: false,     // Disable path for browser
      child_process: false, // Disable child_process for browser
    };
    return config;
  },
};

module.exports = nextConfig;
