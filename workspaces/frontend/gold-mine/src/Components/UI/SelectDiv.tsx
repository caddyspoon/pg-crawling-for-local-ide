import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import style from "./SelectDiv.module.css";

interface SelectOptions {
  [key: string]: string;
}

interface SelectDivProps {
  initText: string;
  selectedValue: string;
  onChangeHandler: (value: string) => void;
  selectOptions: SelectOptions;
  customClassName?: string;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  isShowUp: boolean,
  turnShowUp: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        turnShowUp();
      }
    };
    if (isShowUp) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isShowUp, turnShowUp]);
}

const SelectDiv = ({
  initText,
  selectedValue,
  onChangeHandler,
  selectOptions,
  customClassName = "",
}: SelectDivProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isShowUp, setIsShowUp] = useState(false);
  const [innerText, setInnerText] = useState(initText);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedValue) {
      setIsSelected(true);
    }
  }, [selectedValue]);

  const turnShowUp = () => {
    setIsShowUp(!isShowUp);
  };

  const onClickHandler = (event: React.MouseEvent<HTMLUListElement>) => {
    const crntTarget = event.target as HTMLLIElement;
    if (crntTarget.tagName.toUpperCase() === "LI") {
      onChangeHandler(crntTarget.dataset.value!);
      setInnerText(crntTarget.innerText);
      turnShowUp();
      return;
    }
  };

  const optionListWrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(optionListWrapperRef, isShowUp, turnShowUp);

  return (
    <div
      className={`${customClassName} ${style["select-wrapper"]}`}
      ref={optionListWrapperRef}
    >
      <div
        className={`${style["select-button"]} ${
          isSelected ? style["selected"] : style["not-selected"]
        }`}
        onClick={turnShowUp}
      >
        <div className={`${style["button-text"]}`} ref={buttonRef}>
          {innerText}
        </div>
        <div
          className={`${style["button-chevron"]} ${
            isShowUp ? style["active-rotation"] : ""
          }`}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <ul
        className={`${isShowUp ? style["show-up"] : style["good-bye"]} ${
          style["option-list"]
        }`}
        onClick={onClickHandler}
      >
        {Object.keys(selectOptions).map((key) => (
          <li data-value={key} key={key} className={style["option"]}>
            {selectOptions[key]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectDiv;
