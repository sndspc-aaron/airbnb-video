/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deprecated images.domains configuration:

  // images: {
  //   domains: [
  //     "avatars.githubusercontent.com",
  //     "lh3.googleusercontent.com"
  //   ]
  // }
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
