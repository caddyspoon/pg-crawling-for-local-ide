import { useState, useEffect } from "react";

import Select from "./UI/Select";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Tooltip from "./UI/Tooltip";

import style from "./SearchBar.module.css";

// FIXME: Hard Coding Text
const SELECT_INIT_TEXT = "Langauge!";
const INPUT_PLACEHOLDER = "Question Number";
const CLICK_TEXT = "Search!";

const SearchBar = () => {
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
