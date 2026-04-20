const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.json$/,
          type: "json",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, "public"),
      },
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
  };
};
