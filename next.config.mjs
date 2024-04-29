/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allowing-shiner-needlessly.ngrok-free.app",
        port: "",
        pathname: "/fundRaiser/fundraiser-page/**",
      },
    ],
  },
};

export default nextConfig;
