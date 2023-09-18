import style from "./Button.module.css";

const Button = ({ onClickHandler, description }) => {
	return (
		<button className={`${style["custom-button"]}`} onClick={onClickHandler}>
			{description}
		</button>
	);
};

export default Button;
