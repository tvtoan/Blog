/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Existing domains
      "images.unsplash.com",
      "localhost",
      // Facebook image hosts
      "scontent.fhph1-1.fna.fbcdn.net",
      "scontent.fhph1-2.fna.fbcdn.net",
      "scontent.fhph1-3.fna.fbcdn.net",
      "scontent.fhan3-1.fna.fbcdn.net",
      "scontent.fhan3-2.fna.fbcdn.net",
      "scontent.fhan3-3.fna.fbcdn.net",
      "scontent.fhan3-4.fna.fbcdn.net",
      "scontent.fhan4-1.fna.fbcdn.net",
      "scontent.fhan4-2.fna.fbcdn.net",
      "scontent.fhan4-3.fna.fbcdn.net",
      "platform-lookaside.fbsbx.com",
      "scontent.xx.fbcdn.net", // Generic fallback for other regions
      // Google image hosts
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "*.googleusercontent.com", // Covers user-uploaded content (e.g., Google Photos, Drive)
      "*.ggpht.com", // Covers Google services like Maps, Photos
    ],
  },
};

export default nextConfig;
