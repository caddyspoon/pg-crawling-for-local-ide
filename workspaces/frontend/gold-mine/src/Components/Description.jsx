import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo, // 인포메이션 아이콘
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Description.module.css";
import descriptionImg from "../assets/media/description01.gif";
import mainDescriptionImg from "../assets/media/main-description01.gif";
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

  let mainDescriptionGif = "";
  if (isMouseOverOnMainInfo) {
    mainDescriptionGif = (
      <img
        src={mainDescriptionImg}
        alt="Guide for what is the quetion number"
      />
    );
  } else {
    mainDescriptionGif = (
      <img src={solidBlack} alt="temp blank which is not shown" />
    );
  }

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
        {/* <h2 className={`${style["title-description"]}`}>
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
        </h2> */}

        {/* <h3 className={`${style["brief-description"]}`}>
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
              </div>
            </span>
            <FontAwesomeIcon icon={faQuestionCircle} /> the question number{" "}
          </span>
          to the input box below.
        </h3>*/}
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
