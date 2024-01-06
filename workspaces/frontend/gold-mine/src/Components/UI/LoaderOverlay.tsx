import Spinner from "./Spinner";

import style from "./LoaderOverlay.module.css";

const LoaderOverlay = () => {
  return (
    <div className={`${style["spinner-overlay"]}`}>
      <Spinner />
    </div>
  );
};

export default LoaderOverlay;
