import React from "react";

const ReturnButton = (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="21" cy="21" r="21" fill="#ECEFF1"></circle>
    <line
      x1="23.5507"
      y1="28.4649"
      x2="16.0341"
      y2="20.9483"
      stroke="#9EA3A8"
      stroke-width="2"
    ></line>
    <line
      x1="23.7071"
      y1="14.7071"
      x2="16.7071"
      y2="21.7071"
      stroke="#9EA3A8"
      stroke-width="2"
    ></line>
  </svg>
);
const SortArrow = (
  <svg
    height="7px"
    width="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke=""
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#45B0E6"
        d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
      ></path>
    </g>
  </svg>
);

const Search = (
  <svg
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="6"
      stroke="#64C3F4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.5 14.5L19 19"
      stroke="#64C3F4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DeleteSearchItem = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16.2426 7.75827L7.75736 16.2435M16.2426 16.2435L7.75736 7.75827" stroke="#AAAAAD" stroke-width="2" stroke-linecap="round" />
	</svg>
)
export default {
  /** Кнопка назад */
  ReturnButton,
  SortArrow,
  Search,
	/** Иконка удаления элемента фильтра с поиском */
	DeleteSearchItem,
};
