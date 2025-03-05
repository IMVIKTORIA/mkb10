import {
  ItemData,
  ItemDataString,
} from "../../UIKit/CustomList/CustomListTypes";
import { Mkb10Data } from "../stores/Mkb10Context";

export interface JsonDataType {
  /** Идентификатор записи */
  id: string;
  /** Идентификатор родительской записи */
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

  children?: JsonDataType[];
}

export type RecursionListProps = {
  jsonData: JsonDataType;
  selectedItemsIds: string[];
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  depth?: number;
  onSelect?: (selectedIds: string[], codes: string[]) => void;
};