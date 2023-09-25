import { API_ERROR_MSG } from "./constants/Constants";

const { COMMUNICATION_ERROR, QUESTION_NOT_EXIST, QUESTION_NOT_EXIST_KOR } =
  API_ERROR_MSG;
const API_ROOT = "/api";

const getLanguageType = async () => {
  const response = await fetch(`${API_ROOT}/langauge-type`);
  if (response.ok) {
    const languageType = await response.json();

    return languageType;
  } else {
    throw new Error(COMMUNICATION_ERROR);
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

      if (message === QUESTION_NOT_EXIST) {
        KorMessage = QUESTION_NOT_EXIST_KOR;
      }

      return {
        ok: false,
        error: KorMessage,
      };
    }

    throw new Error(COMMUNICATION_ERROR);
  }
};

export { getLanguageType, getQuestionCode };
