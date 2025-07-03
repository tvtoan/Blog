/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "scontent.fhph1-1.fna.fbcdn.net",
      "scontent.fhph1-3.fna.fbcdn.net", // Thêm dòng này
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
};

export default nextConfig;
