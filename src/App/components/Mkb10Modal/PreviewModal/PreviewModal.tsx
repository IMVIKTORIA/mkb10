import React, { useEffect, useState } from "react";
import { mkb10Context, Mkb10Data } from "../../../stores/Mkb10Context";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import Button from "../../../../UIKit/Button/Button";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes";
import Scripts from "../../../shared/utils/clientScripts";
import RecursionList from "../../RecursionList/RecursionList";
import icons from "../../../shared/icons";
import InputButton from "../../../../UIKit/InputButton/InputButton";
import { findItemById, findItemByCode } from "../../../shared/utils/utils";
import CustomText from "../../../../UIKit/CustomText/CustomText";
import Loader from "../../../../UIKit/Loader/Loader";

/** Модальное окно */
export default function PreviewModal() {
  const { data, setValue } = mkb10Context.useContext();
  const [customInputValue, setCustomInputValue] = useState<string>("");
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const [diseasesListValue, setDiseasesListValue] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Инициализация
  React.useLayoutEffect(() => {
    Scripts.getDiseaseList()
      .then((list) => {
        setValue("Mkb10", list);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []);

  const onClickCancel = async () => {
    await Scripts.handleCancelClick();
    setSelectedItemsIds([]);
    setDiseasesListValue("");
    setCustomInputValue("");
  };

  const onClickSelect = async () => {
    await Scripts.handleSelectClick();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  //Поиск по фильтрам
  const onClickSearch = () => {
    data.onClickSearch();
  };

  // Обновление значения в CustomText
  const handleSelectChange = (selectedIds, codes) => {
    const removedCodes = selectedItemsIds
      .filter((id) => !selectedIds.includes(id))
      .map((id) => findItemById(id, data.Mkb10)?.code)
      .filter(Boolean);

    setSelectedItemsIds(selectedIds);

    setDiseasesListValue((prevValue) => {
      const existingCodes = new Set(prevValue.split("; ").filter(Boolean));
      // Удаление кодов дочерних элементов
      const removeChildCodes = (node) => {
        node?.children?.forEach((child) => {
          existingCodes.delete(child.code);
          removeChildCodes(child);
        });
      };
      // Обновление выбранных кодов
      codes.forEach((code) => {
        const node = findItemByCode(code, data.Mkb10);
        removeChildCodes(node);
        existingCodes.add(code);
      });

      removedCodes.forEach((code) => {
        if (code !== undefined) {
          existingCodes.delete(code);
        }
      });
      return Array.from(existingCodes).join("; ");
    });
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
            <CustomInput
              value={customInputValue}
              setValue={setCustomInputValue}
              name="diseases"
              cursor="text"
              buttons={
                <InputButton svg={icons.Search} clickHandler={onClickSearch} />
              }
            />
            <CustomText
              value={diseasesListValue}
              onChange={(e) => setDiseasesListValue(e.target.value)}
              readOnly
            />
            <div className="mkb10-modal__disease">
              {data && (
                <RecursionList
                  jsonData={data.Mkb10}
                  selectedItemsIds={selectedItemsIds}
                  setSelectedItemsIds={setSelectedItemsIds}
                  onSelect={handleSelectChange}
                />
              )}
            </div>
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
