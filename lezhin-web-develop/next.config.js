/**
 * @type {import('next').NextConfig}
 * Document: https://nextjs.org/docs/app/api-reference/next-config-js
 **/
const nextConfig = {
  distDir: 'build',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  env: {
    customKey: 'key',
  },
  // Docs: https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
