import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import style from "./SelectDiv.module.css";

const SelectDiv = ({
	initText,
	selectedValue,
	onChangeHandler,
	selectOptions,
	customClassName = "",
}) => {
	const [isSelected, setIsSelected] = useState(false);
	const [isShowUp, setIsShowUp] = useState(false);

	useEffect(() => {
		if (selectedValue) {
			setIsSelected(true);
		}
	}, [isSelected, selectedValue]);

	const showUpHandler = () => {
		setIsShowUp(!isShowUp);
	};

	return (
		<div className={`${customClassName} ${style["select-wrapper"]}`}>
			<button className={`${style["select-button"]} `} onClick={showUpHandler}>
				{initText} <FontAwesomeIcon icon={faChevronDown} />
			</button>
			<ul
				className={
					`${isShowUp ? style["show-up"] : style["good-bye"]}` +
					" " +
					`${style["option-list"]}`
				}
			>
				{Object.keys(selectOptions).map((key) => (
					<li value={key} key={key} className={`${style["option"]}`}>
						{selectOptions[key]}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SelectDiv;
