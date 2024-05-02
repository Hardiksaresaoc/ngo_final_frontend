/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allowing-shiner-needlessly.ngrok-free.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
