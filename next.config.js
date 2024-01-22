// next.config.js

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: String(
              process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_CREDENTIALS
            ),
          },
          {
            key: "Access-Control-Allow-Origin",
            value: String(process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN),
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: String(process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_METHODS),
          },
          {
            key: "Access-Control-Allow-Headers",
            value: String(process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_HEADERS),
          },
        ],
      },
    ];
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
