import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ngrok tunnel-ээр dev серверт хандахад /_next/* асset-ууд 403 болохоос сэргийлнэ
  allowedDevOrigins: ["*.ngrok-free.dev"],
};

export default nextConfig;
