/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avataaars.io",
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

module.exports = nextConfig;
