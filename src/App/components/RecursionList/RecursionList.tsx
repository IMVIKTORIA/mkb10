import React, { useState, useEffect } from "react";
import { RecursionListProps, JsonDataType } from "../../shared/types";
import DiseaseList from "../DiseaseList/DiseaseList";
import icons from "../../shared/icons";
import CustomListSelector from "../../../UIKit/CustomList/CustomListSelector/CustomListSelector";
import { findItemById } from "../../shared/utils/utils";

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

  // Получение всех дочерних id у элемента
  const getAllChildIds = (node) => {
    return node.children
      ? [node.id, ...node.children.flatMap(getAllChildIds)]
      : [node.id];
  };

  // Обработчик выбора элемента
  const handleSelectorClick = (id: string) => {
    const allChildIds = getAllChildIds(jsonData);
    const parentSelected = selectedItemsIds.includes(jsonData.id);

    let newSelectedItemsIds: string[];
    if (parentSelected) {
      newSelectedItemsIds = selectedItemsIds.filter(
        (selectedId) => !allChildIds.includes(selectedId)
      );
    } else {
      newSelectedItemsIds = [...selectedItemsIds, ...allChildIds, jsonData.id];
    }
    setSelectedItemsIds(newSelectedItemsIds);

    const selectedCodes = newSelectedItemsIds
      .map((id) => {
        const selectedItem = findItemById(id, jsonData);
        return selectedItem ? selectedItem.code : undefined;
      })
      .filter((code): code is string => code !== undefined)
      .filter((value, index, self) => self.indexOf(value) === index);

    const parentCodes = selectedCodes.filter((code) => {
      const parentItem = findItemById(jsonData.id, jsonData);
      return parentItem && parentItem.code === code;
    });
    onSelect?.(newSelectedItemsIds, parentCodes);
  };

  // Отслеживание состояний дочерних элементов
  useEffect(() => {
    if (jsonData.children) {
      const allChildIds = jsonData.children.map((child) => child.id);
      const allSelected =
        allChildIds.length > 0 &&
        allChildIds.every((childId) => selectedItemsIds.includes(childId));

      if (allSelected && !selectedItemsIds.includes(jsonData.id)) {
        setSelectedItemsIds((prev) => [...prev, jsonData.id]);
      } else if (!allSelected && selectedItemsIds.includes(jsonData.id)) {
        setSelectedItemsIds((prev) =>
          prev.filter((selectedId) => selectedId !== jsonData.id)
        );
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
