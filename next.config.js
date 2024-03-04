module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'socalpolitics.com',
        port: '',
        pathname: '/cdn/images/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'www.socalpolitics.com',
      //   port: '',
      //   pathname: '/cdn/**',
      // },
    ],
  },
};

// module.exports = nextConfig;
