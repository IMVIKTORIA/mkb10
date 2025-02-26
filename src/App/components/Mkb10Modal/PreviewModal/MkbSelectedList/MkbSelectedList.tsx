import React from "react";
import MkbSelectedElement from "./MkbSelectedElement/MkbSelectedElement";
import { findItemById, flattenTree, removeChildNodes } from "../../../../shared/utils/utils";
import { mkb10Context } from "../../../../stores/Mkb10Context";
import { JsonDataType } from "../../../../shared/types";

interface MkbSelectedListProps {
  selectedItemsIds: string[];
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSelect: (selectedIds: string[], codes: string[]) => void;
}

/** Список выбранных МКБ */
export default function MkbSelectedList({ selectedItemsIds, setSelectedItemsIds, onSelect }: MkbSelectedListProps) {
  const { data, setValue } = mkb10Context.useContext();

  return (
    <div className="mkb-selected-list">
      {data.Mkb10.flatMap(node => removeChildNodes(selectedItemsIds, node)).map(id => {
        const mkbItem = findItemById(id, data.Mkb10);
        return <MkbSelectedElement name={mkbItem?.code ?? ""} deleteHandler={() => {}} />
      })}
    </div>
  );
}
