import { initGlobalContext } from './GlobalContext'

export class Mkb10Data {
	/**Идентификатор записи */
	id?: string
	/** Идентификатор родительской записи  */
	parentID?: string
	/** Код записи */
	code?: string
	/** Краткое наименование записи */
	shortname?: string
	/** Полное наименование записи */
	fullname?: string
	/** Дата начала действия записи */
	startDate?: Date
	/** Дата окончания действия записи */
	endDate?: Date | null
	/** Статус */
	status?: string
	/** Внешний Идентификатор версии справочника */
	versionId?: string
	/** Комментарий */
	comment?: string

	children?: Mkb10Data[]

	constructor() {
		this.id = ''
		this.parentID = ''
		this.code = ''
		this.shortname = ''
		this.fullname = ''
		this.startDate = new Date()
		this.endDate = null
		this.status = ''
		this.versionId = ''
		this.comment = ''
		this.children = []
	}
}

export class Mkb10Context {
	/** Данные МКБ-10 */
	Mkb10: Mkb10Data

	constructor() {
		this.Mkb10 = new Mkb10Data();
	}
}

export const mkb10Context = initGlobalContext<Mkb10Context>(new Mkb10Context())
