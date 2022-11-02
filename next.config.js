/** @type {import('next').NextConfig} */

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://shuk-shukta-blogs.vercel.app/api/:path*',
  //     },
  //   ]
  // },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  env: {
    url: 'https://shuk-shukta-blogs-v-2.vercel.app',
    // url: 'http://localhost:3000',
    mongoDb_url:
      'mongodb+srv://v-2_shuk_shukta_blogger:J1mpEKNyBJH4lmaU@cluster0.fzhsks4.mongodb.net/shuk_shukta_blogs?retryWrites=true&w=majority',
    jwtAccessToken:
      'bd08838b01c568bd92aa9bcde2fca9cad987aded5e9a8cdab2cd977d0789f0446658211a1902500fbea332e5d9097b970915512e621189ba592682c0f1285303',
    jwtRevalidateAccessToken:
      'bret51542afsdd08838b01c568bd92aa9bcde2fca9cad987aded5e9a8cdab2cd977d0789f0446658211a1902500fbea332e5d9097b970915512e621189ba592682c',
  },
};
// mongodb+srv://v-2_shuk_shukta_blogger:J1mpEKNyBJH4lmaU@cluster0.fzhsks4.mongodb.net/test
module.exports = nextConfig;

/*
https://shuk-shukta-blogs-v-2.vercel.app/
http://localhost:3000

async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://shuk-shukta-blogs.vercel.app/api/:path*',
      },
    ]
  },
  
*/

// old database
// mongodb+srv://shuk_shukta_blogger:X3909BYp366Q1lph@cluster0.tjsznqp.mongodb.net/?retryWrites=true&w=majority
