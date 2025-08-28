/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['r9bjibncl2.ufs.sh', '9bjibncl2.ufs.sh'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r9bjibncl2.ufs.sh',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'r9bjibncl2.ufs.sh',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '9bjibncl2.ufs.sh',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '9bjibncl2.ufs.sh',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig