const API_ROOT = "/api";

const ERRORS = {
	COMMUNICATION_ERROR: "Communication Error Occured",
	QUESTION_NOT_EXIST: "QUESTION NOT EXIST",
};

const getLanguageType = async () => {
	const response = await fetch(`${API_ROOT}/langauge-type`);
	if (response.ok) {
		const languageType = await response.json();

		return languageType;
	} else {
		throw new Error(ERRORS.COMMUNICATION_ERROR);
	}
};

const getQuestionCode = async (reqData) => {
	const queryStrings = Object.keys(reqData)
		.map(
			(key) => encodeURIComponent(key) + "=" + encodeURIComponent(reqData[key])
		)
		.join("&");

	const response = await fetch(`${API_ROOT}/question?${queryStrings}`);

	if (response.ok) {
		const { data } = await response.json();

		return {
			ok: true,
			data: data,
		};
	} else {
		if (response.status === 400) {
			const { message } = await response.json();
			let KorMessage = "";

			if (message === ERRORS.QUESTION_NOT_EXIST) {
				KorMessage = "그런 문제 없대요!";
			}

			return {
				ok: false,
				error: KorMessage,
			};
		}

		throw new Error(ERRORS.COMMUNICATION_ERROR);
	}
};

export { getLanguageType, getQuestionCode };
