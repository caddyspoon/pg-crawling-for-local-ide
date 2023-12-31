import { useState, useEffect } from "react";

import { getQuestionCode, getQuestionName } from "../Apis";

// import Select from "./UI/Select";
import SelectDiv from "./UI/SelectDiv";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Tooltip from "./UI/Tooltip";

import { COLOR_PALETTE } from "../constants/Constants";

import Swal from "sweetalert2";

import style from "./SearchBar.module.css";

interface SearchBarProps {
  loaderHandler: (isLoading: boolean) => void;
  previewInfoHandler: (isLoading: string) => void;
  previewStatusHandler: (loadingStatus: string) => void;
  previewShowupHandler: (isShowup: boolean) => void;
  textLanguage: string;
}

type InternationalText = {
  [key: string]: {
    SELECT_INIT_TEXT: string;
    INPUT_PLACEHOLDER: string;
    CLICK_TEXT: string;
    TOOLTIP_TEXT: string;
  };
};

const LANGUAGE_TYPE = {
  python3: "Python3",
  javascript: "JavaScript",
};

const INTERNATIONAL_TEXT: InternationalText = {
  ENG: {
    SELECT_INIT_TEXT: "Language",
    INPUT_PLACEHOLDER: "Question Number",
    CLICK_TEXT: "Search",
    TOOLTIP_TEXT: "Please Enter Number",
  },
  KOR: {
    SELECT_INIT_TEXT: "언어",
    INPUT_PLACEHOLDER: "문제 번호",
    CLICK_TEXT: "가져오기",
    TOOLTIP_TEXT: "숫자를 입력해주세요.",
  },
};

