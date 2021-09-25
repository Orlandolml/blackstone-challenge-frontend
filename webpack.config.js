const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`Mode is: ${mode}`);
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "dist/"),
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      hot: true,
      open: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "awesome-typescript-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          loader: "file-loader",
          test: /\.(png|jp(e*)g|svg|gif)$/,
          options: {
            name: "images/[hash]-[name].[ext]",
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
    ],
  };
};
