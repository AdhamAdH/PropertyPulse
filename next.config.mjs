/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
  },
};

export default nextConfig;
