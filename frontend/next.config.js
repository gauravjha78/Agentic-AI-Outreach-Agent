/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;