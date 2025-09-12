const { HtmlRspackPlugin, CopyRspackPlugin } = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const { resolve } = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    index: resolve(__dirname, "src/main.tsx"),
    indexConsole: resolve(__dirname, "src/console.tsx"),
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "assets/[name].js",
    chunkFilename: "assets/[name].js",
    assetModuleFilename: "assets/[name][ext]",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    extensionAlias: {
      ".js": [".ts", ".js"],
      ".jsx": [".tsx", ".jsx"],
    },
    alias: {
      "/fonts": resolve(__dirname, "public/fonts"),
      "/logos": resolve(__dirname, "public/logos"),
    },
  },
  module: {
    rules: [
      // React and TypeScript files
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                  development: isDev,
                  refresh: isDev,
                },
              },
            },
          },
        },
      },
      // CSS files
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"),
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
        type: "css",
      },
      // Static assets
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: resolve(__dirname, "index.html"),
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlRspackPlugin({
      template: resolve(__dirname, "indexConsole.html"),
      filename: "indexConsole.html",
      chunks: ["indexConsole"],
    }),
    new CopyRspackPlugin({
      patterns: [
        {
          from: resolve(__dirname, "public"),
          to: resolve(__dirname, "dist"),
          globOptions: {
            ignore: ["**/index.html", "**/indexConsole.html"],
          },
        },
      ],
    }),
    // Add Sentry plugin for production builds
    ...(!isDev ? [sentryWebpackPlugin({
      org: "continue-xd",
      project: "continue",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })] : []),
    ...(isDev ? [new ReactRefreshPlugin()] : []),
  ],
  devServer: {
    port: 3000,
    open: false,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  },
  experiments: {
    css: true,
  },
  devtool: "source-map",
  optimization: {
    // Preserve the original build output structure
    splitChunks: false,
  },
  externals: {
    // External dependencies that might cause issues during build
    "uri-js": "commonjs2 uri-js",
    "lru-cache": "commonjs2 lru-cache",
    "web-tree-sitter": "commonjs2 web-tree-sitter",
    "fastest-levenshtein": "commonjs2 fastest-levenshtein",
    "ignore": "commonjs2 ignore",
    "uuid": "commonjs2 uuid",
    "async-mutex": "commonjs2 async-mutex",
    "sqlite": "commonjs2 sqlite",
    "sqlite3": "commonjs2 sqlite3",
    "quick-lru": "commonjs2 quick-lru",
    "zod": "commonjs2 zod",
    "minimatch": "commonjs2 minimatch",
    "partial-json": "commonjs2 partial-json",
    // Continue packages that might not be resolved
    "@continuedev/config-yaml": "commonjs2 @continuedev/config-yaml",
    "@continuedev/terminal-security": "commonjs2 @continuedev/terminal-security",
  },
};