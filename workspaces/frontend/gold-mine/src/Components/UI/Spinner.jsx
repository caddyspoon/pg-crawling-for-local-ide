import style from "./Spinner.module.css";

// This component is made by refferring to the site below:
// https://dev.to/kirteshbansal/spinner-loader-in-react-using-css-458h

const Spinner = ({
	spinnerSpeed = "default",
	spinnerColour = "blue",
	isFullSized = true,
}) => {
	const spinnerSpeedClassName = `speed-${spinnerSpeed}`;
	const spinnerColourClassName = `spinner-${spinnerColour}`;

	return (
		<div
			className={
				isFullSized
					? `${style["spinner-wrapper-full"]}`
					: `${style["spinner-wrapper-custom"]}`
			}
		>
			<div
				className={`${style["spinner"]} ${style[spinnerSpeedClassName]} ${style[spinnerColourClassName]}`}
			></div>
		</div>
	);
};

export default Spinner;
