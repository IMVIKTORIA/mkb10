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
    // Результат поиска 
    const [searchData, setSearchData] = useState<JsonDataType[]>([]);
    
    // Расплющить дерево
    const flattenTree = (jsonData: JsonDataType) => {
        let items = [jsonData];
        
        if(jsonData.children) {
            for(const child of jsonData.children) {
                items = [...items, ...flattenTree(child)]
            }
        }

        return items;
    }

    // Поиск в справочнике МКБ-10
    const searchItems = () => {
        // Сделать из дерева массив
        const items = data.Mkb10.flatMap(flattenTree);

        // Поиск по searchQuery
        return items.filter(item => {
            return (
                (item.code && item.code.indexOf(searchQuery) > -1) // Код
                || (item.fullname && item.fullname.indexOf(searchQuery) > -1) // Название
                || (item.comment && item.comment.indexOf(searchQuery) > -1) // Комментарий
            )
        })
    }

    useEffect(() => {
        if(!searchQuery) {
            setSearchData([])
            return; 
        }

        setSearchData(searchItems())
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
