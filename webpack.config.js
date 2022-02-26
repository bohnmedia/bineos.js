module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    path: `${__dirname}/dist/`,
    filename: "bineos.js",
  },
};
