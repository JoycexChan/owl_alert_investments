// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// next.config.mjs

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins.push(new ReactRefreshWebpackPlugin());
    }
    return config;
  },
};

export default nextConfig;
