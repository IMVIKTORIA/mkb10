import React from 'react';
import icons from '../../../../../shared/icons';
import { getAllChildIds, getAllSelectedCodes } from '../../../../../shared/utils/utils';
import { JsonDataType } from '../../../../../shared/types';

interface MkbSelectedElementProps {
	/** Значение элемента */
	name: string,
	/** Обработчик удаления элемента */
	deleteHandler: () => void,
	selectedItemsIds: string[],
	setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>,
	onSelect?: (selectedIds: string[], codes: string[]) => void,
}

/** Список выбранных мкб */
export default function MkbSelectedElement({ name, deleteHandler, selectedItemsIds, onSelect, setSelectedItemsIds, }: MkbSelectedElementProps) {
	
	return (
		<div className="mkb-selected-element-modal">
			<div className="mkb-selected-element-modal__name">{name}</div>
			<div className="mkb-selected-element-modal__close-button" onClick={() => deleteHandler()}>{icons.DeleteSearchItem}</div>
		</div>
	)
}