/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Facebook CDN (ảnh bài viết, ảnh đại diện, ảnh group...)
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net", // fallback ảnh public
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // ảnh avatar khi login FB
      },
      {
        protocol: "https",
        hostname: "lookaside.facebook.com", // redirect avatar (ít gặp)
      },

      // Googleusercontent (avatar, drive, ảnh Google Photos)
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.ggpht.com", // Google Photos, Google Maps thumbnails
      },

      // Một số nguồn phổ biến khác (ví dụ CDN ảnh resize từ frontend)
      {
        protocol: "https",
        hostname: "**.cdninstagram.com", // Instagram (FB ownership)
      },
      {
        protocol: "https",
        hostname: "**.twimg.com", // Twitter CDN
      },
      {
        protocol: "https",
        hostname: "**.pinimg.com", // Pinterest
      },

      // Unsplash (nếu cần)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
