import { useState, useEffect } from "react";

import { getLanguageType, getQuestionCode, getQuestionName } from "../Apis";

// import Select from "./UI/Select";
import SelectDiv from "./UI/SelectDiv";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Tooltip from "./UI/Tooltip";

import { COLOR_PALETTE } from "../constants/Constants";

import Swal from "sweetalert2";

import style from "./SearchBar.module.css";

// FIXME: Hard Coding Text
const INTERNATIONAL_TEXT = {
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
// const SELECT_INIT_TEXT = "Langauge";
// const INPUT_PLACEHOLDER = "Question Number";
// const CLICK_TEXT = "Search";
// const TOOLTIP_TEXT = "Please Enter Num";

const SearchBar = ({
	loaderHandler,
	previewInfoHandler,
	previewLoadingHandler,
	previewValidationHandler,
	previewShowupHandler,
	textLanguage = "ENG",
}) => {
	const { SELECT_INIT_TEXT, INPUT_PLACEHOLDER, CLICK_TEXT, TOOLTIP_TEXT } =
		INTERNATIONAL_TEXT[textLanguage];

	const [isInit, setIsInit] = useState(true);
	const [selectOptions, setSelectOptions] = useState({});
	const [buttonValidation, setButtonValidation] = useState(false);

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [questionNo, setQuestionNo] = useState("");

	const [inputTimer, setInputTimer] = useState(0);
	const [questionInputTimer, setQuestionInputTimer] = useState(0);
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

	useEffect(() => {
		if (selectedLanguage && questionNo && String(questionNo).length >= 5) {
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

	const getQuestionNameDebouncing = (enteredValue) => {
		if (questionInputTimer) {
			clearTimeout(questionInputTimer);
		}

		const newQuestionTimer = setTimeout(() => {
			fetchPreviewQuestionName(enteredValue);
		}, 1000);
		setQuestionInputTimer(newQuestionTimer);
	};

	const fetchPreviewQuestionName = async (enteredValue) => {
		previewLoadingHandler(true);
		const nameResult = await getQuestionName(enteredValue);
		if (nameResult.ok) {
			if (nameResult.isExisting) {
				const {
					data: { title: questionName },
				} = nameResult;
				previewValidationHandler("fulfilled");
				previewInfoHandler(questionName);
			} else {
				previewValidationHandler("rejected");
			}
		}
		previewLoadingHandler(false);
	};

	const questionNoHandler = (event) => {
		previewValidationHandler("pending");
		previewInfoHandler("");

		const enteredValue = event.target.value;
		if (!isValidInput(enteredValue)) {
			inputValidCounterDebouncing();
			return;
		}

		if (enteredValue.length >= 5) {
			getQuestionNameDebouncing(enteredValue);
			previewShowupHandler(true);
		} else {
			previewShowupHandler(false);
		}

		if (enteredValue.length > 6) {
			return;
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

		if (resData.ok) {
			navigator.clipboard.writeText(resData.data.questionCode);

			Swal.fire({
				title: "복사가 아주 성공적!",
				text: `[${resData.data.title}]의 코드를 가져왔습니다.`,
				footer: "코드가 클립보드에 복사되었습니다. IDE에 붙여넣기 하세요!",
				confirmButtonColor: COLOR_PALETTE.CLASSIC_BLUE,
			});
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

	const inputKeyDownHandler = (event) => {
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
