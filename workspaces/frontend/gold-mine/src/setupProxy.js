const { createProxyMiddleware } = require("http-proxy-middleware");

if (process.env.REACT_APP_NODE_ENV === "local") {
  module.exports = function (app) {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      })
    );
  };
}
