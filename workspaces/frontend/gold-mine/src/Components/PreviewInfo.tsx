import { useState, useEffect } from "react";

import Spinner from "./UI/Spinner";

import style from "./PreviewInfo.module.css";

interface PreviewProps {
  isPreviewShowup: boolean;
  questionInfo: string;
  previewStatus: string;
  wantSomeSpecial?: boolean;
}

const getInnerComponent = (
  type = "",
  questionInfo?: string
): React.ReactElement => {
  const Loader = (
    <Spinner spinnerSpeed="slow" spinnerColour="grey" isFullSized={false} />
  );

  const NoQuestion = (
    <h3 className={`${style["out-of-stock"]}`}>
      존재하지 않는 문제번호입니다.
    </h3>
  );

  const ValidQuestionInfo = (
    <h3 className={`${style["in-stock"]}`}>{questionInfo}</h3>
  );

  if (questionInfo) {
    return ValidQuestionInfo;
  }

  if (type === "NoQuestion") {
    return NoQuestion;
  }

  if (type === "Loader") {
    return Loader;
  }

  return <></>;
};

const PreviewInfo = ({
  isPreviewShowup,
  questionInfo,
  previewStatus,
  wantSomeSpecial = false,
}: PreviewProps) => {
  const [show, setShow] = useState(false);
  const [prevPreviewStatus, setPrevPreviewStatus] = useState("");
  const [currentContent, setCurrentContent] = useState<
    React.ReactElement | string
  >("");

  useEffect(() => {
    if (previewStatus) {
      setPrevPreviewStatus(previewStatus);
    }
  }, [previewStatus, prevPreviewStatus, questionInfo]);

  useEffect(() => {
    if (prevPreviewStatus) {
      if (prevPreviewStatus === previewStatus) {
        setShow(true);

        if (previewStatus === "pending") {
          setCurrentContent(getInnerComponent("Loader"));
        } else if (previewStatus === "fulfilled") {
          setCurrentContent(getInnerComponent("ValidQuestion", questionInfo));
        } else if (previewStatus === "rejected") {
          setCurrentContent(getInnerComponent("NoQuestion"));
        } else {
          setCurrentContent("");
        }
      } else {
        setShow(false);
      }
    }
  }, [prevPreviewStatus, previewStatus, questionInfo]);

  const animationHandler = () => {
    if (!show) {
      setPrevPreviewStatus("");
      setCurrentContent("");
    }
  };

  useEffect(() => {
    if (!isPreviewShowup) {
      setShow(false);
    }
  }, [isPreviewShowup]);

  return (
    <div
      className={`${
        wantSomeSpecial ? style["special-wrapper"] : style["preview-wrapper"]
      } ${
        isPreviewShowup ? style["show-up"] : style["good-bye"]
      } search-bar-global-width`}
    >
      <div
        className={`${
          prevPreviewStatus === "pending" && style["loading-spinner"]
        } ${!show || !isPreviewShowup ? style["fade-out"] : style["fade-in"]}`}
        onAnimationEnd={animationHandler}
      >
        {currentContent}
      </div>
    </div>
  );
};

export default PreviewInfo;
