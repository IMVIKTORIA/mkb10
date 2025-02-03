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
    selectedContractorsIds,
    setSelectedContractorsIds,
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
    let ids = [node.id];
    if (node.children) {
      node.children.forEach((child) => {
        ids = [...ids, ...getAllChildIds(child)];
      });
    }
    return ids;
  };

  const findNodeById = (node, id) => {
    if (node.id === id) return node;
    if (node.children) {
      for (let child of node.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Поиск родителя
  const findParentNode = (node, id, parent = null) => {
    if (node.id === id) return parent;
    if (node.children) {
      for (let child of node.children) {
        const found = findParentNode(child, id, node);
        if (found) return found;
      }
    }
    return null;
  };
  //фильтр выбранных элементов
  const filterCodes = (selectedIds: string[]): string[] => {
    const filteredCodes = new Set<string>();

    selectedIds.forEach((selectedId) => {
      const selectedNode = findNodeById(props.jsonData, selectedId);
      if (!selectedNode) return;

      let hasParentSelected = false;
      let parent = findParentNode(props.jsonData, selectedId);

      while (parent) {
        if (selectedIds.includes(parent.id)) {
          hasParentSelected = true;
          break;
        }
        parent = findParentNode(props.jsonData, parent.id);
      }

      if (!hasParentSelected) {
        filteredCodes.add(selectedNode.code);
      }
    });

    return Array.from(filteredCodes);
  };

  const handleSelectorClick = (id) => {
    const isSelected = selectedContractorsIds.includes(id);
    const allChildIds = getAllChildIds(jsonData);
    setSelectedContractorsIds((prev) => {
      let newSelectedIds;
      if (isSelected) {
        newSelectedIds = prev.filter(
          (selectedId) => !allChildIds.includes(selectedId)
        );
      } else {
        newSelectedIds = [...prev, ...allChildIds];
      }
      const filteredCodes: string[] = filterCodes(newSelectedIds);

      if (onSelect) {
        onSelect(newSelectedIds, filteredCodes);
        console.log("children", onSelect);
      }
      return newSelectedIds;
    });
  };
  // Обновление состояния родителя в зависимости от состояния дочерних элементов
  useEffect(() => {
    if (jsonData.children && jsonData.children.length > 0) {
      const allChildIds = getAllChildIds(jsonData);
      const parentSelected = allChildIds.every((id) =>
        selectedContractorsIds.includes(id)
      );
      if (parentSelected && !selectedContractorsIds.includes(jsonData.id)) {
        setSelectedContractorsIds((prev) => [...prev, jsonData.id]);
      } else if (
        !parentSelected &&
        selectedContractorsIds.includes(jsonData.id)
      ) {
        setSelectedContractorsIds((prev) =>
          prev.filter((id) => id !== jsonData.id)
        );
      }
    }
  }, [selectedContractorsIds, jsonData.children]);

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
            isChecked={selectedContractorsIds.includes(jsonData.id)}
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
                selectedContractorsIds={selectedContractorsIds}
                setSelectedContractorsIds={setSelectedContractorsIds}
                depth={depth + 1}
                onSelect={onSelect}
              />
            )) // child - это структура jsonData
        }
      </div>
    </div>
  );
}
