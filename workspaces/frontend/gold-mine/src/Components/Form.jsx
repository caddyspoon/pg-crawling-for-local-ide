import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import LoaderOverlay from "./UI/LoaderOverlay";

import style from "./Form.module.css";
import SearchBar from "./SearchBar";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={`${style["form-wrapper"]}`}>
      {isLoading && <LoaderOverlay />}
      <div className={`${style["form-body"]}`}>
        <h2>DUMMY TEXT</h2>
        <h3>
          Please copy{" "}
          <span className={`${style["description-span"]}`}>
            {" "}
            <FontAwesomeIcon icon={faCircleInfo} /> the question number
          </span>{" "}
          and paste it to the input box below.
        </h3>
        <SearchBar loaderHandler={setIsLoading} />
      </div>
    </div>
  );
};

export default Form;
