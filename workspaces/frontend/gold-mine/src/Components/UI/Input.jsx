import style from "./Input.module.css";

const Input = ({ placeholder, inputValue, onChangeHandler }) => {
	return (
		<input
			className={`${style["custom-input"]}`}
			placeholder={placeholder}
			value={inputValue}
			onChange={onChangeHandler}
		/>
	);
};

export default Input;
