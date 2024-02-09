/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avataaars.io",
                port: "",
                pathname: "/",
            },
        ],
    },
};

module.exports = nextConfig;
