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
                    quill: "Quill",
                };
                cdn = {
                    js: [
                        'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
                        "https://cdn.bootcdn.net/ajax/libs/echarts/4.1.0/echarts.min.js",
                        "https://cdn.quilljs.com/1.3.4/quill.js",
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

                // 压缩 CSS
                webpackConfig.plugins.push(
                    new MiniCssExtractPlugin({
                        filename: '[name].[contenthash:10].css',
                        chunkFilename: '[id].[contenthash:10].chunk.css',
                    })
                );


                // 压缩 JavaScript
                webpackConfig.optimization.minimize = true;
                webpackConfig.optimization.minimizer = [
                    new CssMinimizerWebpackPlugin(),
                    new TerserWebpackPlugin({
                        terserOptions: {
                            compress: {},
                        },
                    }),
                ];

                // 压缩 HTML
                htmlWebpackPlugin.options.minify = {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                };
            }

            return webpackConfig;
        },
    }
};
