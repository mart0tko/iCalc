const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  i18n,
  generateEtags: false,
  allowedDevOrigins: ["127.0.0.1"],
};

module.exports = withBundleAnalyzer(nextConfig);
