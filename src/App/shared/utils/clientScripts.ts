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

  return [
    {
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
              ],
            },
          ],
        },
        {
          id: "1234567800",
          parentID: "123456789",
          code: "G36",
          shortname: "G36",
          fullname: "Эпилепсия и состояния, предшествующие эпилепсии",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: "1234567810",
          parentID: "123456789",
          code: "G37",
          shortname: "G37",
          fullname: "Холера",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    },
    {
      id: "1234567891",
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
          id: "12345678931",
          parentID: "1234567891",
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
              id: "12345678961",
              parentID: "12345678931",
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
                  id: "12345678991",
                  parentID: "12345678961",
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
                  id: "12345678981",
                  parentID: "12345678961",
                  code: "G35.01",
                  shortname: "G35.01",
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
        {
          id: "12345678001",
          parentID: "1234567891",
          code: "G36",
          shortname: "G36",
          fullname: "Эпилепсия и состояния, предшествующие эпилепсии",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: "12345678101",
          parentID: "1234567891",
          code: "G37",
          shortname: "G37",
          fullname: "Холера",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    }
  ];
}

export default {
  appendSetMkbDataCallback,
  handleCancelMkbClick,
  handleSelectClick,
  getDiseaseList,
  closeMkbModal,
  appendChangeSelectedMkbCallback
};
