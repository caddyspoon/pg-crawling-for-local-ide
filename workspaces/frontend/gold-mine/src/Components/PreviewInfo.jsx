import Spinner from "./UI/Spinner";

import style from "./PreviewInfo.module.css";

const PreviewInfo = ({
  isPreviewShowup,
  questionInfo,
  isPreviewInfoLoading,
  previewStatus,
  wantSomeSpecial = false,
}) => {
  let innerContent = <></>;

  if (isPreviewShowup) {
    if (isPreviewInfoLoading) {
      innerContent = (
        <div className={`${style["loading-spinner"]} ${style["fade-in"]}`}>
          <Spinner
            spinnerSpeed="slow"
            spinnerColour="grey"
            isFullSized={false}
          />
        </div>
      );
    } else if (!questionInfo && previewStatus === "rejected") {
      innerContent = (
        <h3 className={`${style["fade-in"]} ${style["out-of-stock"]}`}>
          존재 하지 않는 문제입니다.
        </h3>
      );
    } else if (questionInfo && previewStatus === "fulfilled") {
      innerContent = (
        <h3 className={`${style["fade-in"]} ${style["in-stock"]}`}>
          {questionInfo}
        </h3>
      );
    }
  }

  return (
    <div
      className={`${
        wantSomeSpecial ? style["special-wrapper"] : style["preview-wrapper"]
      }
	${style["wrapper-colour-transition"]};
	${
    isPreviewShowup ? style["show-up"] : style["good-bye"]
  } search-bar-global-width`}
    >
      {innerContent}
    </div>
  );
};

export default PreviewInfo;
