import { useState, useEffect } from "react";

import style from "./Select.module.css";

const Select = ({
  initText,
  selectedValue,
  onChangeHandler,
  selectOptions,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (selectedValue) {
      setIsSelected(true);
    }
  }, [isSelected, selectedValue]);

  return (
    <select
      className={`${style["custom-style"]} ${
        isSelected ? "" : style["notSelected"]
      }`}
      value={selectedValue}
      onChange={onChangeHandler}
    >
      <option className={`${style["init-text"]}`} value="" disabled>
        {initText}
      </option>
      {Object.keys(selectOptions).map((key) => (
        <option value={key} key={key}>
          {selectOptions[key]}
        </option>
      ))}
    </select>
  );
};

export default Select;
