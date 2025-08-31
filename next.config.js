/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Makes deployment easier with minimal dependencies
  images: {
    remotePatterns: [
      {
        protocol: "http",  // Allows loading images from localhost
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "ultracamprunners.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "zoraithost.com",
      },
      {
        protocol: "https",
        hostname: "fitnation.pro",
      },
      {
        protocol: "https",
        hostname: "cms.fitnation.pro",
      },
    ],
  },
};

module.exports = nextConfig;
