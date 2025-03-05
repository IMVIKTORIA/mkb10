import { initGlobalContext } from "./GlobalContext";
import { IFiltersData, StringFilter } from "../../UIKit/Filters/FiltersTypes";

export class Mkb10Data {
  /**Идентификатор записи */
  id: string;
  /** Идентификатор родительской записи  */
  parentID?: string;
  /** Код записи */
  code?: string;
  /** Краткое наименование записи */
  shortname?: string;
  /** Полное наименование записи */
  fullname?: string;
  /** Дата начала действия записи */
  startDate?: Date;
  /** Дата окончания действия записи */
  endDate?: Date | null;
  /** Статус */
  status?: string;
  /** Внешний Идентификатор версии справочника */
  versionId?: string;
  /** Комментарий */
  comment?: string;

  children?: Mkb10Data[];

  constructor() {
    this.id = "";
    this.parentID = "";
    this.code = "";
    this.shortname = "";
    this.fullname = "";
    this.startDate = new Date();
    this.endDate = null;
    this.status = "";
    this.versionId = "";
    this.comment = "";
    this.children = [];
  }
}

export class Mkb10Context {
  /** Фильтры поиска */
  filters: Mkb10DataFilters;
  /** Данные МКБ-10 */
  Mkb10: Mkb10Data[];
  /** Обработчик нажатия на кнопку поиск */
  onClickSearch: () => Promise<void>;
  selectedItemsIds: string[];

  constructor() {
    this.filters = new Mkb10DataFilters();
    this.Mkb10 = [];
    this.onClickSearch = async () => {
      console.log("onClickSearch");
    };
    this.selectedItemsIds = [];
  }
}

export class Mkb10DataFilters implements IFiltersData {
  /** Код */
  code: StringFilter;
  /** Полное наименование */
  fullname: StringFilter;

  constructor(mkb10DataFilters?: Mkb10DataFilters) {
    this.code = new StringFilter("code", "код", mkb10DataFilters?.code.value);
    this.fullname = new StringFilter(
      "fullname",
      "полное наименование",
      mkb10DataFilters?.fullname.value
    );
  }
  reset() {
    this.code.reset();
    this.fullname.reset();
  }
}

export const mkb10Context = initGlobalContext<Mkb10Context>(new Mkb10Context());
