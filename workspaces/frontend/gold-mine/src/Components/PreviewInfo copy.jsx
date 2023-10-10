import { useState, useEffect } from "react";

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
	const [temp, setTemp] = useState(false);
	const [renderTemp, setRenderTemp] = useState(false);
	const [tempQuestion, setTempQuestion] = useState(questionInfo);

	useEffect(() => {
		if (previewStatus === "rejected" || previewStatus === "fulfilled") {
			setRenderTemp(true);
			setTemp(false);
		}
		return () => {
			if (previewStatus === "rejected" || previewStatus === "fulfilled") {
				setTemp(true);
			}
		};
	}, [previewStatus]);

	// useEffect(() => {
	// 	if (temp) {
	// 		setRenderTemp(false);
	// 	}
	// }, [temp]);
	const tempController = () => {
		if (temp) {
			setRenderTemp(false);
		}
	};

	console.log(1, questionInfo, 2, tempQuestion);
	useEffect(() => {
		if (questionInfo) {
			console.log("여기 와야 되는디");
			setTempQuestion(questionInfo);
		}

		return () => {
			console.log("before");
			console.log(tempQuestion);
			console.log("여기 왔는가");
			setTempQuestion("");
			console.log("after", tempQuestion);
		};
	}, [questionInfo, tempQuestion]);

	console.log("temp: ", temp);
	console.log("renderTemp: ", renderTemp);
	console.log("previewStatus: ", previewStatus);
	console.log("isPreviewInfoLoading: ", isPreviewInfoLoading);
	console.log("");

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
		}
		// else if (renderTemp && previewStatus === "rejected") {
		// 	innerContent = (
		// 		<h3
		// 			className={`
		// 			 ${style["out-of-stock"]}`}
		// 			onAnimationEnd={tempController}
		// 		>
		// 			존재 하지 않는 문제입니다.
		// 		</h3>
		// 	);
		// }
		else {
			innerContent = (
				<h3
					className={`${!temp ? style["fade-in"] : style["fade-out"]} ${
						style["in-stock"]
					}`}
				>
					{tempQuestion}
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
