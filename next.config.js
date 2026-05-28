/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rothvstraditional.com' }],
        destination: 'https://www.rothvstraditional.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig