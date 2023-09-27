const PreviewInfo = ({
	isPreviewShowup,
	questionInfo,
	isPreviewInfoLoading,
	isValidPreview,
}) => {
	if (!isPreviewShowup) {
		return <h3>저는 보이면 안돼요.</h3>;
	}

	if (isPreviewInfoLoading) {
		return <h3>Loading...</h3>;
	}

	if (isValidPreview === "rejected") {
		return <h3>없는 문제래요.</h3>;
	}

	return <h3>{questionInfo}</h3>;
};

export default PreviewInfo;
