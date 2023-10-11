import { useState } from "react";

import SearchBar from "./SearchBar";
import Description from "./Description";
import PreviewInfo from "./PreviewInfo";

import LoaderOverlay from "./UI/LoaderOverlay";

import style from "./Main.module.css";

const Form = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [isPreviewShowup, setIsPreviewShowup] = useState(false);
	const [previewQuestionInfo, setPreviewQuestionInfo] = useState("");
	const [previewStatus, setPreviewStatus] = useState("");

	return (
		<div className={`${style["form-wrapper"]}`}>
			{isLoading && <LoaderOverlay />}
			<div className={`${style["form-body"]}`}>
				<Description />
				<SearchBar
					loaderHandler={setIsLoading}
					previewInfoHandler={setPreviewQuestionInfo}
					previewStatusHandler={setPreviewStatus}
					previewShowupHandler={setIsPreviewShowup}
					textLanguage={"KOR"}
				/>
				<PreviewInfo
					isPreviewShowup={isPreviewShowup}
					questionInfo={previewQuestionInfo}
					previewStatus={previewStatus}
				/>
				<div className={`${style["form-bottom"]}`}></div>
			</div>
		</div>
	);
};

export default Form;
