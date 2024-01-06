const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.REACT_APP_NODE_ENV === "local") {
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
  }
};
