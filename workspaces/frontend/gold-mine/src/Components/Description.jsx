import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo, // 인포메이션 아이콘
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
		<div class={`${style["description-wrapper"]}`}>
			<div class={`${style["description-content"]}`}>
				<h2 className={`${style["title-description"]}`}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
					<span>
						<FontAwesomeIcon icon={faCircleInfo} />
					</span>
				</h2>

				{/* <div className={`${style["upper-wrapper"]}`}>
				<h1>Dummy Text</h1>
				<h2 className={`${style["brief-description"]}`}>
					<span>
						<a
							href="https://school.programmers.co.kr/"
							target="_blank"
							rel="noreferrer noopener"
						>
							Lorem ipsum
						</a>
					</span>{" "}
					Lorem ipsum dolor sit amet consectetur.
				</h2>
			</div> */}

				<h3 className={`${style["brief-description"]}`}>
					Please enter
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
					to the input box below.
				</h3>
			</div>
			{/* <h3 className={`${style["brief-description"]}`}>
				입력창에
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
					<FontAwesomeIcon icon={faQuestionCircle} />
					문제번호
				</span>
				를 입력해주세요.
			</h3> */}
		</div>
	);
};

export default Description;
