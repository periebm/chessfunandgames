const isProd = process.env.NODE_ENV !== 'development';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/chessfunandgames' : '',
  basePath: isProd ? '/chessfunandgames' : '',
  output: 'export',
};

export default nextConfig;
