import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
	const result = spawn("python", ["./crawling/Crawling.py"]);
	result.stdout.on("data", (data) => {
		const dataResult = {
			data: data.toString(),
		};

		res.send(dataResult);
	});

	result.stderr.on("error", (error) => {
		console.error(error.toString());
	});
});

app.listen(port, () => {
	console.log("The Server is launched: http://localhost:8000");
});
