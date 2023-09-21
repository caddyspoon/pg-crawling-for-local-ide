import { useState, useEffect } from "react";

import { getLanguageType, getQuestionCode } from "../Apis";

import Select from "./UI/Select";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Tooltip from "./UI/Tooltip";

import { COLOR_PALETTE } from "../constants/Constants";

import Swal from "sweetalert2";

import style from "./SearchBar.module.css";

// FIXME: Hard Coding Text
const SELECT_INIT_TEXT = "Langauge!";
const INPUT_PLACEHOLDER = "Question Number";
const CLICK_TEXT = "Search!";
const TOOLTIP_TEXT = "Please Enter Num!";

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

	useEffect(() => {
		if (selectedLanguage && questionNo) {
			setButtonValidation(true);
		} else {
			setButtonValidation(false);
		}
	}, [selectedLanguage, questionNo]);

	const languageChangeHandler = (event) => {
		setSelectedLanguage(event.target.value);
	};

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

	const fetchquestion = async () => {
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

		fetchquestion();
	};

	const inputKeyDownHandler = (event) => {
		if (event.key === "Enter") {
			buttonHandler();
		}
	};

	return (
		<div className={`${style["search-bar"]}`}>
			<Select
				initText={SELECT_INIT_TEXT}
				selectedValue={selectedLanguage}
				onChangeHandler={languageChangeHandler}
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
				onClickHandler={buttonHandler}
				description={CLICK_TEXT}
				isValid={buttonValidation}
			/>
		</div>
	);
};

export default SearchBar;
