/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_HOST: process.env.API_HOST,
        API_KEY: process.env.API_KEY,
    },
    images: {
        domains: [
            "image.tmdb.org"
        ],
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "image.tmdb.org",
        //     }
        // ]
    }
}

module.exports = nextConfig
