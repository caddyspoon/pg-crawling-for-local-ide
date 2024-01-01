import style from "./Tooltip.module.css";

// This component is not completed.

const Tooltip = ({
  isVisible,
  innerContent,
  tooltipType = "text",
  isUpperTooltip = false,
}) => {
  const TOOLTIP_CONTENT = {
    text: (
      <div className={`${style["tooltip-content"]}`}>
        <p>{innerContent}</p>
      </div>
    ),
    alertText: (
      <div className={`${style["tooltip-content"]} ${style["alert-tooltip"]}`}>
        <p>{innerContent}</p>
      </div>
    ),
  };

  return (
    <span
      className={`${style["tooltip-wrapper"]} ${
        isVisible ? style["show-up"] : style["go-home"]
      }`}
    >
      {TOOLTIP_CONTENT[tooltipType]}
    </span>
  );
};

export default Tooltip;
