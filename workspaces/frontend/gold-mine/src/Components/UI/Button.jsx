import style from "./Button.module.css";

const Button = ({
	onClickHandler,
	description,
	isValid,
	customClassName = "",
}) => {
	return (
		<button
			className={`${customClassName} ${style["custom-button"]}`}
			onClick={onClickHandler}
			disabled={!isValid}
		>
			{description}
		</button>
	);
};

export default Button;
