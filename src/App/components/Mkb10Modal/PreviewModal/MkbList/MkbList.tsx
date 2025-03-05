import React, { useEffect, useState } from "react";
import { mkb10Context } from "../../../../stores/Mkb10Context";
import RecursionList from "../../../RecursionList/RecursionList";
import SearchList from "../SearchList/SearchList";
import { JsonDataType, RecursionListProps } from "../../../../shared/types";
import {
  getAllChildIds,
  getAllSelectedCodes,
  useDebounce,
} from "../../../../shared/utils/utils";

interface MkbListProps {
  /* jsonData: JsonDataType; */
  selectedItemsIds: string[];
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSelect?: (selectedIds: string[], codes: string[]) => void;
  searchQuery: string;
}
/** Список заболеваний */
export default function MkbList({
  /* jsonData, */
  selectedItemsIds,
  setSelectedItemsIds,
  onSelect,
  searchQuery,
}: MkbListProps) {
  const { data, setValue } = mkb10Context.useContext();

  // Обработка клика при выборе элемента
  const handleSelectorClick = (id: string, jsonData: JsonDataType) => {
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

  /** Обновить ноды */
  const updateNodes = (jsonData: JsonDataType) => {
    if (jsonData.children) {
      const allChildIds = getAllChildIds(jsonData);
      const allSelected =
        allChildIds.length > 0 &&
        allChildIds.every((childId) => selectedItemsIds.includes(childId));

      let updatedSelectedItemsIds: string[] | undefined = undefined;

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

      // Рекурсивно обновить потомков
      jsonData.children.map(updateNodes);
    }
  };

  React.useLayoutEffect(() => {
    data.Mkb10.map(updateNodes);
  }, [selectedItemsIds, data.Mkb10]);

  return (
    <div className="mkb10-modal__disease">
      {searchQuery ? (
        <SearchList
          searchQuery={searchQuery}
          handleSelectorClick={handleSelectorClick}
          selectedItemsIds={selectedItemsIds}
        />
      ) : (
        data &&
        data.Mkb10.map((node) => (
          <RecursionList
            jsonData={node}
            selectedItemsIds={selectedItemsIds}
            setSelectedItemsIds={setSelectedItemsIds}
            handleSelectorClick={handleSelectorClick}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  );
}
