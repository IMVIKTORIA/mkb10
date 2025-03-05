import React, { useEffect, useState } from "react";
import { mkb10Context } from "../../../stores/Mkb10Context";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import Button from "../../../../UIKit/Button/Button";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes";
import Scripts from "../../../shared/utils/clientScripts";
import icons from "../../../shared/icons";
import InputButton from "../../../../UIKit/InputButton/InputButton";
import { findItemById, findItemByCode, flattenTree, removeChildNodes } from "../../../shared/utils/utils";
import CustomText from "../../../../UIKit/CustomText/CustomText";
import Loader from "../../../../UIKit/Loader/Loader";
import { JsonDataType } from "../../../shared/types";
import MkbList from "./MkbList/MkbList";
import MkbSelectedElement from "./MkbSelectedList/MkbSelectedElement/MkbSelectedElement";
import MkbSelectedList from "./MkbSelectedList/MkbSelectedList";

/** Модальное окно */
export default function PreviewModal() {
  const { data, setValue } = mkb10Context.useContext();
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const [diseasesListValue, setDiseasesListValue] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Инициализация
  React.useLayoutEffect(() => {
    Scripts.appendChangeSelectedMkbCallback(setSelectedItemsIds);

    Scripts.getDiseaseList()
      .then((list) => {
        setValue("Mkb10", list);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []);

  /** Закрыть модальное окно */
  const closeModal = async () => {
    // Сброс модалки
    setSelectedItemsIds([]);
    setDiseasesListValue("");
    setSearchQuery("");
    
    // Закрыть модалку
    await Scripts.closeMkbModal();
  }

  const onClickCancel = async () => {
    // await Scripts.handleCancelClick();

    // Закрыть модалку
    await closeModal();
  };
  
  const onClickSelect = async () => {
    // Вставить значение в поле ввода
    await Scripts.handleSelectClick(diseasesListValue);
    
    // Закрыть модалку
    await closeModal();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  //Поиск по фильтрам
  const onClickSearch = () => {
    data.onClickSearch();
  };

  // Обновление значения в CustomText
  const handleSelectChange = (selectedIds: string[], codes: string[]) => {
    const removedCodes = selectedItemsIds
      .filter((id) => !selectedIds.includes(id))
      .map((id) => findItemById(id, data.Mkb10)?.code)
      .filter(Boolean);

    const ids = data.Mkb10.flatMap(node => removeChildNodes(selectedIds, node))
    const listValue = ids
      .map(id => findItemById(id, data.Mkb10)) // Получение нод по отфильтрованным id
      .map(node => node?.code) // Получение кода
      .filter(code => code) // Фильтр от undefined
      .join("; ");

    setSelectedItemsIds(selectedIds);
    setDiseasesListValue(listValue);
  };
  
  return (
    <div className="mkb10-modal">
      {isInitializing ? (
        <div className="mkb10-modal__loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mkb10-modal__header">
            <span className="mkb10-modal__label">Выберите болезнь</span>
          </div>
          <div
            className="mkb10-modal__content"
            style={{ width: "600px", height: "700px" }}
          >
            {/* Поле поиска */}
            <CustomInput
              value={searchQuery}
              setValue={setSearchQuery}
              cursor="text"
              buttons={
                <InputButton svg={icons.Search} clickHandler={onClickSearch} />
              }
            />
            {/* Поле выбранных элементов */}
            <CustomText
              value={diseasesListValue}
              onChange={(e) => setDiseasesListValue(e.target.value)}
              readOnly
            />
            <MkbSelectedList selectedItemsIds={selectedItemsIds} setSelectedItemsIds={setSelectedItemsIds} onSelect={handleSelectChange}/>
            {/* Список */}
            <MkbList
              searchQuery={searchQuery} 
              selectedItemsIds={selectedItemsIds} 
              setSelectedItemsIds={setSelectedItemsIds} 
              onSelect={handleSelectChange}
            />
            {/* Кнопки */}
            <div className="mkb10-modal__buttons">
              <Button
                title={"Отменить"}
                buttonType={ButtonType.outline}
                clickHandler={onClickCancel}
              />
              {selectedItemsIds.length > 0 && (
                <Button title={"Выбрать"} clickHandler={onClickSelect} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
