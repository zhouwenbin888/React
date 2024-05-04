const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        configure: (webpackConfig) => {
            if (process.env.NODE_ENV === 'production') {
                webpackConfig.plugins.push(new BundleAnalyzerPlugin());
            }
            return webpackConfig;
        }
    }
};
