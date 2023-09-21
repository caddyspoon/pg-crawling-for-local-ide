import style from "./Spinner.module.css";

// This component is made by refferring to the site below:
// https://dev.to/kirteshbansal/spinner-loader-in-react-using-css-458h

const Spinner = () => {
	return <div className={`${style["spinner"]}`}></div>;
};

export default Spinner;
