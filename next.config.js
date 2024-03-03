const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'socalpolitics.com',
        port: '',
        pathname: '/cdn/**',
      },
    ],
  },
};

module.exports = nextConfig;
