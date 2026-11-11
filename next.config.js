/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Every image is a local file in /public; optimisation is disabled so the
    // build does not depend on a native sharp install.
    unoptimized: true
  }
};

module.exports = nextConfig;
