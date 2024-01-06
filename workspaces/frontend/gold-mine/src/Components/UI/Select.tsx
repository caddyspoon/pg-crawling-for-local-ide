import { useState, useEffect } from "react";

import style from "./Select.module.css";

interface SelectOptions {
  key: string;
}

interface SelectProps {
  initText: string;
  selectedValue: string;
  onChangeHandler: () => void;
  selectOptions: SelectOptions;
  customClassName: string;
}

const Select = ({
  initText,
  selectedValue,
  onChangeHandler,
  selectOptions,
  customClassName = "",
}: SelectProps) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (selectedValue) {
      setIsSelected(true);
    }
  }, [isSelected, selectedValue]);

  return (
    <select
      className={`${customClassName} ${style["select-box"]} ${
        isSelected ? "" : style["notSelected"]
      }`}
      value={selectedValue}
      onChange={onChangeHandler}
    >
      <option className={`${style["init-text"]}`} value="" disabled>
        {initText}
      </option>
      {Object.keys(selectOptions).map((key) => (
        <option value={key} key={key} className={`${style["select-option"]}`}>
          {selectOptions[key as keyof typeof selectOptions]}
        </option>
      ))}
    </select>
  );
};

export default Select;
