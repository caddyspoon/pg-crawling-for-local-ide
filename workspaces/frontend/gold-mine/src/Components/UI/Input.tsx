import style from "./Input.module.css";

interface InputProps {
  placeholder: string;
  inputValue: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownHandler: (inputValue: React.KeyboardEvent) => void;
}

const Input = ({
  placeholder,
  inputValue,
  onChangeHandler,
  onKeyDownHandler,
}: InputProps) => {
  return (
    <input
      className={`${style["custom-input"]}`}
      placeholder={`${placeholder}`}
      value={inputValue}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  );
};

export default Input;
