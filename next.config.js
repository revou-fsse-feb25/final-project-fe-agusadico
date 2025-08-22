/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r9bjibncl2.ufs.sh',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig