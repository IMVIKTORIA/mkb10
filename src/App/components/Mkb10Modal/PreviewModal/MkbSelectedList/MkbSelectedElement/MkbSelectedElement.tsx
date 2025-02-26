import React from 'react';
import icons from '../../../../../shared/icons';

interface MkbSelectedElementProps {
	/** Значение элемента */
	name: string,
	/** Обработчик удаления элемента */
	deleteHandler: () => void
}

/** Список выбранных мкб */
export default function MkbSelectedElement({ name, deleteHandler }: MkbSelectedElementProps) {
	return (
		<div className="mkb-selected-element">
			<div className="mkb-selected-element__name">{name}</div>
			<div className="mkb-selected-element__close-button" onClick={() => deleteHandler()}>{icons.DeleteSearchItem}</div>
		</div>
	)
}