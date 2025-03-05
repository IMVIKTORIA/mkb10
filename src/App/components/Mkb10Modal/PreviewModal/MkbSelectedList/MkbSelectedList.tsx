import React from "react";
import MkbSelectedElement from "./MkbSelectedElement/MkbSelectedElement";
import { findItemById, flattenTree, getAllChildIds, getAllSelectedCodes, removeChildNodes } from "../../../../shared/utils/utils";
import { mkb10Context } from "../../../../stores/Mkb10Context";
import { JsonDataType } from "../../../../shared/types";

interface MkbSelectedListProps {
  selectedItemsIds: string[];
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSelect: (selectedIds: string[], codes: string[]) => void;
}

/** Список выбранных МКБ */
export default function MkbSelectedList(props: MkbSelectedListProps) {
  const { selectedItemsIds, setSelectedItemsIds, onSelect } = props;
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

  return (
    <div className="mkb-selected-list">
      {data.Mkb10.flatMap(node => removeChildNodes(selectedItemsIds, node)).map(id => {
        const mkbItem = findItemById(id, data.Mkb10);
        return <MkbSelectedElement name={mkbItem?.code ?? ""} deleteHandler={() => {
          const item = findItemById(id, data.Mkb10);
          if(item) handleSelectorClick(id, item)
        }
        } {...props} />
      })}
    </div>
  );
}
