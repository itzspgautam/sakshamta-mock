/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_END: process.env.API_END,
    DB_URI: process.env.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
