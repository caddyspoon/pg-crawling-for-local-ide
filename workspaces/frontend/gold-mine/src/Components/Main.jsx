import { useState } from "react";

import SearchBar from "./SearchBar";
import Description from "./Description";

import LoaderOverlay from "./UI/LoaderOverlay";

import style from "./Main.module.css";

const Form = () => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={`${style["form-wrapper"]}`}>
			{isLoading && <LoaderOverlay />}
			<div className={`${style["form-body"]}`}>
				<Description />
				<SearchBar loaderHandler={setIsLoading} />
			</div>
		</div>
	);
};

export default Form;
