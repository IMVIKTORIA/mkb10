import { useEffect, useState } from "react";
import { localStorageDraftKey } from "./constants";
import { JsonDataType } from "../types";

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
  let element = document.createElement("a");
  element.href = href;
  element.style.display = "none";
  document.querySelector("body")?.appendChild(element);
  element.click();
  element.remove();
};

/** Запись идентификатора обращения в localStorage
 * @param id Идентификатор обращения
 */
async function setRequest(id: string) {
  localStorage.setItem("currentRequestId", id);
  localStorage.setItem("currentContractorId", "");
  localStorage.setItem("currentContractorPhone", "");
}

/** Получение данных формы из черновика */
export function getDataFromDraft() {
  // Получение данных из черновика
  const draftData = localStorage.getItem(localStorageDraftKey);
  console.log(JSON.parse(draftData!));
  localStorage.removeItem(localStorageDraftKey);
  if (draftData) {
    return JSON.parse(draftData);
  }
}

export function useDebounce<ValueType = any>(
  value: ValueType,
  delay: number
): ValueType {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

export function saveState<ValueType>(state: ValueType) {
  let stateStr: string;

  try {
    stateStr = JSON.stringify(state);
  } catch (e) {
    throw new Error("Ошибка приведения состояния к строке: " + e);
  }

  localStorage.setItem(localStorageDraftKey, stateStr);
}

/** Копировать текст в буфер обмена */
export const copy = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
};

/** Поиск элемента списка в одной ноде по id */
const findItemByIdSingle = (
  id: string,
  node: JsonDataType
): JsonDataType | undefined => {
  if (node.id === id) return node;
  if (!node.children) return;

  for (const child of node.children) {
    const findNode = findItemByIdSingle(id, child);
    if (findNode) return findNode;
  }
};

/** Поиск элемента списка в массиве нод по id */
export const findItemById = (
  id: string,
  nodes: JsonDataType[]
): JsonDataType | undefined => {
  for (const node of nodes) {
    const findNode = findItemByIdSingle(id, node);
    if (findNode) return findNode;
  }
};

/** Поиск элемента списка в одной ноде по коду  */
const findItemByCodeSingle = (
  code: string,
  node: JsonDataType
): JsonDataType | undefined => {
  if (node.code === code) {
    return node;
  }

  if (!node.children?.length) return;

  for (const child of node.children) {
    const result = findItemByCodeSingle(code, child);
    if (result) {
      return result;
    }
  }
};

/** Поиск элемента списка в массиве нод по коду */
export const findItemByCode = (
  code: string,
  nodes: JsonDataType[]
): JsonDataType | undefined => {
  for (const node of nodes) {
    const findNode = findItemByCodeSingle(code, node);
    if (findNode) return findNode;
  }
};

/** Получение всех кодов выбранных элементов */
export const getAllSelectedCodes = (
  selectedIds: string[],
  jsonData: JsonDataType
) => {
  const selectedCodes: Set<string> = new Set();

  const traverse = (node: JsonDataType) => {
    if (!node.code) return;

    if (selectedIds.includes(node.id)) {
      selectedCodes.add(node.code);
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);

      const allChildrenSelected = node.children.every((child) =>
        selectedIds.includes(child.id)
      );

      // Если все дочерние элементы выбраны, добавляем код родителя и удаляем коды дочерних элементов
      if (allChildrenSelected) {
        selectedCodes.add(node.code);

        for (const child of node.children) {
          if (!child.code) continue;

          selectedCodes.delete(child.code);
        }
      } else {
        // Если не все дочерние элементы выбраны, удаляем код родителя
        selectedCodes.delete(node.code);
      }
    }
  };

  traverse(jsonData);
  return Array.from(selectedCodes);
};

// Получение всех дочерних id у элемента, включая вложенные
export const getAllChildIds = (node: JsonDataType): string[] =>
  node.children?.flatMap((child) => [child.id, ...getAllChildIds(child)]) || [];

// Расплющить дерево
export const flattenTree = (jsonData: JsonDataType) => {
  let items = [jsonData];

  if (jsonData.children) {
    for (const child of jsonData.children) {
      items = [...items, ...flattenTree(child)];
    }
  }

  return items;
};

// Поиск в справочнике МКБ-10
export const searchMkbItems = (searchQuery: string, nodes: JsonDataType[]) => {
	// Сделать из дерева массив
	const items = nodes.flatMap(flattenTree)
	const searchQueryProcessed = searchQuery.toLowerCase().trim().normalize()

	// Поиск по searchQuery
	return items.filter((item) => {
		return (
			(item.code && item.code.toLowerCase().trim().normalize().includes(searchQueryProcessed)) || // Код
			(item.fullname && item.fullname.toLowerCase().trim().normalize().includes(searchQueryProcessed)) || // Название
			(item.comment && item.comment.toLowerCase().trim().normalize().includes(searchQueryProcessed)) // Комментарий
		)
	})
}

export const removeChildNodes = (selectedIds: string[], node: JsonDataType) => {
  // Плоское дерево
  const flatTree = flattenTree(node);
  // Отфильтровать дерево по выбранным нодам
  const filteredFlatTree = flatTree.filter((node) =>
    selectedIds.find((sid) => sid === node.id)
  );
  // Отфильтровать id по родительским нодам
  let filteredIds = selectedIds.filter((sid) => {
    // Поиск текущей ноды
    const flatTreeNode = filteredFlatTree.find((node) => node.id === sid);
    // Поиск родительской ноды
    const hasParent = filteredFlatTree.find(
      (node) => node.id === flatTreeNode?.parentID
    );

    return flatTreeNode && !hasParent;
  });

  return filteredIds;
};

export default {
  redirectSPA,
  setRequest,
  getDataFromDraft,
  saveState,
  copy,
  findItemById,
  getAllSelectedCodes,
  getAllChildIds,
};
