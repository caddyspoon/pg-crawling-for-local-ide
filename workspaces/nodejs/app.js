import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 8000;

const LANGAUGE_TYPE = {
	python3: "Python3",
	javascript: "JavaScript",
};

const ERRORS = {
	QUESTION_NOT_EXIST: "QUESTION NOT EXIST",
	CRAWLING_ERROR: "CRAWLING ERROR",
};

let langReqCounter = 1;
app.get("/langauge-type", (req, res) => {
	langReqCounter += 1;

	console.log("GET Requset");
	console.log("langReq Counts: ", langReqCounter);
	console.log("Language Request\n");

	res.send(LANGAUGE_TYPE);
});

let counter = 1;
app.get("/question", (req, res) => {
	const { selectedLanguage, questionNo } = req.query;

	console.log("GET Request");

	const result = spawn("python", [
		"./crawling/Crawling.py",
		selectedLanguage,
		questionNo,
	]);

	result.stdout.on("data", (data) => {
		counter += 1;
		console.log(`Request counts: ${counter}`);
		console.log("requset finished\n");

		const dataString = data.toString();
		if (dataString === ERRORS.QUESTION_NOT_EXIST) {
			console.log(ERRORS.QUESTION_NOT_EXIST);

			return res.status(400).send({ message: ERRORS.QUESTION_NOT_EXIST });
		} else if (dataString === ERRORS.CRAWLING_ERROR) {
			console.log(ERRORS.CRAWLING_ERROR);

			return res.status(500).send({ message: ERRORS.CRAWLING_ERROR });
		} else {
			const dataResult = {
				data: dataString,
			};

			res.send(dataResult);
		}
	});

	result.stderr.on("error", (error) => {
		console.error(error.toString());
	});
});

app.listen(port, () => {
	console.log("The Server is launched: http://localhost:8000");
});
