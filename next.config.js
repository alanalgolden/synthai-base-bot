/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/vectors/:path*",
        destination:
          "https://base-bot-core-92d4948.svc.us-east4-gcp.pinecone.io/vectors/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
