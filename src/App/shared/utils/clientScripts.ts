import moment from "moment";
import {
  FetchData,
  ItemData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { Mkb10Data } from "../../stores/Mkb10Context";

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

/** Обработчик нажатия на кнопку отмена */
async function handleCancelClick() {
  // TODO
}

/** Обработчик нажатия на кнопку выбрать */
async function handleSelectClick() {
  // TODO
}

/** Получение списка болезней */
async function getDiseaseList(): Promise<Mkb10Data> {
  const mockDate = moment("23.08.2024", "DD.MM.YYYY").toDate();

  return {
    id: "123456789",
    parentID: undefined,
    code: "G35-G37",
    shortname: "G00-G99",
    fullname: "Демиелинизирующие болезни нервной системы",
    startDate: mockDate,
    endDate: null,
    status: "действует",
    versionId: "",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    children: [
      {
        id: "1234567893",
        parentID: "123456789",
        code: "G35",
        shortname: "G35",
        fullname: "Множественный склероз",
        startDate: mockDate,
        endDate: null,
        status: "действует",
        versionId: "",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        children: [
          {
            id: "1234567896",
            parentID: "1234567893",
            code: "G35.0",
            shortname: "G35.0",
            fullname: "Множественный склероз с острым началом",
            startDate: mockDate,
            endDate: null,
            status: "действует",
            versionId: "",
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            children: [
              {
                id: "1234567899",
                parentID: "1234567896",
                code: "G35.00",
                shortname: "G35.00",
                fullname: "Множественный склероз, неуточненный",
                startDate: mockDate,
                endDate: null,
                status: "действует",
                versionId: "",
                comment: "Lorem ipsum dolor sit amet",
              },
              {
                id: "1234567898",
                parentID: "1234567896",
                code: "G35.01",
                shortname: "G35.01",
                fullname: "Множественный склероз, неуточненный",
                startDate: mockDate,
                endDate: null,
                status: "действует",
                versionId: "",
                comment: "Lorem ipsum dolor sit amet",
              },
              {
                id: "1234567897",
                parentID: "1234567896",
                code: "G35.02",
                shortname: "G35.02",
                fullname: "Множественный склероз, неуточненный",
                startDate: mockDate,
                endDate: null,
                status: "действует",
                versionId: "",
                comment: "Lorem ipsum dolor sit amet",
              },
            ],
          },
        ],
      },
    ],
  };
}

export default {
  appendSetMkbDataCallback,
  handleCancelClick,
  handleSelectClick,
  getDiseaseList,
};
