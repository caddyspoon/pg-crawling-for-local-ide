import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import style from "./SelectDiv.module.css";

// This hook is based on link below
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref, isShowUp, turnShowUp) {
	useEffect(() => {
		if (isShowUp) {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					turnShowUp();
				}
			}
			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [ref, isShowUp, turnShowUp]);
}

const SelectDiv = ({
	initText,
	selectedValue,
	onChangeHandler,
	selectOptions,
	customClassName = "",
}) => {
	const [isSelected, setIsSelected] = useState(false);
	const [isShowUp, setIsShowUp] = useState(false);
	const [innerText, setInnerText] = useState(initText);

	const buttonRef = useRef(null);

	useEffect(() => {
		if (selectedValue) {
			setIsSelected(true);
		}
	}, [isSelected, selectedValue]);

	const onClickHandler = (event) => {
		if (event.target.tagName.toUpperCase() === "LI") {
			onChangeHandler(event.target.dataset["value"]);
			setInnerText(event.target.innerText);
			turnShowUp();
			return;
		}
	};

	const turnShowUp = () => {
		setIsShowUp(!isShowUp);
		// turnChevron();
	};

	// Turn Chevron by hooks
	// const turnChevron = () => {
	// 	if (chevronClass === "") {
	// 		setChevronClass(style["up-chevron"]);
	// 	} else if (chevronClass === style["up-chevron"]) {
	// 		setChevronClass(style["down-chevron"]);
	// 	} else if (chevronClass === style["down-chevron"]) {
	// 		setChevronClass(style["init-chevron"]);
	// 	}
	// };

	// useEffect(() => {
	// 	if (chevronClass === style["init-chevron"]) {
	// 		setChevronClass(style["up-chevron"]);
	// 	}
	// }, [chevronClass]);

	const optionListWrapperRef = useRef(null);
	useOutsideAlerter(optionListWrapperRef, isShowUp, turnShowUp);

	return (
		<div
			className={`${customClassName} ${style["select-wrapper"]}`}
			ref={optionListWrapperRef}
		>
			<div
				className={`${style["select-button"]} ${
					isSelected ? style["selected"] : style["not-selected"]
				}`}
				onClick={turnShowUp}
			>
				<div className={`${style["button-text"]}`} ref={buttonRef}>
					{innerText}
				</div>
				<div
					className={`${style["button-chevron"]} ${
						isShowUp ? style["active-rotation"] : ""
					}`}
				>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
			<ul
				className={
					`${isShowUp ? style["show-up"] : style["good-bye"]}` +
					" " +
					`${style["option-list"]}`
				}
				onClick={onClickHandler}
			>
				{Object.keys(selectOptions).map((key) => (
					<li data-value={key} key={key} className={`${style["option"]}`}>
						{selectOptions[key]}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SelectDiv;
