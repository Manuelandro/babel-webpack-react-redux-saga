const webpack = require("webpack")
const BeepPlugin = require("webpack-beep-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

const isVerbose = process.argv.includes("--verbose")
const env = process.env.NODE_ENV || "development"
const isDebug = env !== "production"

module.exports = {
    name: "client",
    target: "web",
    entry: {
        packed: ["@babel/polyfill", "./src/app.js"]
    },
    output: {
        path: `${__dirname}/build/`,
        filename: "[name].js"
    },
    devtool: isDebug ? "source-map" : false,
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|build|lib|enterprise|iwd|lang|magestore)/,
                loader: "babel-loader",
                query: {
                    babelrc: true
                }
            }
        ]
    },
    watch: true,
    cache: false,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": `"${env}"`,
            "process.env.BROWSER": true,
            __DEV__: isDebug
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: "used-twice",
            minChunks(module, count) {
                return count >= 2
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: "manifest" }),
        // https://medium.com/front-end-hacking/reduce-your-javascript-bundle-size-by-77-6fa5024680ca
        !isDebug &&
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            }),
        !isDebug &&
            new BrotliPlugin({
                asset: "[path].br[query]", // https://github.com/google/brotli
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8
            }),
        new BeepPlugin()
    ].filter(Boolean),
    bail: !isDebug,
    stats: {
        colors: true,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
}
