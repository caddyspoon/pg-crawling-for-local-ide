import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import style from "./SelectDiv.module.css";

// This hook is based on link below
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				console.log("You clicked outside of me!");
				// if (isShowUp) {
				// 	setIsShowUp(false);
				// }
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
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
		if (event.target.tagName.toUpperCase() !== "LI") {
			return;
		}
		onChangeHandler(event.target.dataset["value"]);
		setInnerText(event.target.innerText);
		showUpHandler();
	};

	const showUpHandler = () => {
		setIsShowUp(!isShowUp);
	};

	const optionListWrapperRef = useRef(null);
	useOutsideAlerter(optionListWrapperRef);

	return (
		<div className={`${customClassName} ${style["select-wrapper"]}`}>
			<div
				className={`${style["select-button"]} ${
					isSelected ? style["selected"] : style["not-selected"]
				}`}
				onClick={showUpHandler}
			>
				<div className={`${style["button-text"]}`} ref={buttonRef}>
					{innerText}
				</div>
				<div
					className={`${style["button-chevron"]} ${
						isShowUp ? style["down-chevron"] : ""
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
				ref={optionListWrapperRef}
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
