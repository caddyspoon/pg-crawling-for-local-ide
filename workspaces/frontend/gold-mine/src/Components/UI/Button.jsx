import style from "./Button.module.css";

const Button = ({ onClickHandler, description, isValid }) => {
	return (
		<button
			className={`${style["custom-button"]}`}
			onClick={onClickHandler}
			disabled={!isValid}
		>
			{description}
		</button>
	);
};

export default Button;
