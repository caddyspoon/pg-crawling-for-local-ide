import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	// faCircleInfo,    // 인포메이션 아이콘
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Description.module.css";
import testImage from "../assets/media/temp.gif";

const Description = () => {
	const [isMouseOverOnGuide, setIsMouseOverOnGuide] = useState(false);

	const showTooltipGuide = (event) => {
		setIsMouseOverOnGuide(true);
	};

	const turnOffTooltipGuide = () => {
		setIsMouseOverOnGuide(false);
	};

	return (
		<>
			<h2>DUMMY TEXT</h2>
			<h3>
				Please copy
				<span
					className={`${style["description-span"]}`}
					onMouseOver={showTooltipGuide}
					onMouseOut={turnOffTooltipGuide}
				>
					{" "}
					<span
						className={`${style["tooltip-wrapper"]} ${
							isMouseOverOnGuide ? style["show-up"] : style["go-home"]
						}`}
					>
						<div className={`${style["tooltip-content"]}`}>
							{isMouseOverOnGuide && (
								<img
									src={testImage}
									alt="Guide for what is the quetion number"
								/>
							)}
						</div>
					</span>
					<FontAwesomeIcon icon={faQuestionCircle} /> the question number{" "}
				</span>
				and paste it to the input box below.
			</h3>
		</>
	);
};

export default Description;
