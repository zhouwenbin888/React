const path = require('path');
const { whenProd } = require('@craco/craco');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        configure: (webpackConfig) => {
            let cdn = {
                js: []
            };
            whenProd(() => {
                webpackConfig.externals = {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    echarts: "echarts",
                };
                cdn = {
                    js: [
                        'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
                        "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.2.2/echarts.min.js",

                    ]
                };
            });

            const htmlWebpackPlugin = webpackConfig.plugins.find(
                (plugin) => plugin instanceof HtmlWebpackPlugin
            );

            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.cdn = cdn;
            }
            if (process.env.NODE_ENV === 'production') {
                webpackConfig.plugins.push(new BundleAnalyzerPlugin());

            }

            return webpackConfig;
        },
    }
};
