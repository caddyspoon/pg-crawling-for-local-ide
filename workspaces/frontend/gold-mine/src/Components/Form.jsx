import { useState, useEffect } from "react";

import Select from "./UI/Select";
import Input from "./UI/Input";
import Button from "./UI/Button";

import style from "./Form.module.css";

const Form = () => {
	// FIXME Hard Coding Below
	const [selectOptions, setSelectOptions] = useState(["Python3", "JavaScript"]);

	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [problemNo, setProblemNo] = useState("");

	useEffect(() => {
		if (!selectedLanguage) {
			setSelectedLanguage(selectOptions[0]);
		}
	}, [selectedLanguage, selectOptions]);

	const languageChangeHandler = (event) => {
		setSelectedLanguage(event.target.value);
	};

	const problemNoHandler = (event) => {
		setProblemNo(event.target.value);
	};

	const buttonHandler = () => {
		const reqData = {
			selectedLanguage,
			problemNo,
		};

		console.log(reqData);
	};

	return (
		<div className={`${style["form-wrapper"]}`}>
			<div className={`${style["form-body"]}`}>
				<Select
					selectedValue={selectedLanguage}
					onChangeHandler={languageChangeHandler}
					selectOptions={selectOptions}
				/>
				<Input
					placeholder={"Enter the Problem Number"}
					inputValue={problemNo}
					onChangeHandler={problemNoHandler}
				/>
				<Button onClickHandler={buttonHandler} description={"Click"} />
			</div>
		</div>
	);
};

export default Form;
