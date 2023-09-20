import style from "./Tooltip.module.css";

const Tooltip = ({ isVisible }) => {
	return (
		<div
			className={`${style["tooltip"]} ${
				isVisible ? style["show-up"] : style["go-home"]
			}`}
		>
			<p>Please Enter Num!</p>
			{/* <p>숫자만 입력할 수 있어요!</p> */}
		</div>
	);
};

export default Tooltip;
