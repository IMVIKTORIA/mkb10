import React, { useEffect } from 'react'
import { mkb10Context } from '../../stores/Mkb10Context'
import PreviewModal from './PreviewModal/PreviewModal'

/** Модальное окно МКБ10 */
export default function Mkb10Modal() {
	const [data, setValue] = mkb10Context.useState()

	return (
		<mkb10Context.Provider value={{ data, setValue }}>{<PreviewModal />}</mkb10Context.Provider>
	)
}
