import { FetchData, ItemData, SortData } from '../../../UIKit/CustomList/CustomListTypes'
import { Mkb10Data } from '../../stores/Mkb10Context'

/** Ожидание */
function sleep(ms: number) {
	return new Promise((resolve) => window.setTimeout(resolve, ms))
}
type SetMkbDataCallback = (data: Mkb10Data) => void
/** Функция обратного вызова заполнения данных модалки */
let setMkbDataCallback: SetMkbDataCallback | undefined
async function appendSetMkbDataCallback(callback: SetMkbDataCallback) {
	setMkbDataCallback = callback
	;(window as any)['setMkbDataCallback'] = callback
}

/** Обработчик нажатия на кнопку отмена */
async function handleCancelClick() {
	// TODO
}

/** Обработчик нажатия на кнопку выбрать */
async function handleSelectClick() {
	// TODO
}

/** Получение списка болезней */
async function getDiseaseList() {}

export default {
	appendSetMkbDataCallback,
	handleCancelClick,
	handleSelectClick,
	getDiseaseList,
}
