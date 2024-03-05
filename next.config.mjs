/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_END: process.env.API_END,
  },
};

export default nextConfig;
