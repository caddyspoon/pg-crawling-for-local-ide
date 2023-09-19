import { useState, useEffect } from "react";

import { getLanguageType, getQuestionCode } from "../Apis";

import Swal from "sweetalert2";

import Select from "./UI/Select";
import Input from "./UI/Input";
import Button from "./UI/Button";

import style from "./Form.module.css";

// FIXME Hard Coding Text
const SELECT_INIT_TEXT = "Lang";
const INPUT_PLACEHOLDER = "Enter the question Number";
const CLICK_TEXT = "Search!";

const Form = () => {
	const [isInit, setIsInit] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const [selectOptions, setSelectOptions] = useState({});
	const [buttonValidation, setButtonValidation] = useState(false);

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [questionNo, setQuestionNo] = useState("");

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

	const questionNoHandler = (event) => {
		setQuestionNo(event.target.value);
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

		setIsLoading(true);
		const fetchquestion = async () => {
			const resData = await getQuestionCode(reqData);
			setIsLoading(false);

			if (resData.ok) {
				navigator.clipboard.writeText(resData.data);

				Swal.fire("복사가 아주 성공적!", "IDE에 붙여넣기 해보세요!");
			} else {
				Swal.fire(resData.error);
			}
		};

		fetchquestion();
	};

	if (isInit) {
		return;
	}

	// FIXME: 스피너와 모달 활용
	if (isLoading) {
		return (
			<div className={`${style["form-wrapper"]}`}>
				<h1>Loading</h1>
			</div>
		);
	}

	return (
		<div className={`${style["form-wrapper"]}`}>
			<div className={`${style["form-body"]}`}>
				<h3>DUMMY TEXT</h3>
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
						// TODO: 문제 이름을 검색하여 문제 번호외 문제 이름으로도 검색이 가능하게.
						inputType="number"
					/>
					<Button
						onClickHandler={buttonHandler}
						description={CLICK_TEXT}
						isValid={buttonValidation}
					/>
				</div>
			</div>
		</div>
	);
};

export default Form;