const SearchBar = ({
  loaderHandler,
  previewInfoHandler,
  previewStatusHandler,
  previewShowupHandler,
  textLanguage = "ENG",
}: SearchBarProps) => {
  const { SELECT_INIT_TEXT, INPUT_PLACEHOLDER, CLICK_TEXT, TOOLTIP_TEXT } =
    INTERNATIONAL_TEXT[textLanguage];

  const [isInit, setIsInit] = useState(true);
  const [selectOptions, setSelectOptions] = useState({});
  const [buttonValidation, setButtonValidation] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [questionNo, setQuestionNo] = useState("");
  const [isValidQuestion, setIsValidQuestion] = useState(true);

  const [inputTimer, setInputTimer] = useState<number | null>(null);
  const [questionInputTimer, setQuestionInputTimer] = useState(0);
  const [isInputNotValid, setIsInputNotValid] = useState(false);

  useEffect(() => {
    if (isInit) {
      const fetchLanguageType = async () => {
        // TODO: CONSIDER USING CACHE LANGUAGE TYPE
        // const languageType = await getLanguageType();
        const languageType = LANGUAGE_TYPE;
        setSelectOptions(languageType);
        setIsInit(false);
      };

      fetchLanguageType();
    }
  }, [isInit, selectOptions]);

  // API를 기다리지 않고 바로 가져오기를 가져올 수 있게 일부러 두 가지의 버튼 유효성을 둔다.
  useEffect(() => {
    if (selectedLanguage && String(questionNo).length >= 5 && isValidQuestion) {
      setButtonValidation(true);
    } else {
      setButtonValidation(false);
    }
  }, [selectedLanguage, questionNo, isValidQuestion]);

  const isValidInput = (inputValue: string) => {
    const reg = /^[0-9]*$/;
    return reg.test(inputValue);
  };

  const inputValidCounterDebouncing = () => {
    if (!isInputNotValid) {
      setIsInputNotValid(true);
    }

    if (inputTimer) {
      clearTimeout(inputTimer);
    }

    const newTimer = window.setTimeout(() => {
      setIsInputNotValid(false);
    }, 2000);

    setInputTimer(newTimer);
  };

  const getQuestionNameDebouncing = (enteredValue: string) => {
    if (questionInputTimer) {
      clearTimeout(questionInputTimer);
    }

    const newQuestionTimer = window.setTimeout(() => {
      fetchPreviewQuestionName(enteredValue);
    }, 1000);
    setQuestionInputTimer(newQuestionTimer);
  };

  const fetchPreviewQuestionName = async (enteredValue: string) => {
    previewStatusHandler("pending");
    const nameResult = await getQuestionName(enteredValue);

    if (nameResult) {
      if (nameResult.isSuccess) {
        const {
          data: { title: questionName },
        } = nameResult;
        previewStatusHandler("fulfilled");
        previewInfoHandler(questionName);

        setIsValidQuestion(true);
      } else {
        previewStatusHandler("errorOccured");
        previewInfoHandler(nameResult.error!);

        setIsValidQuestion(false);
      }
    } else {
      previewStatusHandler("rejected");

      setIsValidQuestion(false);
    }
  };

  const questionNoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;

    if (!isValidInput(enteredValue)) {
      inputValidCounterDebouncing();
      return;
    }

    if (enteredValue.length > 6) {
      return;
    }

    setIsValidQuestion(true);
    previewStatusHandler("");
    previewInfoHandler("");

    if (enteredValue.length >= 5) {
      getQuestionNameDebouncing(enteredValue);
      previewShowupHandler(true);
    } else {
      previewShowupHandler(false);
    }

    setQuestionNo(enteredValue);
  };

  const fetchQuestion = async () => {
    const reqData = {
      selectedLanguage,
      questionNo,
    };

    const resData = await getQuestionCode(reqData);
    loaderHandler(false);

    if (!resData) {
      Swal.fire({
        title: "네트워크 통신 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
        confirmButtonColor: COLOR_PALETTE.ALERT,
      });
      return;
    }

    if (resData.isSuccess) {
      const resultText = resData.data.questionCode;

      // Code For Safari
      const userAgent = navigator.userAgent;
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

      if (isSafari) {
        Swal.fire({
          title: "문제를 성공적으로 가져왔습니다.",
          text: `[${resData.data.title}]의 코드를 가져왔습니다.`,
          footer:
            "OK 버튼 클릭 시 복사됩니다. 버튼을 누른 후 IDE에 붙여넣기 하세요!",
          confirmButtonColor: COLOR_PALETTE.CLASSIC_BLUE,
        }).then(() => navigator.clipboard.writeText(resultText));
      } else {
        navigator.clipboard.writeText(resData.data.questionCode);

        Swal.fire({
          title: "성공적으로 복사했어요!",
          text: `[${resData.data.title}]의 코드를 가져왔습니다.`,
          footer: "코드가 클립보드에 복사되었습니다. IDE에 붙여넣기 하세요!",
          confirmButtonColor: COLOR_PALETTE.CLASSIC_BLUE,
        });
      }
    } else {
      Swal.fire({
        title: resData.error,
        confirmButtonColor: COLOR_PALETTE.ALERT,
      });
    }
  };

  const buttonHandler = () => {
    if (!selectedLanguage || !questionNo) {
      return;
    }

    loaderHandler(true);
    fetchQuestion();
  };

  const inputKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      buttonHandler();
    }
  };

  return (
    <div className={`${style["search-bar"]} search-bar-global-width`}>
      <SelectDiv
        customClassName={`${style["search-select"]}`}
        initText={SELECT_INIT_TEXT}
        selectedValue={selectedLanguage}
        onChangeHandler={setSelectedLanguage}
        selectOptions={selectOptions}
      />
      <Tooltip
        isVisible={isInputNotValid}
        innerContent={TOOLTIP_TEXT}
        tooltipType="alertText"
      />
      <Input
        placeholder={INPUT_PLACEHOLDER}
        inputValue={questionNo}
        onChangeHandler={questionNoHandler}
        onKeyDownHandler={inputKeyDownHandler}
      />
      <Button
        customClassName={`${style["search-button"]}`}
        onClickHandler={buttonHandler}
        description={CLICK_TEXT}
        isValid={buttonValidation}
      />
    </div>
  );
};

export default SearchBar;
