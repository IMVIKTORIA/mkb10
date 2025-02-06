import React, { useEffect, useState } from "react";
import { mkb10Context, Mkb10Data } from "../../../stores/Mkb10Context";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import Button from "../../../../UIKit/Button/Button";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes";
import Scripts from "../../../shared/utils/clientScripts";
import RecursionList from "../../RecursionList/RecursionList";
import icons from "../../../shared/icons";
import InputButton from "../../../../UIKit/InputButton/InputButton";
import { findItemById } from "../../../shared/utils/utils";

/** Модальное окно */
export default function PreviewModal() {
  const { data, setValue } = mkb10Context.useContext();
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>("");
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);

  // Инициализация
  React.useLayoutEffect(() => {
    Scripts.getDiseaseList().then((list) => {
      setValue("Mkb10", list);
    });
  }, []);

  const onClickCancel = async () => {
    await Scripts.handleCancelClick();
  };

  const onClickSelect = async () => {
    await Scripts.handleSelectClick();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  //Поиск по фильтрам
  const onClickSearch = () => {};

  // Функция обработки выбора элементов
  const handleSelect = (selectedIds: string[], codes: string[]) => {
    const removedCodes = selectedItemsIds
      .filter((id) => !selectedIds.includes(id))
      .map((id) => findItemById(id, data.Mkb10)?.code)
      .filter(Boolean);

    setSelectedItemsIds(selectedIds);

    setCustomInputValue((prevValue) => {
      const newCodes = codes.join("; ");
      const newValue = prevValue
        .split("; ")
        .filter((code) => !removedCodes.includes(code))
        .concat(newCodes)
        .filter(Boolean)
        .join("; ");

      return newValue;
    });
  };

  return (
    <div className="mkb10-modal">
      <div className="mkb10-modal__header">
        <span className="mkb10-modal__label">Выберите болезнь</span>
      </div>
      <div
        className="mkb10-modal__content"
        style={{ width: "600px", height: "600px" }}
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
        <div className="mkb10-modal__disease">
          {data && (
            <RecursionList
              jsonData={data.Mkb10}
              selectedItemsIds={selectedItemsIds}
              setSelectedItemsIds={setSelectedItemsIds}
              onSelect={handleSelect}
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
          {!isFileLoading && selectedItemsIds.length > 0 && (
            <Button title={"Выбрать"} clickHandler={onClickSelect} />
          )}
        </div>
      </div>
    </div>
  );
}
