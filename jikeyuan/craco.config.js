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
                js: [],
                css: []
            };
            whenProd(() => {
                webpackConfig.externals = {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    echarts: "echarts",
                    dayjs: 'dayjs',
                    antd: 'antd',
                    quill: "Quill",
                };
                cdn = {
                    js: [
                        'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
                        "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.2.2/echarts.min.js",
                        'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.1/dayjs.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/antd/5.13.3/antd.min.js',
                        "https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.1/quill.min.js",
                    ],
                    css: [
                        'https://cdnjs.cloudflare.com/ajax/libs/antd/5.13.3/reset.min.css'
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
                // webpackConfig.plugins.push(new BundleAnalyzerPlugin());

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
