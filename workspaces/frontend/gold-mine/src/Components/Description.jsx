import { useState, useLayoutEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Description.module.css";
import mainDescriptionImg from "../assets/media/main-description01.gif";
import descriptionImg from "../assets/media/description01.gif";
import solidBlack from "../assets/media/solid-black.png";

const Description = () => {
	const [isMouseOverOnMainInfo, setIsMouseOverOnMainInfo] = useState(false);
	const [isMouseOverOnGuide, setIsMouseOverOnGuide] = useState(false);

	const [crntMainDescImg, setCrntMainDescImg] = useState(null);
	const [crntSubDescImg, setCrntSubDescImg] = useState(null);

	const showTooltipGuide = () => {
		setIsMouseOverOnGuide(true);
	};
	const turnOffTooltipGuide = () => {
		setIsMouseOverOnGuide(false);
	};

	const showTooltipMainInfo = () => {
		setIsMouseOverOnMainInfo(true);
	};
	const turnOffTooltipMainInfo = () => {
		setIsMouseOverOnMainInfo(false);
	};

	const blackSolidImage = (
		<img src={solidBlack} alt="temp blank which is not shown" />
	);

	useLayoutEffect(() => {
		const mainDescImg = new Image();
		mainDescImg.src = mainDescriptionImg;
		mainDescImg.alt = "Guide for how to use Bartleby.";

		const subDescImg = new Image();
		subDescImg.src = descriptionImg;
		subDescImg.alt = "Guide for what is the quetion number";

		setCrntMainDescImg(mainDescImg);
		setCrntSubDescImg(subDescImg);
	}, []);

	let mainDescriptionGif = null;
	if (isMouseOverOnMainInfo) {
		mainDescriptionGif = crntMainDescImg;
	} else {
		mainDescriptionGif = blackSolidImage;
	}

	let descriptionGif = null;
	if (isMouseOverOnGuide) {
		descriptionGif = crntSubDescImg;
	} else {
		descriptionGif = blackSolidImage;
	}
	return (
		<div className={`${style["description-wrapper"]}`}>
			<div className={`${style["description-content"]}`}>
				<h2 className={`${style["title-description"]}`}>
					<span>
						<a
							href="https://school.programmers.co.kr/learn/challenges"
							target="_blank"
							rel="noopener noreferrer"
						>
							프로그래머스
						</a>
					</span>{" "}
					문제를 더 편리하게 로컬 IDE로 가져올 수 있게 도와드릴게요.{" "}
					<span
						className={`${style["description-info"]}`}
						onMouseOver={showTooltipMainInfo}
						onMouseOut={turnOffTooltipMainInfo}
					>
						{" "}
						<span
							className={`${style["tooltip-wrapper"]} ${
								isMouseOverOnMainInfo ? style["show-up"] : style["go-home"]
							}`}
						>
							<div className={`${style["main-tooltip-content"]}`}>
								{mainDescriptionGif}
							</div>
						</span>
						<FontAwesomeIcon icon={faCircleInfo} />
					</span>
				</h2>

				<h3 className={`${style["brief-description"]}`}>
					문제와 함께 테스트 케이스를 한 번에 복사해드려요. 입력창에
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
								{descriptionGif}
							</div>
						</span>
						<FontAwesomeIcon icon={faQuestionCircle} />
						문제번호
					</span>
					를 입력해주세요.
				</h3>
			</div>
		</div>
	);
};

export default Description;
