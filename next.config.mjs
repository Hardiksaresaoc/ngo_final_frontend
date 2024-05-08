/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "special-sloth-heroic.ngrok-free.app",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "soh-backend.onrender.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
