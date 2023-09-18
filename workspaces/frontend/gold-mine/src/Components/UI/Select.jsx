import style from "./Select.module.css";

const Select = ({ selectedValue, onChangeHandler, selectOptions }) => {
	return (
		<select
			className={`${style["custom-style"]}`}
			value={selectedValue}
			onChange={onChangeHandler}
		>
			{selectOptions.map((option) => (
				<option value={option} key={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default Select;
