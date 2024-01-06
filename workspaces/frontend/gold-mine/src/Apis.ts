import { API_ERROR_MSG } from "./constants/Constants";

const {
  BASIC_ERROR_KOR,
  QUESTION_NOT_EXIST_KOR,
  ERROR_400_KOR,
  ERROR_500_KOR,
} = API_ERROR_MSG;
const API_ROOT = process.env.REACT_APP_SERVER;

interface ReqData {
  questionNo: string;
  selectedLanguage: string;
}

// FIXME: I'm not used anymore!
// export const getLanguageType = async () => {
// 	try {
// 		const response = await fetch(`${API_ROOT}/langauge-type`);
// 		if (response.ok) {
// 			const languageType = await response.json();
// 			console.log("langaugeType", languageType);

// 			return languageType;
// 		} else {
// 			throw new Error(COMMUNICATION_ERROR);
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error(error);
// 	}
// };

const fetchGetRequest = async (requestURL: string) => {
  try {
    const URL = `${API_ROOT}${requestURL}`;
    const response = await fetch(URL);

    if (response.ok) {
      if (response.status === 200) {
        const { data } = await response.json();

        return {
          isSuccess: true,
          data: data,
        };
      } else if (response.status === 204) {
        return {
          isSuccess: false,
          error: QUESTION_NOT_EXIST_KOR,
        };
      }
    } else {
      let KorMessage = BASIC_ERROR_KOR;
      if (response.status === 400) {
        KorMessage = ERROR_400_KOR;
      } else if (response.status === 500) {
        KorMessage = ERROR_500_KOR;
      }

      return {
        isSuccess: false,
        error: KorMessage,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      error: BASIC_ERROR_KOR,
    };
  }
};

export const getQuestionCode = async (reqData: ReqData) => {
  const { selectedLanguage, questionNo } = reqData;

  const requestURL = `/question/${questionNo}?selectedLanguage=${selectedLanguage}`;

  return fetchGetRequest(requestURL);
};

export const getQuestionName = async (questionNo: string) => {
  const requestURL = `/question/${questionNo}?isNameOnly=Y`;

  return fetchGetRequest(requestURL);
};
