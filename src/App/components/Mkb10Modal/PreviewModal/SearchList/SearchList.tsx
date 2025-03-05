import React, { useEffect, useState } from "react";
import useDebounce from "../../../../../UIKit/shared/utils/hooks";
import { mkb10Context } from "../../../../stores/Mkb10Context";
import DiseaseListData from "../../../DiseaseListData/DiseaseListData";
import DiseaseListRow from "../../../DiseaseListRow/DiseaseListRow";
import moment from "moment";
import { JsonDataType } from "../../../../shared/types";
import { searchMkbItems } from "../../../../shared/utils/utils";

type SearchListProps = {
    /** Поисковый запрос */
    searchQuery: string,
    handleSelectorClick: (id: string, jsonData: JsonDataType) => void,
    selectedItemsIds: string[],
}

/** Поисковый список */
export default function SearchList({searchQuery, handleSelectorClick, selectedItemsIds}: SearchListProps) {
    const { data, setValue } = mkb10Context.useContext();
    // Результат поиска 
    const [searchData, setSearchData] = useState<JsonDataType[]>([]);

    useEffect(() => {
        if(!searchQuery) {
            setSearchData([])
            return; 
        }

        setSearchData(searchMkbItems(searchQuery, data.Mkb10))
    }, [searchQuery]);

    return (
    <>
        {searchData.map(jsonData =>
            <div className="list-wrapper">
                <DiseaseListRow
                    jsonData={jsonData}
                    isShowArrow={false}
                    handleSelectorClick={handleSelectorClick}
                    selectedItemsIds={selectedItemsIds}
                />
            </div>
        )}
    </>
    );
}
