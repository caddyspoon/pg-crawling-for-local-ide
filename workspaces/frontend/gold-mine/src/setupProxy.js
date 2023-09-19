// import { createProxyMiddleware } from "http-proxy-middleware";
const { createProxyMiddleware } = require("http-proxy-middleware");

// const Proxy = (app) => {
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

// export default Proxy;
