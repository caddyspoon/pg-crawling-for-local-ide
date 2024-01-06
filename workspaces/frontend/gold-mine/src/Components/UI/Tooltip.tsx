import style from "./Tooltip.module.css";

interface TooltipProps {
  isVisible: boolean;
  innerContent: string;
  tooltipType: string;
  isUpperTooltip?: boolean;
}

// This component is not completed.
const Tooltip = ({
  isVisible,
  innerContent,
  tooltipType = "text",
  isUpperTooltip = false,
}: TooltipProps) => {
  const TOOLTIP_CONTENT = (tooltipType: string) => {
    if (tooltipType === "alertText") {
      return (
        <div
          className={`${style["tooltip-content"]} ${style["alert-tooltip"]}`}
        >
          <p>{innerContent}</p>
        </div>
      );
      // if tooltipType === "text"
    } else {
      return (
        <div className={`${style["tooltip-content"]}`}>
          <p>{innerContent}</p>
        </div>
      );
    }
  };

  const content = TOOLTIP_CONTENT(tooltipType);

  return (
    <span
      className={`${style["tooltip-wrapper"]} ${
        isVisible ? style["show-up"] : style["go-home"]
      }`}
    >
      {content}
    </span>
  );
};

export default Tooltip;
