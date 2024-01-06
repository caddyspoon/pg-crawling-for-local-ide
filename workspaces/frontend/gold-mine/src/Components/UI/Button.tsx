import style from "./Button.module.css";

interface ButtonProps {
  onClickHandler: () => void;
  description: string;
  isValid: boolean;
  customClassName?: string;
}

const Button = ({
  onClickHandler,
  description,
  isValid,
  customClassName = "",
}: ButtonProps) => {
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
