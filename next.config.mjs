/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/rest-countries-api-next-ts',
    assetPrefix: '/rest-countries-api-next-ts/',
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '/**'
            }
        ],
        unoptimized: true
    },
};

export default nextConfig;
