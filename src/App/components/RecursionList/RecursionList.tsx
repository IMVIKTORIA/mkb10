import React, { useState, useEffect } from "react";
import { RecursionListProps, JsonDataType } from "../../shared/types";
import DiseaseList from "../DiseaseList/DiseaseList";
import icons from "../../shared/icons";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";

export default function RecursionList(
  props: RecursionListProps & {
    depth?: number;
    onSelect?: (selectedIds: string[], codes: string[]) => void;
  }
) {
  const {
    jsonData,
    selectedItemsIds,
    setSelectedItemsIds,
    depth = 0,
    onSelect,
  } = props;
  const [isSorted, setIsSorted] = useState(false);
  const isLeaf = !jsonData.children || jsonData.children.length === 0;

  // Раскрытие/закрытие списка
  const handleIconClick = () => {
    if (!jsonData.children?.length) return;
    setIsSorted((prevState) => !prevState);
  };

  // Получение всех дочерних id у элемента, включая вложенные
  const getAllChildIds = (node) =>
    node.children?.flatMap((child) => [child.id, ...getAllChildIds(child)]) ||
    [];

  //Получение всех кодов выбранных элементов
  const getAllSelectedCodes = (selectedIds, jsonData) => {
    const selectedCodes: Set<string> = new Set();
    const traverse = (node) => {
      if (selectedIds.includes(node.id)) {
        selectedCodes.add(node.code);
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach(traverse);

        const allChildrenSelected = node.children.every((child) =>
          selectedIds.includes(child.id)
        );
        // Если все дочерние элементы выбраны, добавляем код родителя и удаляем коды дочерних элементов
        if (allChildrenSelected) {
          selectedCodes.add(node.code);
          node.children.forEach((child) => selectedCodes.delete(child.code));
        } else {
          // Если не все дочерние элементы выбраны, удаляем код родителя
          selectedCodes.delete(node.code);
        }
      }
    };

    traverse(jsonData);
    return Array.from(selectedCodes);
  };

  // Обработка клика при выборе элемента
  const handleSelectorClick = (id) => {
    const allChildIds = getAllChildIds(jsonData);
    const parentSelected = selectedItemsIds.includes(id);
    let updatedSelectedItemsIds;

    if (parentSelected) {
      updatedSelectedItemsIds = selectedItemsIds.filter(
        (selectedId) => !allChildIds.includes(selectedId) && selectedId !== id
      );
    } else {
      updatedSelectedItemsIds = [
        ...selectedItemsIds,
        ...allChildIds.filter((childId) => !selectedItemsIds.includes(childId)),
        id,
      ];
    }
    setSelectedItemsIds(updatedSelectedItemsIds);

    // Собираем коды выбранных элементов
    const selectedCodes = getAllSelectedCodes(
      updatedSelectedItemsIds,
      jsonData
    );
    if (onSelect) {
      onSelect(updatedSelectedItemsIds, selectedCodes);
    }
  };

  // Отслеживание состояний дочерних элементов
  useEffect(() => {
    if (jsonData.children) {
      const allChildIds = getAllChildIds(jsonData);
      const allSelected =
        allChildIds.length > 0 &&
        allChildIds.every((childId) => selectedItemsIds.includes(childId));

      let updatedSelectedItemsIds;

      // Если хотя бы один дочерний элемент не выбран, удаляем родителя
      if (!allSelected && selectedItemsIds.includes(jsonData.id)) {
        updatedSelectedItemsIds = selectedItemsIds.filter(
          (selectedId) => selectedId !== jsonData.id
        );
      }
      // Если все дочерние элементы выбраны, добавляем родителя
      else if (allSelected && !selectedItemsIds.includes(jsonData.id)) {
        updatedSelectedItemsIds = [...selectedItemsIds, jsonData.id];
      }

      if (updatedSelectedItemsIds) {
        setSelectedItemsIds(updatedSelectedItemsIds);

        const selectedCodes = getAllSelectedCodes(
          updatedSelectedItemsIds,
          jsonData
        );
        if (onSelect) {
          onSelect(updatedSelectedItemsIds, selectedCodes);
        }
      }
    }
  }, [selectedItemsIds, jsonData]);

  return (
    <div className="list-wrapper">
      <div
        className="list-wrapper__data"
        style={{ marginLeft: `${depth * 15}px` }}
      >
        <div style={{ display: "flex" }}>
          {jsonData.children?.length && (
            <div
              className={`list-wrapper__icons_right ${
                isSorted ? "list-wrapper__icons_down" : ""
              }`}
              onClick={handleIconClick}
            >
              {icons.SortArrow}
            </div>
          )}
          <CustomListSelector
            onClickSelector={() => handleSelectorClick(jsonData.id)}
            isChecked={selectedItemsIds.includes(jsonData.id)}
            isMultiple={true}
          />
        </div>
        <DiseaseList
          code={jsonData.code}
          name={jsonData.fullname}
          comment={jsonData.comment}
          isVisible={isSorted || isLeaf}
        />
      </div>
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
              />
            )) // child - это структура jsonData
        }
      </div>
    </div>
  );
}
