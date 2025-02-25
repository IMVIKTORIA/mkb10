import React, { useEffect, useState } from "react";
import useDebounce from "../../../../../UIKit/shared/utils/hooks";
import { mkb10Context } from "../../../../stores/Mkb10Context";
import DiseaseListData from "../../../DiseaseListData/DiseaseListData";
import DiseaseListRow from "../../../DiseaseListRow/DiseaseListRow";
import moment from "moment";
import { JsonDataType } from "../../../../shared/types";

type SearchListProps = {
    /** Поисковый запрос */
    searchQuery: string,
    handleSelectorClick: (id: string, jsonData: JsonDataType) => void,
    selectedItemsIds: string[],
}

/** Поисковый список */
export default function SearchList({searchQuery, handleSelectorClick, selectedItemsIds}: SearchListProps) {
    const { data, setValue } = mkb10Context.useContext();
    
    // Изменение поискового запроса
    const searchQueryDebounced = useDebounce(searchQuery, 1000);
    useEffect(() => {}, [searchQueryDebounced]);
    const mockData = {
        id: "12345678991",
        parentID: "12345678961",
        code: "G35.00",
        shortname: "G35.00",
        fullname: "Множественный склероз, неуточненный",
        startDate: moment("23.08.2024", "DD.MM.YYYY").toDate(),
        endDate: null,
        status: "действует",
        versionId: "",
        comment: "Lorem ipsum dolor sit amet",
    };

    return (
    <>
        <DiseaseListRow
            jsonData={mockData}
            isShowArrow={false}
            handleSelectorClick={handleSelectorClick}
            selectedItemsIds={selectedItemsIds}
        />
    </>
    );
}
