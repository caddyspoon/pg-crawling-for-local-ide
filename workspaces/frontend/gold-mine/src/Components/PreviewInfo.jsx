import { useState, useEffect } from "react";

import Spinner from "./UI/Spinner";

import style from "./PreviewInfo.module.css";

const PreviewInfo = ({
	isPreviewShowup,
	questionInfo,
	isPreviewInfoLoading,
	isValidPreview,
	wantSomeSpecial = false,
}) => {
	let innerContent = <></>;

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (isPreviewInfoLoading) {
			setIsLoaded(true);
		}
	}, [isPreviewInfoLoading]);

	// const [shouldRender, setRender] = useState(true);
	// const [sholudFadeOut, setFadeOut] = useState(false);
	// const [isFadeInDone, setFadeInDone] = useState(false);
	// const [isComplete, setComplete] = useState(false);

	const [show, setShow] = useState(false);
	const [shouldRender, setRender] = useState(show);

	useEffect(() => {
		if (isValidPreview === "rejected") {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [isValidPreview]);

	useEffect(() => {
		if (show) {
			setRender(true);
		}
	}, [show]);

	const fadeOutHandler = () => {
		if (!show) {
			setRender(false);
		}
	};

	if (isPreviewShowup) {
		if (isPreviewInfoLoading) {
			innerContent = (
				<div
					className={`${style["loading-spinner"]} ${style["fade-in"]}`}
					onAnimationEnd={fadeOutHandler}
				>
					<Spinner
						spinnerSpeed="slow"
						spinnerColour="grey"
						isFullSized={false}
					/>
				</div>
			);
		} else if (!questionInfo && isLoaded) {
			innerContent = shouldRender && (
				<h3
					className={`${show ? style["fade-in"] : style["fade-out"]} ${
						style["out-of-stock"]
					}`}
					onAnimationEnd={fadeOutHandler}
				>
					존재 하지 않는 문제입니다.
				</h3>
			);
		} else if (questionInfo && isLoaded) {
			innerContent = (
				<h3
					className={`${style["fade-in"]} ${style["in-stock"]}`}
					onAnimationEnd={fadeOutHandler}
				>
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

	// const loadingSpinner = (
	// 	<div className={`${style["loading-spinner"]} ${style["fade"]}`}>
	// 		<Spinner spinnerSpeed="slow" spinnerColour="grey" isFullSized={false} />
	// 	</div>
	// );

	// const outOfStock = (
	// 	<h3 className={`${style["fade"]} ${style["out-of-stock"]}`}>
	// 		"존재 하지 않는 문제입니다."
	// 	</h3>
	// );

	// const onStock = (
	// 	<h3 className={`${style["fade"]} ${style["in-stock"]}`}>{questionInfo}</h3>
	// );

	// 여기서부터!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// console.log("isValidPreview: ", isValidPreview);
	// console.log("isPreviewInfoLoading: ", isPreviewInfoLoading);
	// console.log("questionInfo: ", questionInfo);

	// return (
	// 	<div
	// 		className={`${
	// 			wantSomeSpecial ? style["special-wrapper"] : style["preview-wrapper"]
	// 		}
	// 		${style["wrapper-colour-transition"]};
	// 		${
	// 			isPreviewShowup ? style["show-up"] : style["good-bye"]
	// 		} search-bar-global-width`}
	// 	>
	// 		{isPreviewInfoLoading && isValidPreview && (
	// 			<div
	// 				className={`${style["loading-spinner"]} ${
	// 					isPreviewInfoLoading ? style["fade-in"] : style["fade-out"]
	// 				}`}
	// 			>
	// 				<Spinner
	// 					spinnerSpeed="slow"
	// 					spinnerColour="grey"
	// 					isFullSized={false}
	// 				/>
	// 			</div>
	// 		)}
	// 		{!isPreviewInfoLoading && isValidPreview && (
	// 			<h3
	// 				className={`${
	// 					isValidPreview === "rejected" ? style["fade-in"] : style["fade-out"]
	// 				} ${style["out-of-stock"]}`}
	// 			>
	// 				{!questionInfo && "존재 하지 않는 문제입니다."}
	// 			</h3>
	// 		)}
	// 		{!isPreviewInfoLoading && isValidPreview && (
	// 			<h3
	// 				className={`${
	// 					isValidPreview === "fulfilled"
	// 						? style["fade-in"]
	// 						: style["fade-out"]
	// 				} ${style["in-stock"]} ${style["animation-delayed"]}`}
	// 			>
	// 				{questionInfo}
	// 			</h3>
	// 		)}
	// 	</div>
	// );
};

export default PreviewInfo;
