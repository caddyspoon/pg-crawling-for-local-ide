import { API_ERROR_MSG } from "./constants/Constants";

const { COMMUNICATION_ERROR, QUESTION_NOT_EXIST, QUESTION_NOT_EXIST_KOR } =
  API_ERROR_MSG;
const API_ROOT = process.env.REACT_APP_SERVER;

export const getLanguageType = async () => {
  try {
    const response = await fetch(`${API_ROOT}/langauge-type`);
    if (response.ok) {
      const languageType = await response.json();
      console.log("langaugeType", languageType);

      return languageType;
    } else {
      throw new Error(COMMUNICATION_ERROR);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getQuestionCode = async (reqData) => {
  const queryStrings = Object.keys(reqData)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(reqData[key])
    )
    .join("&");

  try {
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
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getQuestionName = async (questionNo) => {
  try {
    const response = await fetch(
      `${API_ROOT}/question-name?questionNo=${questionNo}`
    );

    if (response.ok) {
      if (response.status === 204) {
        return {
          ok: true,
          isExisting: false,
          message: "QUESTION NOT EXIST",
        };
      }

      const { data } = await response.json();
      return {
        ok: true,
        isExisting: true,
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
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
