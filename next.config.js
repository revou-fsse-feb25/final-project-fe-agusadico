/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r9bjibncl2.ufs.sh',
        pathname: '**',
      },
      {
        protocol: 'https',
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