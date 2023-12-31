import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 8000;

// FIXME: I'm not used anymore!
// const LANGAUGE_TYPE = {
// 	python3: "Python3",
// 	javascript: "JavaScript",
// };

const ERRORS = {
  QUESTION_NOT_EXIST: "QUESTION NOT EXIST",
  CRAWLING_ERROR: "CRAWLING ERROR",
  LANGUAGE_ERROR: "LANGUAGE NOT AVAILABLE",
};

let langReqCounter = 0;
// FIXME: I'm not used anymore!
// app.get("/langauge-type", (req, res) => {
// 	langReqCounter += 1;

// 	console.log("GET Request | /language-type");
// 	console.log(`langReq Counts: ${langReqCounter}`);
// 	console.log("Language Request\n");

// 	res.send(LANGAUGE_TYPE);
// });

// FIXME: I'm not used anymore!
// app.get("/question-name", (req, res) => {
// 	const { questionNo } = req.query;

// 	console.log("GET Request | /question-name");

// 	const result = spawn("python", [
// 		"./crawling/get_question.py",
// 		"Y",
// 		"",
// 		questionNo,
// 	]);

// 	result.stdout.on("data", (data) => {
// 		questionReqCounter += 1;
// 		console.log(`Request counts: ${questionReqCounter}`);
// 		console.log("Request finished\n");

// 		const dataString = data.toString();
// 		const resJson = JSON.parse(dataString);

// 		if (resJson.status === "failed") {
// 			if (resJson.message === ERRORS.QUESTION_NOT_EXIST) {
// 				console.log(ERRORS.QUESTION_NOT_EXIST + "\n");

// 				return res
// 					.status(204)
// 					.send({ data: "", message: ERRORS.QUESTION_NOT_EXIST });
// 			}
// 		} else if (resJson.status === "success") {
// 			const dataResult = {
// 				data: resJson.data,
// 			};

// 			res.send(dataResult);
// 		}
// 	});

// result.stderr.on("error", (error) => {
// 	console.error(error.toString());
// });
// });

let questionReqCounter = 0;
app.get("/question/:questionNo", (req, res) => {
  const questionNo = req.params.questionNo;

  let selectedLanguage = "";
  let isNameOnly = "";

  if (req.query.isNameOnly) {
    isNameOnly = "Y";
  } else {
    isNameOnly = "N";
    selectedLanguage = req.query.selectedLanguage;
  }

  console.log("GET Request | /question");

  const result = spawn("python", [
    "./crawling/get_question.py",
    isNameOnly,
    selectedLanguage,
    questionNo,
  ]);

  result.stdout.on("data", (data) => {
    questionReqCounter += 1;

    console.log(`Request counts: ${questionReqCounter}`);
    console.log("Request finished\n");

    const dataString = data.toString();
    const resJson = JSON.parse(dataString);

    if (resJson.status === "failed") {
      if (resJson.message === ERRORS.QUESTION_NOT_EXIST) {
        console.log(ERRORS.QUESTION_NOT_EXIST);

        return res.status(404).send({ message: ERRORS.QUESTION_NOT_EXIST });
      } else if (resJson.message === ERRORS.CRAWLING_ERROR) {
        console.log(ERRORS.CRAWLING_ERROR);

        return res.status(500).send({ message: ERRORS.CRAWLING_ERROR });
      } else if (resJson.message === ERRORS.LANGUAGE_ERROR) {
        console.log(ERRORS.LANGUAGE_ERROR);

        return res.status(400).send({ message: ERRORS.LANGUAGE_ERROR });
      }
    } else if (resJson.status === "success") {
      const dataResult = {
        data: resJson.data,
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
