import { useState, useEffect } from "react";

import { getLanguageType, getQuestionCode } from "../Apis";

import Select from "./UI/Select";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Tooltip from "./UI/Tooltip";

import Swal from "sweetalert2";

import style from "./SearchBar.module.css";

// FIXME: Hard Coding Text
const SELECT_INIT_TEXT = "Langauge!";
const INPUT_PLACEHOLDER = "Question Number";
const CLICK_TEXT = "Search!";

const SearchBar = ({ loaderHandler }) => {
  const [isInit, setIsInit] = useState(true);
  const [selectOptions, setSelectOptions] = useState({});
  const [buttonValidation, setButtonValidation] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [questionNo, setQuestionNo] = useState("");

  const [inputTimer, setInputTimer] = useState(0);
  const [isInputNotValid, setIsInputNotValid] = useState(false);

  useEffect(() => {
    if (isInit) {
      const fetchLanguageType = async () => {
        // TODO: USE CACHE LANGUAGE TYPE
        const languageType = await getLanguageType();
        setSelectOptions(languageType);
        setIsInit(false);
      };

      fetchLanguageType();
    }
  }, [isInit, selectOptions]);

  const languageChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    if (selectedLanguage && questionNo) {
      setButtonValidation(true);
    } else {
      setButtonValidation(false);
    }
  }, [selectedLanguage, questionNo]);

  const isValidInput = (inputValue) => {
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

    const newTimer = setTimeout(() => {
      setIsInputNotValid(false);
    }, 2000);
    setInputTimer(newTimer);
  };

  const questionNoHandler = (event) => {
    const enteredValue = event.target.value;
    if (!isValidInput(enteredValue)) {
      inputValidCounterDebouncing();
      return;
    }

    if (enteredValue.length > 6) {
      return;
    }

    setQuestionNo(enteredValue);
  };

  const buttonHandler = () => {
    const reqData = {
      selectedLanguage,
      questionNo,
    };

    if (!selectedLanguage || !questionNo) {
      // TODO: Validation Check
      Swal.fire({
        icon: "error",
        text: "요청값이 제대로 입력 안됐어요!",
      });
      return console.error("NOT VALID REQUEST");
    }

    loaderHandler(true);
    const fetchquestion = async () => {
      const resData = await getQuestionCode(reqData);
      loaderHandler(false);

      if (resData.ok) {
        navigator.clipboard.writeText(resData.data.questionCode);

        Swal.fire({
          title: "복사가 아주 성공적!",
          text: `[${resData.data.title}]의 코드를 가져왔습니다.`,
          footer: "코드가 클립보드에 복사되었습니다. IDE에 붙여넣기 하세요!",
          confirmButtonColor: "#014b7d",
        });
      } else {
        Swal.fire({
          title: resData.error,
          confirmButtonColor: "rgb(242, 49, 67)",
        });
      }
    };

    fetchquestion();
  };

  return (
    <div className={`${style["search-bar"]}`}>
      <Select
        initText={SELECT_INIT_TEXT}
        selectedValue={selectedLanguage}
        onChangeHandler={languageChangeHandler}
        selectOptions={selectOptions}
      />
      <Input
        placeholder={INPUT_PLACEHOLDER}
        inputValue={questionNo}
        onChangeHandler={questionNoHandler}
      />
      <Button
        onClickHandler={buttonHandler}
        description={CLICK_TEXT}
        isValid={buttonValidation}
      />
      <Tooltip isVisible={isInputNotValid} />
    </div>
  );
};

export default SearchBar;
