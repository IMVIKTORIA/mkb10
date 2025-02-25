import React, { useState, useRef, useEffect } from "react";
import { JsonDataType } from "../../shared/types";
import icons from "../../shared/icons";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";
import DiseaseListData from "../DiseaseListData/DiseaseListData";

/** Пропсы Строки списка заболеваний */
interface DiseaseListRowProps { 
  jsonData: JsonDataType,
  isShowArrow: boolean,
  handleSelectorClick: (id: string, jsonData: JsonDataType) => void,
  selectedItemsIds: string[],
  isSorted?: boolean,
  isLeaf?: boolean,
  setIsSorted?: React.Dispatch<React.SetStateAction<boolean>>,
  depth?: number
}

/** Строка списка заболеваний */
const DiseaseListRow = ({ jsonData, isShowArrow, handleSelectorClick, selectedItemsIds, isSorted, isLeaf, setIsSorted, depth = 0 }: DiseaseListRowProps) => {
  // Раскрытие/закрытие списка
  const handleIconClick = () => {
    if (!jsonData.children?.length || !setIsSorted) return;
    setIsSorted((prevState) => !prevState);
  };

  return (
    <div
        className="list-wrapper__data"
        style={{ marginLeft: `${depth * 15}px` }}
      >
        <div style={{ display: "flex" }}>
          {isShowArrow && jsonData.children?.length && (
            <div
              className={`list-wrapper__icons ${
                isSorted ? "list-wrapper__icons_down" : "list-wrapper__icons_right"
              }`}
              onClick={handleIconClick}
            >
              {icons.SortArrow}
            </div>
          )}
          <CustomListSelector
            onClickSelector={() => handleSelectorClick(jsonData.id, jsonData)}
            isChecked={selectedItemsIds.includes(jsonData.id)}
            isMultiple={true}
          />
        </div>
        <DiseaseListData
          code={jsonData.code}
          name={jsonData.fullname}
          comment={jsonData.comment}
          isVisible={Boolean(isSorted || isLeaf)}
        />
      </div>
  );
};

export default DiseaseListRow;
