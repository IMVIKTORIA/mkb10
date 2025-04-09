import moment from "moment";
import {
  FetchData,
  ItemData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { Mkb10Data } from "../../stores/Mkb10Context";
import { mkbData } from "./MkbData";

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

type SetMkbDataCallback = (data: Mkb10Data) => void;
/** Функция обратного вызова заполнения данных модалки */
let setMkbDataCallback: SetMkbDataCallback | undefined;
async function appendSetMkbDataCallback(callback: SetMkbDataCallback) {
  setMkbDataCallback = callback;
  (window as any)["setMkbDataCallback"] = callback;
}

type ChangeSelectedMkbCallback = (data: string) => void;
/** Функция обратного вызова заполнения данных модалки */
let changeSelectedMkbCallback: ChangeSelectedMkbCallback | undefined;
function appendChangeSelectedMkbCallback(callback: ChangeSelectedMkbCallback) {
  changeSelectedMkbCallback = callback;
  (window as any)["changeSelectedMkbCallback"] = callback;
}

/** Обработчик нажатия на кнопку отмена */
async function handleCancelMkbClick() {
  // TODO
}

/** Обработчик нажатия на кнопку выбрать */
async function handleSelectClick(diseasesListValue: string) {
  // TODO
}

/** Обработчик закрытия модального окна */
async function closeMkbModal() {
  // Получить обеотку окна
  // Сделать display: none
}

/** Получение списка болезней */
async function getDiseaseList(): Promise<Mkb10Data[]> {
  const mockDate = moment("23.08.2024", "DD.MM.YYYY").toDate();

  return mkbData;
}

export default {
  appendSetMkbDataCallback,
  handleCancelMkbClick,
  handleSelectClick,
  getDiseaseList,
  closeMkbModal,
  appendChangeSelectedMkbCallback
};
