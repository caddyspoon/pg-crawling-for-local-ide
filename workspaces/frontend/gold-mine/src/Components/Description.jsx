import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo, // 인포메이션 아이콘
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Description.module.css";
import descriptionImg from "../assets/media/description01.gif";
import solidBlack from "../assets/media/solid-black.png";

const Description = () => {
  const [isMouseOverOnMainInfo, setIsMouseOverOnMainInfo] = useState(false);
  const [isMouseOverOnGuide, setIsMouseOverOnGuide] = useState(false);

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

  let descriptionGif = "";
  if (isMouseOverOnGuide) {
    descriptionGif = (
      <img src={descriptionImg} alt="Guide for what is the quetion number" />
    );
  } else {
    descriptionGif = (
      <img src={solidBlack} alt="temp blank which is not shown" />
    );
  }
  return (
    <div className={`${style["description-wrapper"]}`}>
      <div className={`${style["description-content"]}`}>
        <h2 className={`${style["title-description"]}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
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
                {isMouseOverOnMainInfo && (
                  <img
                    src={solidBlack}
                    alt="Guide for what this website does"
                  />
                )}
              </div>
            </span>
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
                {descriptionGif}
                {/* {isMouseOverOnGuide ? (
                  <img
                    src={descriptionImg}
                    alt="Guide for what is the quetion number"
                  />
                ) : (
                  ""
                )} */}
              </div>
            </span>
            <FontAwesomeIcon icon={faQuestionCircle} /> the question number{" "}
          </span>
          to the input box below.
        </h3>

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
    </div>
  );
};

export default Description;
