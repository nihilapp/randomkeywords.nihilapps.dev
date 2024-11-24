import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: [],
  },
  webpack(config) {
    config.cache = false;
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack', ],
    });
    return config;
  },
};

export default nextConfig;
