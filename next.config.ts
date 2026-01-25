/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // You can leave pathname as '**' to allow all images from Cloudinary
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};

module.exports = nextConfig;