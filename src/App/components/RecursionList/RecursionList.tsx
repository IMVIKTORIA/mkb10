import React, { useState, useEffect } from "react";
import { JsonDataType } from "../../shared/types";
import DiseaseListData from "../DiseaseListData/DiseaseListData";
import icons from "../../shared/icons";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";
import DiseaseListRow from "../DiseaseListRow/DiseaseListRow";
import { getAllChildIds, getAllSelectedCodes } from "../../shared/utils/utils";

type RecursionListProps = {
  jsonData: JsonDataType;
  selectedItemsIds: string[];
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  depth?: number;
  onSelect?: (selectedIds: string[], codes: string[]) => void;
  handleSelectorClick: (id: string, jsonData: JsonDataType) => void;
};

/** Иерархический список заболеваний */
export default function RecursionList({ jsonData, selectedItemsIds, setSelectedItemsIds, depth = 0, onSelect, handleSelectorClick}: RecursionListProps
) {
  const [isSorted, setIsSorted] = useState(false);
  const isLeaf = !jsonData.children || jsonData.children.length === 0;

  // Отслеживание состояний дочерних элементов
  // useEffect(() => {
  //   if (jsonData.children) {
  //     const allChildIds = getAllChildIds(jsonData);
  //     const allSelected =
  //       allChildIds.length > 0 &&
  //       allChildIds.every((childId) => selectedItemsIds.includes(childId));

  //     let updatedSelectedItemsIds: string[] | undefined = undefined;

  //     // Если хотя бы один дочерний элемент не выбран, удаляем родителя
  //     if (!allSelected && selectedItemsIds.includes(jsonData.id)) {
  //       updatedSelectedItemsIds = selectedItemsIds.filter(
  //         (selectedId) => selectedId !== jsonData.id
  //       );
  //     }
  //     // Если все дочерние элементы выбраны, добавляем родителя
  //     else if (allSelected && !selectedItemsIds.includes(jsonData.id)) {
  //       updatedSelectedItemsIds = [...selectedItemsIds, jsonData.id];
  //     }

  //     if (updatedSelectedItemsIds) {
  //       setSelectedItemsIds(updatedSelectedItemsIds);

  //       const selectedCodes = getAllSelectedCodes(
  //         updatedSelectedItemsIds,
  //         jsonData
  //       );

  //       if (onSelect) {
  //         onSelect(updatedSelectedItemsIds, selectedCodes);
  //       }
  //     }
  //   }
  // }, [selectedItemsIds, jsonData]);

  return (
    <div className="list-wrapper">
      <DiseaseListRow jsonData={jsonData} isShowArrow={true} handleSelectorClick={handleSelectorClick} selectedItemsIds={selectedItemsIds} isSorted={isSorted} isLeaf={isLeaf} setIsSorted={setIsSorted}  />
      <div className="list-wrapper__children">
        {
          jsonData.children?.length &&
            isSorted &&
            jsonData.children.map((child: JsonDataType) => (
              <RecursionList
                key={child.id}
                jsonData={child}
                selectedItemsIds={selectedItemsIds}
                setSelectedItemsIds={setSelectedItemsIds}
                depth={depth + 1}
                onSelect={onSelect}
                handleSelectorClick={handleSelectorClick}
              />
            ))
        }
      </div>
    </div>
  );
}
