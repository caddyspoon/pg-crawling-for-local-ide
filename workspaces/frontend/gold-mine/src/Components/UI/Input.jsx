import style from "./Input.module.css";

const Input = ({ placeholder, inputValue, onChangeHandler, inputType }) => {
	return (
		<input
			className={`${style["custom-input"]}`}
			placeholder={placeholder}
			value={inputValue}
			onChange={onChangeHandler}
			type={inputType}
		/>
	);
};

export default Input;
